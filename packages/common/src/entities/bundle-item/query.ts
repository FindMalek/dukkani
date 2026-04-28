import type { Prisma } from "@dukkani/db/prisma/generated";

export type BundleItemStockCheckDbData = Prisma.BundleItemGetPayload<{
  select: ReturnType<typeof BundleItemQuery.getStockCheckSelect>;
}>;

export class BundleItemQuery {
  /**
   * Minimal select for stock availability check and effective stock computation.
   * Includes child product's published version stock + variants, and child variant stock.
   */
  static getStockCheckSelect() {
    return {
      id: true,
      itemQty: true,
      childProductId: true,
      childVariantId: true,
      childProduct: {
        select: {
          id: true,
          currentPublishedVersionId: true,
          currentPublishedVersion: {
            select: {
              id: true,
              stock: true,
              hasVariants: true,
              variants: {
                select: { id: true, stock: true, trackStock: true },
              },
            },
          },
        },
      },
      childVariant: {
        select: { id: true, stock: true, trackStock: true },
      },
    } satisfies Prisma.BundleItemSelect;
  }

  /**
   * Select for order pricing — extends stock check with child version price.
   */
  static getOrderPricingSelect() {
    return {
      id: true,
      itemQty: true,
      sortOrder: true,
      childProductId: true,
      childVariantId: true,
      childProduct: {
        select: {
          id: true,
          currentPublishedVersionId: true,
          currentPublishedVersion: {
            select: {
              id: true,
              name: true,
              price: true,
              stock: true,
              hasVariants: true,
              images: { select: { url: true }, take: 1 },
              variants: {
                select: { id: true, stock: true, trackStock: true, price: true },
              },
            },
          },
        },
      },
      childVariant: {
        select: { id: true, stock: true, trackStock: true, price: true },
      },
    } satisfies Prisma.BundleItemSelect;
  }

  /**
   * Minimal select for cloning bundle items when forking a draft from published.
   */
  static getCloneSelect() {
    return {
      childProductId: true,
      childVariantId: true,
      itemQty: true,
      sortOrder: true,
    } satisfies Prisma.BundleItemSelect;
  }
}
