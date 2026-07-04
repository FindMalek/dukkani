import { Prisma } from "@dukkani/db/prisma/generated";
import type { Governorate } from "@dukkani/db/prisma/generated/enums";
import { OrderItemQuery } from "../order-item/query";

export type CustomerSimpleDbData = Prisma.CustomerGetPayload<{
  include: ReturnType<typeof CustomerQuery.getSimpleInclude>;
}>;

export type CustomerListDbData = Prisma.CustomerGetPayload<{
  select: ReturnType<typeof CustomerQuery.getListSelect>;
}>;

export type CustomerIncludeDbData = Prisma.CustomerGetPayload<{
  include: ReturnType<typeof CustomerQuery.getInclude>;
}>;

export type CustomerClientSafeDbData = Prisma.CustomerGetPayload<{
  include: ReturnType<typeof CustomerQuery.getClientSafeInclude>;
}>;

export class CustomerQuery {
  static getListSelect() {
    return {
      name: true,
      phone: true,
    } satisfies Prisma.CustomerSelect;
  }

  static getSimpleInclude() {
    return {} satisfies Prisma.CustomerInclude;
  }

  static getInclude() {
    return {
      ...CustomerQuery.getSimpleInclude(),
      store: true,
      orders: {
        orderBy: { createdAt: "desc" },
        include: { orderItems: { select: OrderItemQuery.getRevenueSelect() } },
      },
      addresses: { include: { _count: { select: { orders: true } } } },
    } satisfies Prisma.CustomerInclude;
  }

  static getClientSafeInclude() {
    return {
      ...CustomerQuery.getSimpleInclude(),
    } satisfies Prisma.CustomerInclude;
  }

  /**
   * Generate where clause for filtering customers by store IDs and optional filters
   */
  static getWhere(
    storeIds: string[],
    filters?: {
      storeId?: string;
      search?: string;
      phone?: string;
    },
  ): Prisma.CustomerWhereInput {
    const allowedStoreIds =
      filters?.storeId && storeIds.includes(filters.storeId)
        ? [filters.storeId]
        : storeIds;

    const where: Prisma.CustomerWhereInput = {
      storeId: { in: allowedStoreIds },
    };

    if (filters?.search) {
      where.OR = [
        { name: { contains: filters.search, mode: "insensitive" } },
        { phone: { contains: filters.search, mode: "insensitive" } },
      ];
    }

    if (filters?.phone) {
      where.phone = filters.phone;
    }

    return where;
  }

  /**
   * Generate orderBy clause for customers
   */
  static getOrder(
    orderBy: "asc" | "desc" = "desc",
    field: "createdAt" | "updatedAt" | "name" = "createdAt",
  ): Prisma.CustomerOrderByWithRelationInput {
    return { [field]: orderBy };
  }

  /**
   * Shared WHERE fragment for the raw-SQL stats query and its count query.
   * Uses EXISTS (not JOIN) for the governorate filter so a customer with
   * multiple matching addresses doesn't get duplicated in the result set.
   */
  static getStatsWhereFragment(
    storeIds: string[],
    filters?: CustomerStatsFilters,
  ): Prisma.Sql {
    const allowedStoreIds =
      filters?.storeId && storeIds.includes(filters.storeId)
        ? [filters.storeId]
        : storeIds;

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

  private static getStatsOrderFragment(sortBy: CustomerStatsSort): Prisma.Sql {
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
  static getStatsQuery(
    storeIds: string[],
    filters: CustomerStatsFilters | undefined,
    sortBy: CustomerStatsSort,
    skip: number,
    limit: number,
  ): Prisma.Sql {
    const where = CustomerQuery.getStatsWhereFragment(storeIds, filters);
    const order = CustomerQuery.getStatsOrderFragment(sortBy);

    return Prisma.sql`
      WITH order_stats AS (
        SELECT o."customer_id" AS customer_id,
               COUNT(DISTINCT o.id)::int AS order_count,
               COALESCE(SUM(oi.price * oi.quantity), 0)::float AS total_spent,
               MAX(o."created_at") AS last_order_at
        FROM orders o
        JOIN order_items oi ON oi."order_id" = o.id
        GROUP BY o."customer_id"
      ),
      address_stats AS (
        SELECT a."customer_id" AS customer_id,
               array_agg(DISTINCT a.governorate) FILTER (WHERE a.governorate IS NOT NULL) AS governorates
        FROM addresses a
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
        COALESCE(ads.governorates, ARRAY[]::"Governorate"[]) AS "governorates"
      FROM customers c
      LEFT JOIN order_stats os ON os.customer_id = c.id
      LEFT JOIN address_stats ads ON ads.customer_id = c.id
      WHERE ${where}
      ORDER BY ${order}
      LIMIT ${limit} OFFSET ${skip}
    `;
  }

  static getStatsCountQuery(
    storeIds: string[],
    filters?: CustomerStatsFilters,
  ): Prisma.Sql {
    const where = CustomerQuery.getStatsWhereFragment(storeIds, filters);
    return Prisma.sql`SELECT COUNT(*)::int AS count FROM customers c WHERE ${where}`;
  }

  /**
   * Governorate chip counts for the list screen's quick-filter row. Kept as
   * its own lightweight query so it doesn't re-run on every keystroke/page
   * change the way the main stats query does.
   */
  static getGovernorateCountsQuery(
    storeIds: string[],
    storeId?: string,
  ): Prisma.Sql {
    const allowedStoreIds =
      storeId && storeIds.includes(storeId) ? [storeId] : storeIds;

    return Prisma.sql`
      SELECT a.governorate AS "governorate", COUNT(DISTINCT c.id)::int AS "count"
      FROM customers c
      JOIN addresses a ON a."customer_id" = c.id
      WHERE c."store_id" IN (${Prisma.join(allowedStoreIds)}) AND a.governorate IS NOT NULL
      GROUP BY a.governorate
    `;
  }
}

export interface CustomerStatsFilters {
  storeId?: string;
  search?: string;
  governorates?: Governorate[];
}

export type CustomerStatsSort =
  | "recent"
  | "orderCount"
  | "totalSpent"
  | "lastOrderAt";

export interface CustomerStatsRow {
  id: string;
  name: string;
  phone: string;
  prefersWhatsApp: boolean;
  storeId: string;
  createdAt: Date;
  updatedAt: Date;
  orderCount: number;
  totalSpent: number;
  lastOrderAt: Date | null;
  governorates: Governorate[] | null;
}

export interface CustomerGovernorateCountRow {
  governorate: Governorate;
  count: number;
}
