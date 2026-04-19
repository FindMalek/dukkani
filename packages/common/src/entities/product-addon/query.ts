import type { Prisma } from "@dukkani/db/prisma/generated";

export type ProductAddonGroupDetailDbData = Prisma.ProductAddonGroupGetPayload<{
  include: ReturnType<typeof ProductAddonQuery.getGroupInclude>;
}>;

export type ProductAddonOptionDetailDbData =
  Prisma.ProductAddonOptionGetPayload<{
    include: ReturnType<typeof ProductAddonQuery.getOptionInclude>;
  }>;

export type ProductAddonOptionOrderPricingDbData =
  Prisma.ProductAddonOptionGetPayload<{
    select: ReturnType<typeof ProductAddonQuery.getOrderPricingOptionSelect>;
  }>;

/** Group + nested options as selected for order pricing (no group/option sortOrder columns). */
export type ProductAddonGroupOrderPricingDbData =
  Prisma.ProductAddonGroupGetPayload<{
    select: ReturnType<typeof ProductAddonQuery.getOrderPricingGroupSelect>;
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

  /**
   * Minimal option columns for cart pricing / add-on stock validation.
   * Kept separate from API "public" shapes (those include sortOrder and normalized numbers).
   */
  static getOrderPricingOptionSelect() {
    return {
      id: true,
      name: true,
      priceDelta: true,
      stock: true,
    } satisfies Prisma.ProductAddonOptionSelect;
  }

  static getOrderPricingGroupSelect() {
    return {
      id: true,
      name: true,
      selectionType: true,
      required: true,
      options: {
        orderBy: ProductAddonQuery.getOrder("asc"),
        select: ProductAddonQuery.getOrderPricingOptionSelect(),
      },
    } satisfies Prisma.ProductAddonGroupSelect;
  }

  /**
   * Relation args for `productVersion.addonGroups` when using select (order + nested option select).
   */
  /** Nested args for `ProductVersion.addonGroups` (order + select). */
  static getOrderPricingGroupsRelationArgs() {
    return {
      orderBy: ProductAddonQuery.getOrder("asc"),
      select: ProductAddonQuery.getOrderPricingGroupSelect(),
    };
  }
}
