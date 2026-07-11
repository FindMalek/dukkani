import type { PrismaClient } from "@dukkani/db";
import type { Prisma } from "@dukkani/db/prisma/generated";
import { ProductVersionStatus } from "@dukkani/db/prisma/generated/enums";
import { ImageQuery } from "../image/query";
import { OrderItemQuery } from "../order-item/query";
import { ProductVersionQuery } from "../product-version/query";
import { StoreQuery } from "../store/query";

export type ProductSimpleDbData = Prisma.ProductGetPayload<{
  include: ReturnType<typeof ProductQuery.getSimpleInclude>;
}>;

export type ProductIncludeDbData = Prisma.ProductGetPayload<{
  include: ReturnType<typeof ProductQuery.getInclude>;
}>;

export type ProductClientSafeDbData = Prisma.ProductGetPayload<{
  include: ReturnType<typeof ProductQuery.getClientSafeInclude>;
}>;

export type ProductListDbData = Prisma.ProductGetPayload<{
  include: ReturnType<typeof ProductQuery.getListInclude>;
}>;

export type ProductStorefrontListDbData = Prisma.ProductGetPayload<{
  include: ReturnType<typeof ProductQuery.getStorefrontListInclude>;
}>;

export type ProductBundleIncludeDbData = Prisma.ProductGetPayload<{
  include: ReturnType<typeof ProductQuery.getBundleInclude>;
}>;

export type ProductPublicDbData = Prisma.ProductGetPayload<{
  include: ReturnType<typeof ProductQuery.getPublicInclude>;
}>;

/** Storefront-safe row: published version subgraph is loaded and non-null. */
export type ProductPublicDbDataWithPublished = ProductPublicDbData & {
  currentPublishedVersion: NonNullable<
    ProductPublicDbData["currentPublishedVersion"]
  >;
};

export class ProductQuery {
  static getSimpleInclude() {
    return {
      currentPublishedVersion: {
        select: {
          name: true,
          description: true,
          price: true,
          stock: true,
          hasVariants: true,
        },
      },
    } satisfies Prisma.ProductInclude;
  }

  static getPublicInclude() {
    return {
      store: {
        select: StoreQuery.getPublicSimpleSelect(),
      },
      currentPublishedVersion: {
        include: ProductVersionQuery.getDetailInclude(),
      },
    } satisfies Prisma.ProductInclude;
  }

  static getInclude() {
    return {
      currentPublishedVersion: {
        include: ProductVersionQuery.getDetailInclude(),
      },
      draftVersion: {
        include: ProductVersionQuery.getDetailInclude(),
      },
      orderItems: OrderItemQuery.getSimpleInclude(),
    } satisfies Prisma.ProductInclude;
  }

  static getClientSafeInclude() {
    return {
      currentPublishedVersion: {
        include: {
          images: ImageQuery.getSimpleInclude(),
        },
      },
    } satisfies Prisma.ProductInclude;
  }

  static getListInclude() {
    return {
      draftVersion: {
        select: ProductVersionQuery.getListSelect(),
      },
      currentPublishedVersion: {
        select: ProductVersionQuery.getListSelect(),
      },
    } satisfies Prisma.ProductInclude;
  }

  /**
   * Dashboard bundle detail: both versions with full bundle item tree.
   */
  static getBundleInclude() {
    return {
      currentPublishedVersion: {
        include: {
          ...ProductVersionQuery.getDetailInclude(),
          ...ProductVersionQuery.getBundleItemsInclude(),
        },
      },
      draftVersion: {
        include: {
          ...ProductVersionQuery.getDetailInclude(),
          ...ProductVersionQuery.getBundleItemsInclude(),
        },
      },
      orderItems: OrderItemQuery.getSimpleInclude(),
    } satisfies Prisma.ProductInclude;
  }

  /**
   * Storefront product grid: **published** version only (no draft leak).
   */
  static getStorefrontListInclude() {
    return {
      currentPublishedVersion: {
        select: ProductVersionQuery.getListSelect(),
      },
    } satisfies Prisma.ProductInclude;
  }

