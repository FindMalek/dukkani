import { ProductEntity } from "@dukkani/common/entities/product/entity";
import { ProductQuery } from "@dukkani/common/entities/product/query";
import { StoreStatus } from "@dukkani/common/schemas/enums";
import {
  getProductInputSchema,
  getProductsByIdsInputSchema,
  listProductsInputSchema,
} from "@dukkani/common/schemas/product/input";
import type {
  ListProductsOutput,
  ProductPublicOutput,
} from "@dukkani/common/schemas/product/output";
import {
  listProductsOutputSchema,
  productPublicOutputSchema,
  productsPublicOutputSchema,
} from "@dukkani/common/schemas/product/output";
import { database } from "@dukkani/db";
import { ProductVersionStatus } from "@dukkani/db/prisma/generated/enums";
import { ORPCError } from "@orpc/server";
import { z } from "zod";
import { rateLimitPublicSafe } from "../../middleware/rate-limit";
import { baseProcedure } from "../../procedures";
import { SORT_ORDER_MAP, STOCK_RANGE_MAP } from "../../utils/product-list-maps";

const listPublicProductsInputSchema = listProductsInputSchema.extend({
  storeId: z.string().min(1),
});

export const productRouter = {
  getAllPublic: baseProcedure
    .use(rateLimitPublicSafe)
    .input(listPublicProductsInputSchema)
    .output(listProductsOutputSchema)
    .handler(async ({ input }): Promise<ListProductsOutput> => {
      const page = input.page ?? 1;
      const limit = input.limit ?? 20;
      const skip = (page - 1) * limit;

      const store = await database.store.findUnique({
        where: { id: input.storeId },
        select: { id: true, status: true },
      });

      if (!store || store.status !== StoreStatus.PUBLISHED) {
        throw new ORPCError("NOT_FOUND", { message: "Store not found" });
      }

      const where = ProductQuery.getWhere([input.storeId], {
        storeId: input.storeId,
        published: true,
        search: input.search,
        stock: STOCK_RANGE_MAP[input.stockFilter ?? "all"],
        categoryId: input.categoryId,
        priceMin: input.priceMin,
        priceMax: input.priceMax,
      });

      const orderBy = SORT_ORDER_MAP[input.sortBy ?? "newest"];

      const [products, total] = await Promise.all([
        database.product.findMany({
          where,
          skip,
          take: limit,
          orderBy,
          include: ProductQuery.getStorefrontListInclude(),
        }),
        database.product.count({ where }),
      ]);

      const hasMore = skip + products.length < total;

      return {
        products: products.map(ProductEntity.getStorefrontListRo),
        total,
        hasMore,
        page,
        limit,
      };
    }),

  getByIdPublic: baseProcedure
    .use(rateLimitPublicSafe)
    .input(getProductInputSchema)
    .output(productPublicOutputSchema)
    .handler(async ({ input }): Promise<ProductPublicOutput> => {
      const product = await database.product.findUnique({
        where: { id: input.id },
        include: ProductQuery.getPublicInclude(),
      });

      if (!product || !product.published) {
        throw new ORPCError("NOT_FOUND", { message: "Product not found" });
      }

      if (
        !product.currentPublishedVersionId ||
        product.currentPublishedVersion?.status !==
          ProductVersionStatus.PUBLISHED
      ) {
        throw new ORPCError("NOT_FOUND", { message: "Product not found" });
      }

      if (product.store.status !== StoreStatus.PUBLISHED) {
        throw new ORPCError("NOT_FOUND", { message: "Product not found" });
      }

      if (!ProductQuery.isPublicWithPublished(product)) {
        throw new ORPCError("NOT_FOUND", { message: "Product not found" });
      }

      return ProductEntity.getPublicRo(product);
    }),

  getByIdsPublic: baseProcedure
    .use(rateLimitPublicSafe)
    .input(getProductsByIdsInputSchema)
    .output(productsPublicOutputSchema)
    .handler(async ({ input }): Promise<ProductPublicOutput[]> => {
      const products = await database.product.findMany({
        where: {
          id: { in: input.ids },
          store: { status: StoreStatus.PUBLISHED },
          ...ProductQuery.getPublishableWhere(),
        },
        include: ProductQuery.getPublicInclude(),
      });

      if (products.length === 0) return [];

      return products
        .filter(ProductQuery.isPublicWithPublished)
        .map((p) => ProductEntity.getPublicRo(p));
    }),
};
