import {
  ConflictError,
  ForbiddenError,
  NotFoundError,
} from "@dukkani/common/errors";
import type { PrismaClient } from "@dukkani/db";
import { database, PrismaClientKnownRequestError } from "@dukkani/db";
import { Prisma } from "@dukkani/db/prisma/generated";
import { CustomerEntity } from "../entities/customer/entity";
import type {
  CustomerGovernorateCountRow,
  CustomerStatsFilters,
  CustomerStatsRow,
  CustomerStatsSort,
} from "../entities/customer/query";
import { CustomerQuery } from "../entities/customer/query";
import type {
  CreateCustomerInput,
  UpdateCustomerInput,
} from "../schemas/customer/input";
import type {
  CustomerListItemOutput,
  CustomerSimpleOutput,
  GovernorateCountsOutput,
} from "../schemas/customer/output";

/**
 * Shared WHERE fragment for the raw-SQL stats query and its count query.
 * Uses EXISTS (not JOIN) for the governorate filter so a customer with
 * multiple matching addresses doesn't get duplicated in the result set.
 *
 * Kept in this server-only service file (not CustomerQuery, which is
 * imported transitively by client components for status/badge helpers) —
 * a runtime `Prisma` import there pulls the full Prisma client runtime
 * into the browser bundle and breaks the build.
 */
function getAllowedStoreIds(
  storeIds: string[],
  filterStoreId?: string,
): string[] {
  return filterStoreId && storeIds.includes(filterStoreId)
    ? [filterStoreId]
    : storeIds;
}

function getCustomerStatsWhereFragment(
  storeIds: string[],
  filters?: CustomerStatsFilters,
): Prisma.Sql {
  const allowedStoreIds = getAllowedStoreIds(storeIds, filters?.storeId);

  const conditions: Prisma.Sql[] = [
    Prisma.sql`c."store_id" IN (${Prisma.join(allowedStoreIds)})`,
  ];

  if (filters?.search) {
    const term = `%${filters.search}%`;
    conditions.push(
      Prisma.sql`(c.name ILIKE ${term} OR c.phone ILIKE ${term})`,
    );
  }

  if (filters?.governorates && filters.governorates.length > 0) {
    const governorateValues = Prisma.join(
      filters.governorates.map((g) => Prisma.sql`${g}::"Governorate"`),
    );
    conditions.push(
      Prisma.sql`EXISTS (SELECT 1 FROM addresses ad WHERE ad."customer_id" = c.id AND ad.governorate IN (${governorateValues}))`,
    );
  }

  return Prisma.join(conditions, " AND ");
}

function getCustomerStatsOrderFragment(sortBy: CustomerStatsSort): Prisma.Sql {
  switch (sortBy) {
    case "orderCount":
      return Prisma.sql`"orderCount" DESC, c."created_at" DESC`;
    case "totalSpent":
      return Prisma.sql`"totalSpent" DESC, c."created_at" DESC`;
    case "lastOrderAt":
      return Prisma.sql`"lastOrderAt" DESC NULLS LAST, c."created_at" DESC`;
    default:
      return Prisma.sql`c."created_at" DESC`;
  }
}

/**
 * Paginated customer list with derived order stats (order count, total
 * spent, last order date) and distinct governorates across addresses.
 * Total spent isn't stored on Order (see OrderItem.price * quantity), so
 * sorting/filtering/paginating it correctly requires a GROUP BY aggregate
 * rather than loading every customer's order graph into memory.
 */
