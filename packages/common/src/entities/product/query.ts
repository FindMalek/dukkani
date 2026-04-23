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
    },
  ): Prisma.ProductWhereInput {
    const andParts: Prisma.ProductWhereInput[] = [];

    const where: Prisma.ProductWhereInput = {
      storeId: filters?.storeId ? { in: [filters.storeId] } : { in: storeIds },
    };

    if (filters?.published !== undefined) {
      where.published = filters.published;
    }

    if (filters?.search) {
      const q = filters.search;
      andParts.push({
        OR: [
          {
            currentPublishedVersion: {
              name: { contains: q, mode: "insensitive" },
            },
          },
          {
            currentPublishedVersion: {
              description: { contains: q, mode: "insensitive" },
            },
          },
          {
            draftVersion: {
              name: { contains: q, mode: "insensitive" },
            },
          },
          {
            draftVersion: {
              description: { contains: q, mode: "insensitive" },
            },
          },
        ],
      });
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
        andParts.push({
          OR: [
            {
              currentPublishedVersion: {
                is: { totalVariantStock: stockFilter },
              },
            },
            {
              draftVersion: {
                is: { totalVariantStock: stockFilter },
              },
            },
          ],
        });
      }
    }

    if (filters?.hasVariants !== undefined) {
      andParts.push({
        OR: [
          {
            currentPublishedVersion: {
              is: { hasVariants: filters.hasVariants },
            },
          },
          {
            draftVersion: {
              is: { hasVariants: filters.hasVariants },
            },
          },
        ],
      });
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
      andParts.push({
        OR: [
          {
            currentPublishedVersion: {
              is: versionPriceWhere,
            },
          },
          {
            draftVersion: {
              is: versionPriceWhere,
            },
          },
        ],
      });
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
