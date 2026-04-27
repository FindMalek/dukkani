import type { Prisma } from "@dukkani/db/prisma/generated";

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
      orders: true,
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
}
