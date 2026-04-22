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
      variants: { select: { stock: true, trackStock: true } },
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
    } satisfies Prisma.ProductVersionInclude;
  }
}