  static getWhere(
    storeIds: string[],
    filters?: {
      storeId?: string;
      published?: boolean;
      search?: string;
      stock?: { lte?: number; gte?: number };
      hasVariants?: boolean;
      categoryId?: string;
      priceMin?: number;
      priceMax?: number;
      /**
       * Restricts search/stock/hasVariants/price matching to `currentPublishedVersion`,
       * skipping `draftVersion`. Set for public/storefront queries so a product can't
       * match (e.g. appear "in stock") based on unpublished draft data. Dashboard
       * queries leave this unset to keep matching either version.
       */
      publicOnly?: boolean;
    },
  ): Prisma.ProductWhereInput {
    const andParts: Prisma.ProductWhereInput[] = [];

    const where: Prisma.ProductWhereInput = {
      storeId: filters?.storeId ? { in: [filters.storeId] } : { in: storeIds },
    };

    const publicOnly = filters?.publicOnly === true;
    const versionMatch = (
      versionWhere: Prisma.ProductVersionWhereInput,
    ): Prisma.ProductWhereInput =>
      publicOnly
        ? { currentPublishedVersion: { is: versionWhere } }
        : {
            OR: [
              { currentPublishedVersion: { is: versionWhere } },
              { draftVersion: { is: versionWhere } },
            ],
          };

    if (filters?.published !== undefined) {
      where.published = filters.published;
    }

    if (filters?.search) {
      const q = filters.search;
      andParts.push(
        versionMatch({
          OR: [
            { name: { contains: q, mode: "insensitive" } },
            { description: { contains: q, mode: "insensitive" } },
          ],
        }),
      );
    }

    if (filters?.stock) {
      // `ProductVersion.totalVariantStock` is denormalized: for simple products it
      // matches `stock`; for variant products it is the sum of variant stocks. Kept
      // in sync on version/variant stock writes. See `ProductVersionService.recomputeTotalVariantStock`.
      const stockFilter: { lte?: number; gte?: number } = {};
      if (filters.stock.lte !== undefined) {
        stockFilter.lte = filters.stock.lte;
      }
      if (filters.stock.gte !== undefined) {
        stockFilter.gte = filters.stock.gte;
      }
      if (Object.keys(stockFilter).length > 0) {
        andParts.push(versionMatch({ totalVariantStock: stockFilter }));
      }
    }

    if (filters?.hasVariants !== undefined) {
      andParts.push(versionMatch({ hasVariants: filters.hasVariants }));
    }

    if (filters?.categoryId) {
      where.categoryId = filters.categoryId;
    }

    if (filters?.priceMin !== undefined || filters?.priceMax !== undefined) {
      const price: { gte?: number; lte?: number } = {};
      if (filters.priceMin !== undefined) {
        price.gte = filters.priceMin;
      }
      if (filters.priceMax !== undefined) {
        price.lte = filters.priceMax;
      }
      // Simple products: match version `price` range. Variant products: overlap
      // filter range with denormalized effective min/max, or fall back to
      // version `price` when bounds were not yet backfilled (null min).
      const overlap: Prisma.ProductVersionWhereInput[] = [];
      if (filters.priceMin !== undefined) {
        overlap.push({ variantEffectivePriceMax: { gte: filters.priceMin } });
      }
      if (filters.priceMax !== undefined) {
        overlap.push({ variantEffectivePriceMin: { lte: filters.priceMax } });
      }
      const versionPriceWhere: Prisma.ProductVersionWhereInput = {
        OR: [
          { hasVariants: false, price },
          {
            hasVariants: true,
            AND: overlap,
          },
          {
            hasVariants: true,
            variantEffectivePriceMin: null,
            price,
          },
        ],
      };
      andParts.push(versionMatch(versionPriceWhere));
    }

    if (andParts.length > 0) {
      where.AND = andParts;
    }

    return where;
  }

  static getPublishableWhere(): Prisma.ProductWhereInput {
    return {
      published: true,
      currentPublishedVersionId: { not: null },
      currentPublishedVersion: {
        is: { status: ProductVersionStatus.PUBLISHED },
      },
    };
  }

  /**
   * Min/max price across a store's published catalog (for storefront price-range
   * filter bounds). Live aggregate rather than a denormalized column: `Product.storeId`
   * is indexed and this is a cheap read at realistic catalog sizes, whereas denormalizing
   * would need a recompute hook wired into every price-affecting write path (product,
   * variant, and bundle create/update/delete/publish) — not worth the correctness risk
   * for a slider bound. Returns `null` when the store has no published products.
   */
  static async getPriceBounds(
    database: PrismaClient | Prisma.TransactionClient,
    storeId: string,
  ): Promise<{ min: number; max: number } | null> {
    const publishedFilter = {
      productsAsCurrentPublished: { some: { storeId, published: true } },
    } satisfies Prisma.ProductVersionWhereInput;

    const [simple, variant] = await Promise.all([
      database.productVersion.aggregate({
        where: { ...publishedFilter, hasVariants: false },
        _min: { price: true },
        _max: { price: true },
      }),
      database.productVersion.aggregate({
        where: { ...publishedFilter, hasVariants: true },
        _min: { variantEffectivePriceMin: true },
        _max: { variantEffectivePriceMax: true },
      }),
    ]);

    const mins = [simple._min.price, variant._min.variantEffectivePriceMin]
      .filter((v): v is Prisma.Decimal => v != null)
      .map(Number);
    const maxs = [simple._max.price, variant._max.variantEffectivePriceMax]
      .filter((v): v is Prisma.Decimal => v != null)
      .map(Number);

    if (mins.length === 0) {
      return null;
    }

    return { min: Math.min(...mins), max: Math.max(...maxs) };
  }

  /**
   * Narrows Prisma payloads before `ProductEntity.getPublicRo`.
   * `getPublishableWhere()` already enforces the rule at query time; this still types `currentPublishedVersion` as non-null and skips inconsistent rows.
   */
  static isPublicWithPublished(
    product: ProductPublicDbData,
  ): product is ProductPublicDbDataWithPublished {
    return product.currentPublishedVersion != null;
  }

  static getOrder(
    orderBy: "asc" | "desc" = "desc",
    field: "createdAt" | "updatedAt" | "name" | "price" | "stock" = "createdAt",
  ): Prisma.ProductOrderByWithRelationInput {
    if (field === "name") {
      return { currentPublishedVersion: { name: orderBy } };
    }
    if (field === "price") {
      return { currentPublishedVersion: { price: orderBy } };
    }
    if (field === "stock") {
      return { currentPublishedVersion: { totalVariantStock: orderBy } };
    }
    return { [field]: orderBy };
  }
}
