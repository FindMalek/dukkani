import type { Prisma } from "@dukkani/db/prisma/generated";

export type ProductAddonGroupDetailDbData = Prisma.ProductAddonGroupGetPayload<{
  include: ReturnType<typeof ProductAddonQuery.getGroupInclude>;
}>;

export type ProductAddonOptionDetailDbData =
  Prisma.ProductAddonOptionGetPayload<{
    include: ReturnType<typeof ProductAddonQuery.getOptionInclude>;
  }>;

export class ProductAddonQuery {
  static getOrder(direction: "asc" | "desc" = "asc") {
    return { sortOrder: direction } satisfies
      | Prisma.ProductAddonGroupOrderByWithRelationInput
      | Prisma.ProductAddonOptionOrderByWithRelationInput;
  }

  static getGroupsInclude() {
    return {
      orderBy: ProductAddonQuery.getOrder(),
      include: ProductAddonQuery.getGroupInclude(),
    };
  }

  static getGroupInclude() {
    return {
      options: { orderBy: ProductAddonQuery.getOrder() },
    } satisfies Prisma.ProductAddonGroupInclude;
  }

  static getOptionInclude() {
    return {} satisfies Prisma.ProductAddonOptionInclude;
  }
}