function getCustomerStatsQuery(
  storeIds: string[],
  filters: CustomerStatsFilters | undefined,
  sortBy: CustomerStatsSort,
  skip: number,
  limit: number,
): Prisma.Sql {
  const where = getCustomerStatsWhereFragment(storeIds, filters);
  const order = getCustomerStatsOrderFragment(sortBy);
  const allowedStoreIds = getAllowedStoreIds(storeIds, filters?.storeId);
  const storeFilter = Prisma.sql`c2."store_id" IN (${Prisma.join(allowedStoreIds)})`;

  return Prisma.sql`
    WITH order_stats AS (
      SELECT o."customer_id" AS customer_id,
             COUNT(DISTINCT o.id)::int AS order_count,
             COALESCE(SUM(oi.price * oi.quantity), 0)::float AS total_spent,
             MAX(o."created_at") AS last_order_at
      FROM orders o
      JOIN order_items oi ON oi."order_id" = o.id
      JOIN customers c2 ON c2.id = o."customer_id"
      WHERE ${storeFilter}
      GROUP BY o."customer_id"
    ),
    address_stats AS (
      SELECT a."customer_id" AS customer_id,
             array_agg(DISTINCT a.governorate::text) FILTER (WHERE a.governorate IS NOT NULL) AS governorates
      FROM addresses a
      JOIN customers c2 ON c2.id = a."customer_id"
      WHERE ${storeFilter}
      GROUP BY a."customer_id"
    )
    SELECT
      c.id AS "id",
      c.name AS "name",
      c.phone AS "phone",
      c."prefers_whatsapp" AS "prefersWhatsApp",
      c."store_id" AS "storeId",
      c."created_at" AS "createdAt",
      c."updated_at" AS "updatedAt",
      COALESCE(os.order_count, 0) AS "orderCount",
      COALESCE(os.total_spent, 0) AS "totalSpent",
      os.last_order_at AS "lastOrderAt",
      COALESCE(ads.governorates, ARRAY[]::text[]) AS "governorates"
    FROM customers c
    LEFT JOIN order_stats os ON os.customer_id = c.id
    LEFT JOIN address_stats ads ON ads.customer_id = c.id
    WHERE ${where}
    ORDER BY ${order}
    LIMIT ${limit} OFFSET ${skip}
  `;
}

function getCustomerStatsCountQuery(
  storeIds: string[],
  filters?: CustomerStatsFilters,
): Prisma.Sql {
  const where = getCustomerStatsWhereFragment(storeIds, filters);
  return Prisma.sql`SELECT COUNT(*)::int AS count FROM customers c WHERE ${where}`;
}

/**
 * Governorate chip counts for the list screen's quick-filter row. Kept as
 * its own lightweight query so it doesn't re-run on every keystroke/page
 * change the way the main stats query does.
 */
function getCustomerGovernorateCountsQuery(
  storeIds: string[],
  storeId?: string,
): Prisma.Sql {
  const allowedStoreIds = getAllowedStoreIds(storeIds, storeId);

  return Prisma.sql`
    SELECT a.governorate AS "governorate", COUNT(DISTINCT c.id)::int AS "count"
    FROM customers c
    JOIN addresses a ON a."customer_id" = c.id
    WHERE c."store_id" IN (${Prisma.join(allowedStoreIds)}) AND a.governorate IS NOT NULL
    GROUP BY a.governorate
  `;
}

/**
 * Collapses whitespace/casing differences so "Mohamed Ben Salah" and
 * "mohamed  ben salah" are treated as the same spelling for de-duplication.
 */
function normalizeCustomerName(name: string): string {
  return name.trim().toLowerCase().replace(/\s+/g, " ");
}

/**
 * Customer service - Shared business logic for customer operations
 */
export class CustomerService {
  /**
   * Check for duplicate phone number in store
   */
  static async checkDuplicatePhone(
    phone: string,
    storeId: string,
  ): Promise<boolean> {
    const existing = await database.customer.findUnique({
      where: {
        phone_storeId: {
          phone,
          storeId,
        },
      },
    });

    return !!existing;
  }

  /**
   * Create customer with duplicate check
   */
  static async createCustomer(
    input: CreateCustomerInput,
    userId: string,
  ): Promise<CustomerSimpleOutput> {
    // Verify store ownership
    const store = await database.store.findUnique({
      where: { id: input.storeId },
      select: { ownerId: true },
    });

    if (!store) {
      throw new NotFoundError("Store not found");
    }

    if (store.ownerId !== userId) {
      throw new ForbiddenError("You don't have access to this store");
    }

    // Check for duplicate phone
    const isDuplicate = await CustomerService.checkDuplicatePhone(
      input.phone,
      input.storeId,
    );

    if (isDuplicate) {
      throw new ConflictError(
        "Customer with this phone number already exists in this store",
      );
    }

    // Create customer
    try {
      const customer = await database.customer.create({
        data: {
          name: input.name,
          phone: input.phone,
          storeId: input.storeId,
        },
        include: CustomerQuery.getSimpleInclude(),
      });

      return CustomerEntity.getSimpleRo(customer);
    } catch (error) {
      if (
        error instanceof PrismaClientKnownRequestError &&
        error.code === "P2002"
      ) {
        throw new ConflictError(
          "Customer with this phone number already exists in this store",
        );
      }
      throw error;
    }
  }

