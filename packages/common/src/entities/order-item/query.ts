import type { Prisma } from "@dukkani/db/prisma/generated";

export type OrderItemSimpleDbData = Prisma.OrderItemGetPayload<{
  include: ReturnType<typeof OrderItemQuery.getSimpleInclude>;
}>;

export type OrderItemIncludeDbData = Prisma.OrderItemGetPayload<{
  include: ReturnType<typeof OrderItemQuery.getInclude>;
}>;

export type OrderItemWithProductDbData = Prisma.OrderItemGetPayload<{
  include: ReturnType<typeof OrderItemQuery.getIncludeWithProductSelect>;
}>;

export type OrderItemClientSafeDbData = Prisma.OrderItemGetPayload<{
  include: ReturnType<typeof OrderItemQuery.getClientSafeInclude>;
}>;

export type OrderItemListDbData = Prisma.OrderItemGetPayload<{
  select: ReturnType<typeof OrderItemQuery.getListSelect>;
}>;

export type OrderItemWithBundleChildrenDbData = Prisma.OrderItemGetPayload<{
  include: ReturnType<typeof OrderItemQuery.getBundleChildrenInclude>;
}>;

/**
 * Includes for order line items. When `product` is selected, always load `productVersion` with at least
 * `name` so storefront and notification UIs can show a title without fabricating empty strings.
 */
export class OrderItemQuery {
  static getListSelect() {
    return {
      price: true,
      quantity: true,
    } satisfies Prisma.OrderItemSelect;
  }

  static getSimpleInclude() {
    return {} satisfies Prisma.OrderItemInclude;
  }

  static getInclude() {
    return {
      ...OrderItemQuery.getSimpleInclude(),
      order: true,
      product: { select: { id: true } },
      productVersion: { select: { name: true } },
    } satisfies Prisma.OrderItemInclude;
  }

  static getIncludeWithProductSelect() {
    return {
      ...OrderItemQuery.getSimpleInclude(),
      product: { select: { id: true } },
      productVariant: {
        select: {
          image: { select: { url: true } },
        },
      },
      productVersion: {
        select: {
          name: true,
          images: {
            select: { url: true },
            take: 1,
            orderBy: { createdAt: "asc" },
          },
        },
      },
      displayAttributes: {
        orderBy: { position: "asc" },
        select: { optionName: true, value: true },
      },
    } satisfies Prisma.OrderItemInclude;
  }

  static getClientSafeInclude() {
    return {
      ...OrderItemQuery.getSimpleInclude(),
      product: { select: { id: true } },
      productVersion: { select: { name: true } },
    } satisfies Prisma.OrderItemInclude;
  }

  /**
   * Includes bundle children so deleteOrder can restore stock from the frozen snapshot.
   */
  static getBundleChildrenInclude() {
    return {
      bundleChildren: {
        select: {
          childProductId: true,
          childVariantId: true,
          childProductVersionId: true,
          itemQty: true,
          totalQty: true,
        },
      },
    } satisfies Prisma.OrderItemInclude;
  }

  /**
   * Get select object for revenue calculations (only quantity and price)
   */
  static getRevenueSelect(): { quantity: true; price: true } {
    return {
      quantity: true,
      price: true,
    };
  }
}
