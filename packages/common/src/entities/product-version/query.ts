import type { Prisma } from "@dukkani/db/prisma/generated";
import { ImageQuery } from "../image/query";
import { VariantQuery } from "../variant/query";

export type ProductVersionListSliceDbData = Prisma.ProductVersionGetPayload<{
  select: ReturnType<typeof ProductVersionQuery.getListSelect>;
}>;

export type ProductVersionDetailDbData = Prisma.ProductVersionGetPayload<{
  include: ReturnType<typeof ProductVersionQuery.getDetailInclude>;
}>;

/** Full tree for clone/fork (images + option values + variant selections). */
export type ProductVersionCloneTreeDbData = Prisma.ProductVersionGetPayload<{
  include: ReturnType<typeof ProductVersionQuery.getCloneTreeInclude>;
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
      addonGroups: {
        orderBy: { sortOrder: "asc" },
        include: {
          options: { orderBy: { sortOrder: "asc" } },
        },
      },
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
      images: { select: { url: true } },
      _count: { select: { variants: true } },
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
      addonGroups: {
        orderBy: { sortOrder: "asc" },
        include: {
          options: { orderBy: { sortOrder: "asc" } },
        },
      },
    } satisfies Prisma.ProductVersionInclude;
  }
}