  /**
   * Find or create customer by phone number
   * If customer exists, return as-is
   * If not, create new customer
   * No ownership check - used for public order creation
   * Accepts optional tx for transactional use (e.g. order creation)
   *
   * Records `name` as a name variant (see recordNameVariant) so a customer
   * who types their name slightly differently on each order doesn't lose
   * that history, and `Customer.name` can self-correct toward whichever
   * spelling is actually most common.
   */
  static async findOrCreateCustomer(
    phone: string,
    name: string,
    storeId: string,
    tx?: Prisma.TransactionClient,
  ): Promise<CustomerSimpleOutput> {
    const client = tx ?? database;

    const customer = await client.customer.upsert({
      where: { phone_storeId: { phone, storeId } },
      create: { name, phone, storeId },
      update: {},
      include: CustomerQuery.getSimpleInclude(),
    });

    const updatedName = await CustomerService.recordNameVariant(
      customer.id,
      name,
      client,
    );

    return CustomerEntity.getSimpleRo({
      ...customer,
      name: updatedName ?? customer.name,
    });
  }

  /**
   * Upserts a CustomerNameVariant for this spelling (incrementing timesUsed
   * on repeats) and, unless the merchant has manually pinned the name
   * (`nameManuallySet`), promotes `Customer.name` to a variant only once it
   * *strictly* outnumbers the variant backing the current name — a tie
   * (e.g. a customer's very first alternate spelling, 1 use vs. 1 use)
   * must not flip the name, or a single one-off typo on someone's second
   * order would override an established spelling before any real majority
   * exists. Stability wins ties; only a genuine majority promotes.
   *
   * Returns the customer's current name after this call, so callers don't
   * need a second round-trip to know whether it changed.
   */
  private static async recordNameVariant(
    customerId: string,
    name: string,
    client: PrismaClient | Prisma.TransactionClient,
  ): Promise<string | null> {
    const normalizedName = normalizeCustomerName(name);
    const now = new Date();

    await client.customerNameVariant.upsert({
      where: { customerId_normalizedName: { customerId, normalizedName } },
      create: { customerId, name, normalizedName, lastUsedAt: now },
      update: { timesUsed: { increment: 1 }, lastUsedAt: now },
    });

    const customer = await client.customer.findUnique({
      where: { id: customerId },
      select: { name: true, nameManuallySet: true },
    });
    if (!customer || customer.nameManuallySet) {
      return customer?.name ?? null;
    }

    const [topVariant, currentVariant] = await Promise.all([
      client.customerNameVariant.findFirst({
        where: { customerId },
        orderBy: [{ timesUsed: "desc" }, { firstSeenAt: "asc" }],
      }),
      client.customerNameVariant.findUnique({
        where: {
          customerId_normalizedName: {
            customerId,
            normalizedName: normalizeCustomerName(customer.name),
          },
        },
      }),
    ]);

    const currentCount = currentVariant?.timesUsed ?? 0;
    const shouldPromote =
      topVariant &&
      topVariant.name !== customer.name &&
      topVariant.timesUsed > currentCount;

    if (shouldPromote) {
      const updated = await client.customer.update({
        where: { id: customerId },
        data: { name: topVariant.name },
        select: { name: true },
      });
      return updated.name;
    }

    return customer.name;
  }

