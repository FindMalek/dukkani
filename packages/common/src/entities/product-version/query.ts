import type { Prisma } from "@dukkani/db/prisma/generated";
import { ImageQuery } from "../image/query";
import { ProductAddonQuery } from "../product-addon/query";
import { VariantQuery } from "../variant/query";

export type ProductVersionListSliceDbData = Prisma.ProductVersionGetPayload<{
  select: ReturnType<typeof ProductVersionQuery.getListSelect>;
}>;

export type ProductVersionDetailDbData = Prisma.ProductVersionGetPayload<{
  include: ReturnType<typeof ProductVersionQuery.getDetailInclude>;
}>;

export type ProductVersionCloneTreeDbData = Prisma.ProductVersionGetPayload<{
  include: ReturnType<typeof ProductVersionQuery.getCloneTreeInclude>;
}>;

export type ProductVersionBundleItemsDbData = Prisma.ProductVersionGetPayload<{
  include: ReturnType<typeof ProductVersionQuery.getBundleItemsInclude>;
}>;

export type ProductVersionOrderPricingDbData = Prisma.ProductVersionGetPayload<{
  select: ReturnType<typeof ProductVersionQuery.getOrderPricingSelect>;
}>;

export class ProductVersionQuery {
  /**
   * Nested payload for API/detail: images, variant options, variants (with selections).
   */
  static getDetailInclude() {
    return {
      images: ImageQuery.getSimpleInclude(),
      variantOptions: {
        include: VariantQuery.getVariantOptionInclude(),
      },
      variants: {
        include: VariantQuery.getVariantInclude(),
      },
      addonGroups: ProductAddonQuery.getGroupsInclude(),
    } satisfies Prisma.ProductVersionInclude;
  }

  /**
   * Select fragment for product list cards (draft or published column).
   */
  static getListSelect() {
    return {
      name: true,
      description: true,
      price: true,
      stock: true,
      hasVariants: true,
      variantEffectivePriceMin: true,
      variantEffectivePriceMax: true,
      images: { select: { url: true } },
      _count: { select: { variants: true } },
      variants: { select: { stock: true, trackStock: true, price: true } },
      addonGroups: {
        where: { required: true },
        take: 1,
        select: { id: true },
      },
    } satisfies Prisma.ProductVersionSelect;
  }

  /**
   * Published version slice for server-side cart pricing and add-on stock validation.
   */
  static getOrderPricingSelect() {
    return {
      id: true,
      name: true,
      price: true,
      hasVariants: true,
      addonGroups: ProductAddonQuery.getOrderPricingGroupsRelationArgs(),
      variants: {
        select: {
          id: true,
          price: true,
        },
      },
    } satisfies Prisma.ProductVersionSelect;
  }

  /**
   * Include for loading a published version when deep-cloning to draft.
   * Includes bundle items so they can be re-created on the new draft version.
   */
  static getCloneTreeInclude() {
    return {
      images: true,
      variantOptions: { include: { values: true } },
      variants: {
        include: {
          selections: true,
          image: { select: { id: true, url: true } },
        },
      },
      addonGroups: ProductAddonQuery.getGroupsInclude(),
      bundleItems: {
        orderBy: { sortOrder: "asc" as const },
        select: {
          childProductId: true,
          childVariantId: true,
          itemQty: true,
          sortOrder: true,
        },
      },
    } satisfies Prisma.ProductVersionInclude;
  }

  /**
   * Include for bundle item children: full child product/variant detail for
   * dashboard bundle detail view and storefront bundle page.
   */
  static getBundleItemsInclude() {
    return {
      bundleItems: {
        orderBy: { sortOrder: "asc" as const },
        include: {
          childProduct: {
            select: {
              id: true,
              published: true,
              currentPublishedVersionId: true,
              currentPublishedVersion: {
                select: {
                  id: true,
                  name: true,
                  price: true,
                  hasVariants: true,
                  images: {
                    select: { url: true },
                    take: 4,
                  },
                  variants: {
                    select: {
                      id: true,
                      stock: true,
                      trackStock: true,
                      price: true,
                    },
                  },
                },
              },
            },
          },
          childVariant: {
            select: { id: true, stock: true, trackStock: true, price: true },
          },
        },
      },
    } satisfies Prisma.ProductVersionInclude;
  }
}