  /**
   * Update customer with duplicate check
   */
  static async updateCustomer(
    input: UpdateCustomerInput,
    userId: string,
  ): Promise<CustomerSimpleOutput> {
    // Get existing customer to verify ownership
    const existingCustomer = await database.customer.findUnique({
      where: { id: input.id },
      select: { storeId: true, phone: true, name: true },
    });

    if (!existingCustomer) {
      throw new NotFoundError("Customer not found");
    }

    // Verify store ownership
    const store = await database.store.findUnique({
      where: { id: existingCustomer.storeId },
      select: { ownerId: true },
    });

    if (!store || store.ownerId !== userId) {
      throw new ForbiddenError("You don't have access to this customer");
    }

    // If phone is being updated, check for duplicates
    if (input.phone && input.phone !== existingCustomer.phone) {
      const isDuplicate = await CustomerService.checkDuplicatePhone(
        input.phone,
        existingCustomer.storeId,
      );

      if (isDuplicate) {
        throw new ConflictError(
          "Customer with this phone number already exists in this store",
        );
      }
    }

    // Update customer
    const updateData: {
      name?: string;
      phone?: string;
      nameManuallySet?: boolean;
    } = {};

    if (input.name !== undefined) updateData.name = input.name;
    if (input.phone !== undefined) updateData.phone = input.phone;
    // A merchant-edited name is pinned so a later order typed under a
    // different spelling never silently overwrites the correction.
    if (input.name !== undefined && input.name !== existingCustomer.name) {
      updateData.nameManuallySet = true;
    }

    try {
      const customer = await database.customer.update({
        where: { id: input.id },
        data: updateData,
        include: CustomerQuery.getSimpleInclude(),
      });

      return CustomerEntity.getSimpleRo(customer);
    } catch (error) {
      if (
        error instanceof PrismaClientKnownRequestError &&
        error.code === "P2002"
      ) {
        throw new ConflictError(
          "Customer with this phone number already exists in this store",
        );
      }
      throw error;
    }
  }

  /**
   * Paginated customer list with derived order stats, for the dashboard
   * Customers list screen. See CustomerQuery.getStatsQuery for why this
   * needs a raw aggregate query rather than an app-level reduce.
   */
  static async listWithStats(
    storeIds: string[],
    filters: CustomerStatsFilters | undefined,
    sortBy: CustomerStatsSort,
    page: number,
    limit: number,
  ): Promise<{ customers: CustomerListItemOutput[]; total: number }> {
    const skip = (page - 1) * limit;

    const [rows, countRows] = await Promise.all([
      database.$queryRaw<CustomerStatsRow[]>(
        getCustomerStatsQuery(storeIds, filters, sortBy, skip, limit),
      ),
      database.$queryRaw<{ count: number }[]>(
        getCustomerStatsCountQuery(storeIds, filters),
      ),
    ]);

    return {
      customers: rows.map(CustomerEntity.getListWithStatsRo),
      total: countRows[0]?.count ?? 0,
    };
  }

  /**
   * Governorate chip counts for the list screen's quick-filter row.
   */
  static async getGovernorateCounts(
    storeIds: string[],
    storeId?: string,
  ): Promise<GovernorateCountsOutput> {
    const rows = await database.$queryRaw<CustomerGovernorateCountRow[]>(
      getCustomerGovernorateCountsQuery(storeIds, storeId),
    );

    return {
      counts: rows.map((row) => ({
        governorate: row.governorate,
        count: row.count,
      })),
    };
  }

  /**
   * Update the merchant-authored notes field only, decoupled from the
   * general update procedure so detail-page autosave doesn't need to pass
   * name/phone.
   */
  static async updateNotes(
    id: string,
    notes: string | null,
    userId: string,
  ): Promise<CustomerSimpleOutput> {
    const existingCustomer = await database.customer.findUnique({
      where: { id },
      select: { storeId: true },
    });

    if (!existingCustomer) {
      throw new NotFoundError("Customer not found");
    }

    const store = await database.store.findUnique({
      where: { id: existingCustomer.storeId },
      select: { ownerId: true },
    });

    if (!store || store.ownerId !== userId) {
      throw new ForbiddenError("You don't have access to this customer");
    }

    const customer = await database.customer.update({
      where: { id },
      data: { notes },
      include: CustomerQuery.getSimpleInclude(),
    });

    return CustomerEntity.getSimpleRo(customer);
  }
}
