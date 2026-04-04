import { ProductEntity } from "@dukkani/common/entities/product/entity";
import { ProductQuery } from "@dukkani/common/entities/product/query";
import { StoreStatus } from "@dukkani/common/schemas/enums";
import {
  createProductInputSchema,
  discardDraftProductInputSchema,
  getProductInputSchema,
  getProductsByIdsInputSchema,
  listProductsInputSchema,
  productUploadImagesInputSchema,
  publishProductInputSchema,
  togglePublishProductInputSchema,
  updateProductInputSchema,
} from "@dukkani/common/schemas/product/input";
import type {
  ListProductsOutput,
  ProductIncludeOutput,
  ProductPublicOutput,
} from "@dukkani/common/schemas/product/output";
import {
  listProductsOutputSchema,
  productIncludeOutputSchema,
  productPublicOutputSchema,
  productsPublicOutputSchema,
} from "@dukkani/common/schemas/product/output";
import type { UploadFilesOutput } from "@dukkani/common/schemas/storage/output";
import { uploadFilesOutputSchema } from "@dukkani/common/schemas/storage/output";
import { successOutputSchema } from "@dukkani/common/schemas/utils/success";
import {
  ProductService,
  ProductVersionService,
} from "@dukkani/common/services";
import { database } from "@dukkani/db";
import type { Prisma } from "@dukkani/db/prisma/generated";
import { ProductVersionStatus } from "@dukkani/db/prisma/generated/enums";
import { logger } from "@dukkani/logger";
import { StorageService } from "@dukkani/storage";
import { env } from "@dukkani/storage/env";
import { ORPCError } from "@orpc/server";
import { rateLimitPublicSafe } from "../middleware/rate-limit";
import { baseProcedure, protectedProcedure } from "../procedures";
import { executeUploadFiles } from "../utils/storage-upload";
import { getUserStoreIds, verifyStoreOwnership } from "../utils/store-access";

export const productRouter = {
  /**
   * Get all products for user's stores (with pagination/filtering)
   */
  getAll: protectedProcedure
    .input(listProductsInputSchema.optional())
    .output(listProductsOutputSchema)
    .handler(async ({ input, context }): Promise<ListProductsOutput> => {
      const userId = context.session.user.id;
      const userStoreIds = await getUserStoreIds(userId);

      if (userStoreIds.length === 0) {
        return {
          products: [],
          total: 0,
          hasMore: false,
          page: input?.page ?? 1,
          limit: input?.limit ?? 20,
        };
      }

      const page = input?.page ?? 1;
      const limit = input?.limit ?? 20;
      const skip = (page - 1) * limit;

      // Verify store ownership if filtering by specific store
      if (input?.storeId && !userStoreIds.includes(input.storeId)) {
        throw new ORPCError("FORBIDDEN", {
          message: "You don't have access to this store",
        });
      }

      // Convert stockFilter to stock range format
      let stockFilter: { lte?: number; gte?: number } | undefined;
      if (input?.stockFilter) {
        switch (input.stockFilter) {
          case "in-stock":
            stockFilter = { gte: 1 };
            break;
          case "low-stock":
            stockFilter = { gte: 1, lte: 10 };
            break;
          case "out-of-stock":
            stockFilter = { lte: 0 };
            break;
          default:
            // No filter
            break;
        }
      }

      const hasVariants =
        input?.variantsFilter && input.variantsFilter !== "all"
          ? input.variantsFilter === "with-variants"
          : undefined;

      const where = ProductQuery.getWhere(userStoreIds, {
        storeId: input?.storeId,
        published: input?.published,
        search: input?.search,
        stock: stockFilter,
        hasVariants,
        priceMin: input?.priceMin,
        priceMax: input?.priceMax,
      });

      const [products, total] = await Promise.all([
        database.product.findMany({
          where,
          skip,
          take: limit,
          orderBy: ProductQuery.getOrder("desc", "createdAt"),
          include: ProductQuery.getListInclude(),
        }),
        database.product.count({ where }),
      ]);

      const hasMore = skip + products.length < total;

      return {
        products: products.map(ProductEntity.getListRo),
        total,
        hasMore,
        page,
        limit,
      };
    }),

  /**
   * Get all public products for a store (for storefronts)
   * No authentication required, uses storefront rate limiting
   * Only returns published products
   */
  getAllPublic: baseProcedure
    .use(rateLimitPublicSafe)
    .input(listProductsInputSchema.optional())
    .output(listProductsOutputSchema)
    .handler(async ({ input }): Promise<ListProductsOutput> => {
      // Validate storeId is required
      if (!input?.storeId) {
        throw new ORPCError("BAD_REQUEST", {
          message: "storeId is required",
        });
      }

      const page = input?.page ?? 1;
      const limit = input?.limit ?? 20;
      const skip = (page - 1) * limit;

      // Verify store exists and is published
      const store = await database.store.findUnique({
        where: { id: input.storeId },
        select: { id: true, status: true },
      });

      if (!store) {
        throw new ORPCError("NOT_FOUND", {
          message: "Store not found",
        });
      }

      if (store.status !== StoreStatus.PUBLISHED) {
        throw new ORPCError("FORBIDDEN", {
          message: "Store is not available",
        });
      }

      // Build where clause for published products
      const where: Prisma.ProductWhereInput = {
        storeId: input.storeId,
        ...ProductQuery.getPublishableWhere(),
      };

      // Add category filter if provided
      if (input?.categoryId) {
        where.categoryId = input?.categoryId;
      }

      // Add search filter if provided
      if (input?.search) {
        const q = input.search;
        where.OR = [
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
        ];
      }

      const [products, total] = await Promise.all([
        database.product.findMany({
          where,
          skip,
          take: limit,
          orderBy: { createdAt: "desc" },
          include: ProductQuery.getListInclude(),
        }),
        database.product.count({ where }),
      ]);

      const hasMore = skip + products.length < total;

      return {
        products: products.map(ProductEntity.getListRo),
        total,
        hasMore,
        page,
        limit,
      };
    }),

  /**
   * Get product by ID (verify store ownership)
   */
  getById: protectedProcedure
    .input(getProductInputSchema)
    .output(productIncludeOutputSchema)
    .handler(async ({ input, context }): Promise<ProductIncludeOutput> => {
      const userId = context.session.user.id;

      const product = await database.product.findUnique({
        where: { id: input.id },
        include: ProductQuery.getInclude(),
      });

      if (!product) {
        throw new ORPCError("NOT_FOUND", {
          message: "Product not found",
        });
      }

      // Verify ownership
      await verifyStoreOwnership(userId, product.storeId);

      return ProductEntity.getRo(product);
    }),

  /**
   * Create new product (verify store ownership)
   */
  create: protectedProcedure
    .input(createProductInputSchema)
    .output(productIncludeOutputSchema)
    .handler(async ({ input, context }): Promise<ProductIncludeOutput> => {
      const userId = context.session.user.id;

      await verifyStoreOwnership(userId, input.storeId);

      const store = await database.store.findUnique({
        where: { id: input.storeId },
        select: { slug: true },
      });

      if (!store) {
        throw new ORPCError("NOT_FOUND", {
          message: "Store not found",
        });
      }

      const productId = ProductService.generateProductId(store.slug);

      const product = await database.$transaction(async (tx) => {
        const createdProduct = await tx.product.create({
          data: {
            id: productId,
            published: input.published ?? false,
            storeId: input.storeId,
            categoryId: input.categoryId,
          },
        });

        await ProductVersionService.createInitialPublishedVersion(
          tx,
          createdProduct.id,
          {
            name: input.name,
            description: input.description,
            price: input.price,
            stock: input.stock,
            hasVariants: input.hasVariants ?? false,
            imageUrls: input.imageUrls,
            variantOptions: input.hasVariants
              ? input.variantOptions
              : undefined,
            variants: input.hasVariants ? input.variants : undefined,
          },
        );

        return await tx.product.findUnique({
          where: { id: createdProduct.id },
          include: ProductQuery.getInclude(),
        });
      });

      if (!product) {
        throw new ORPCError("INTERNAL_SERVER_ERROR", {
          message: "Failed to create product",
        });
      }

      return ProductEntity.getRo(product);
    }),

  /**
   * Update product (verify store ownership)
   */
  update: protectedProcedure
    .input(updateProductInputSchema)
    .output(productIncludeOutputSchema)
    .handler(async ({ input, context }): Promise<ProductIncludeOutput> => {
      const userId = context.session.user.id;

      const existingProduct = await database.product.findUnique({
        where: { id: input.id },
        select: { storeId: true },
      });

      if (!existingProduct) {
        throw new ORPCError("NOT_FOUND", {
          message: "Product not found",
        });
      }

      await verifyStoreOwnership(userId, existingProduct.storeId);

      if (input.variantOptions !== undefined) {
        const optionNames = input.variantOptions
          .map((opt) => opt.name.toLowerCase().trim())
          .filter((name) => name.length > 0);
        if (new Set(optionNames).size !== optionNames.length) {
          throw new ORPCError("BAD_REQUEST", {
            message: "Duplicate option names are not allowed",
          });
        }
      }

      const product = await database.$transaction(async (tx) => {
        const versionId = await ProductVersionService.ensureEditingVersionId(
          tx,
          input.id,
        );

        if (input.imageUrls !== undefined) {
          const draftImages = await tx.image.findMany({
            where: { productVersionId: versionId },
            select: { url: true },
          });

          if (draftImages.length > 0) {
            try {
              const folderPrefixes = new Set<string>();
              for (const image of draftImages) {
                if (image?.url) {
                  const imageKey = await StorageService.getKeyFromPublicUrl(
                    image.url,
                    env.S3_PUBLIC_BASE_URL,
                  );

                  if (imageKey) {
                    const lastSlashIndex = imageKey.lastIndexOf("/");
                    if (lastSlashIndex > 0) {
                      const folderPrefix = imageKey.substring(
                        0,
                        lastSlashIndex,
                      );
                      folderPrefixes.add(folderPrefix);
                    }
                  }
                }
              }

              for (const folderPrefix of folderPrefixes) {
                await StorageService.deleteFolderByPrefix(
                  env.S3_BUCKET,
                  folderPrefix,
                );
              }
            } catch (storageError) {
              logger.error(
                { error: storageError, productId: input.id },
                "Failed to delete old draft product image folders from storage",
              );
            }
          }

          await tx.image.deleteMany({
            where: { productVersionId: versionId },
          });

          if (input.imageUrls.length > 0) {
            await tx.image.createMany({
              data: input.imageUrls.map((url) => ({
                url,
                productVersionId: versionId,
              })),
            });
          }
        }

        const draftRow = await tx.productVersion.findUniqueOrThrow({
          where: { id: versionId },
          select: { hasVariants: true },
        });

        const effectiveHasVariants =
          input.hasVariants !== undefined
            ? input.hasVariants
            : draftRow.hasVariants;

        if (
          effectiveHasVariants &&
          input.variantOptions !== undefined &&
          input.variantOptions.length === 0
        ) {
          throw new ORPCError("BAD_REQUEST", {
            message:
              "At least one variant option is required when variants are enabled",
          });
        }

        if (input.hasVariants === false) {
          await ProductVersionService.clearVariantMatrix(tx, versionId);
        } else if (
          effectiveHasVariants &&
          input.variantOptions !== undefined &&
          input.variants !== undefined
        ) {
          await ProductVersionService.clearVariantMatrix(tx, versionId);
          await ProductVersionService.writeVariantMatrix(
            tx,
            versionId,
            input.variantOptions,
            input.variants,
          );
        }

        await tx.productVersion.update({
          where: { id: versionId },
          data: {
            ...(input.name !== undefined && { name: input.name }),
            ...(input.description !== undefined && {
              description: input.description || null,
            }),
            ...(input.price !== undefined && { price: input.price }),
            ...(input.stock !== undefined && { stock: input.stock }),
            ...(input.hasVariants !== undefined && {
              hasVariants: input.hasVariants,
            }),
          },
        });

        await tx.product.update({
          where: { id: input.id },
          data: {
            ...(input.published !== undefined && {
              published: input.published,
            }),
            ...(input.categoryId !== undefined && {
              categoryId: input.categoryId || null,
            }),
          },
        });

        return await tx.product.findUnique({
          where: { id: input.id },
          include: ProductQuery.getInclude(),
        });
      });

      if (!product) {
        throw new ORPCError("INTERNAL_SERVER_ERROR", {
          message: "Failed to update product",
        });
      }

      return ProductEntity.getRo(product);
    }),

  /**
   * Delete product (verify store ownership)
   */
  delete: protectedProcedure
    .input(getProductInputSchema)
    .output(successOutputSchema)
    .handler(async ({ input, context }) => {
      const userId = context.session.user.id;

      const product = await database.product.findUnique({
        where: { id: input.id },
        select: {
          storeId: true,
        },
      });

      if (!product) {
        throw new ORPCError("NOT_FOUND", {
          message: "Product not found",
        });
      }

      await verifyStoreOwnership(userId, product.storeId);

      const images = await database.image.findMany({
        where: { productVersion: { productId: input.id } },
        select: { url: true },
      });

      if (images.length > 0) {
        try {
          const folderPrefixes = new Set<string>();
          for (const image of images) {
            if (image?.url) {
              const imageKey = await StorageService.getKeyFromPublicUrl(
                image.url,
                env.S3_PUBLIC_BASE_URL,
              );

              if (imageKey) {
                // Extract folder prefix by removing filename (last segment after last '/')
                const lastSlashIndex = imageKey.lastIndexOf("/");
                if (lastSlashIndex > 0) {
                  const folderPrefix = imageKey.substring(0, lastSlashIndex);
                  folderPrefixes.add(folderPrefix);
                }
              }
            }
          }

          // Delete each unique folder
          for (const folderPrefix of folderPrefixes) {
            await StorageService.deleteFolderByPrefix(
              env.S3_BUCKET,
              folderPrefix,
            );
          }
        } catch (storageError) {
          logger.error(
            { error: storageError, productId: input.id },
            "Failed to delete product image folders from storage",
          );
        }
      }

      // Delete product (images will be cascade deleted from database)
      await database.product.delete({
        where: { id: input.id },
      });

      return { success: true };
    }),

  /**
   * Toggle product published status
   */
  togglePublish: protectedProcedure
    .input(togglePublishProductInputSchema)
    .output(productIncludeOutputSchema)
    .handler(async ({ input, context }): Promise<ProductIncludeOutput> => {
      const userId = context.session.user.id;

      // Get product to verify ownership
      const product = await database.product.findUnique({
        where: { id: input.id },
        select: { storeId: true },
      });

      if (!product) {
        throw new ORPCError("NOT_FOUND", {
          message: "Product not found",
        });
      }

      // Verify ownership
      await verifyStoreOwnership(userId, product.storeId);

      // Update published status
      const updated = await database.product.update({
        where: { id: input.id },
        data: { published: input.published },
        include: ProductQuery.getInclude(),
      });

      return ProductEntity.getRo(updated);
    }),

  publish: protectedProcedure
    .input(publishProductInputSchema)
    .output(productIncludeOutputSchema)
    .handler(async ({ input, context }): Promise<ProductIncludeOutput> => {
      const userId = context.session.user.id;

      const product = await database.product.findUnique({
        where: { id: input.id },
        select: { storeId: true },
      });

      if (!product) {
        throw new ORPCError("NOT_FOUND", {
          message: "Product not found",
        });
      }

      await verifyStoreOwnership(userId, product.storeId);

      await database.$transaction(async (tx) => {
        await ProductVersionService.publishDraft(
          tx,
          input.id,
          input.expectedDraftUpdatedAt,
        );
      });

      const updated = await database.product.findUnique({
        where: { id: input.id },
        include: ProductQuery.getInclude(),
      });

      if (!updated) {
        throw new ORPCError("INTERNAL_SERVER_ERROR", {
          message: "Failed to load product after publish",
        });
      }

      return ProductEntity.getRo(updated);
    }),

  discardDraft: protectedProcedure
    .input(discardDraftProductInputSchema)
    .output(productIncludeOutputSchema)
    .handler(async ({ input, context }): Promise<ProductIncludeOutput> => {
      const userId = context.session.user.id;

      const product = await database.product.findUnique({
        where: { id: input.id },
        select: { storeId: true },
      });

      if (!product) {
        throw new ORPCError("NOT_FOUND", {
          message: "Product not found",
        });
      }

      await verifyStoreOwnership(userId, product.storeId);

      await database.$transaction(async (tx) => {
        await ProductVersionService.discardDraft(tx, input.id);
      });

      const updated = await database.product.findUnique({
        where: { id: input.id },
        include: ProductQuery.getInclude(),
      });

      if (!updated) {
        throw new ORPCError("INTERNAL_SERVER_ERROR", {
          message: "Failed to load product after discarding draft",
        });
      }

      return ProductEntity.getRo(updated);
    }),

  /**
   * Get product by ID (public - for storefronts)
   * No authentication required, uses storefront rate limiting (100/min)
   * Returns product with store info, variants, and images
   */
  getByIdPublic: baseProcedure
    .use(rateLimitPublicSafe)
    .input(getProductInputSchema)
    .output(productPublicOutputSchema)
    .handler(async ({ input }): Promise<ProductPublicOutput> => {
      const product = await database.product.findUnique({
        where: { id: input.id },
        include: ProductQuery.getPublicInclude(),
      });

      if (!product) {
        throw new ORPCError("NOT_FOUND", {
          message: "Product not found",
        });
      }

      if (!product.published) {
        throw new ORPCError("NOT_FOUND", {
          message: "Product not found",
        });
      }

      if (
        !product.currentPublishedVersionId ||
        product.currentPublishedVersion?.status !==
          ProductVersionStatus.PUBLISHED
      ) {
        throw new ORPCError("NOT_FOUND", {
          message: "Product not found",
        });
      }

      if (product.store.status !== StoreStatus.PUBLISHED) {
        throw new ORPCError("NOT_FOUND", {
          message: "Product not found",
        });
      }

      if (!ProductQuery.isPublicWithPublished(product)) {
        throw new ORPCError("NOT_FOUND", {
          message: "Product not found",
        });
      }

      return ProductEntity.getPublicRo(product);
    }),

  /**
   * Get products by IDs (public - for storefronts)
   * No authentication required, uses storefront rate limiting (100/min)
   * Returns products with store info, variants, and images
   */
  getByIdsPublic: baseProcedure
    .use(rateLimitPublicSafe)
    .input(getProductsByIdsInputSchema)
    .output(productsPublicOutputSchema)
    .handler(async ({ input }): Promise<ProductPublicOutput[]> => {
      const products = await database.product.findMany({
        where: {
          id: { in: input.ids },
          ...ProductQuery.getPublishableWhere(),
        },
        include: ProductQuery.getPublicInclude(),
      });

      if (products.length === 0) {
        return [];
      }

      return products
        .filter(ProductQuery.isPublicWithPublished)
        .map((p) => ProductEntity.getPublicRo(p));
    }),

  /**
   * Upload product images (gallery or main)
   * Validates store ownership and builds storage target internally
   */
  uploadImages: protectedProcedure
    .input(productUploadImagesInputSchema)
    .output(uploadFilesOutputSchema)
    .handler(async ({ input, context }): Promise<UploadFilesOutput> => {
      const userId = context.session.user.id;
      await verifyStoreOwnership(userId, input.storeId);

      const target = {
        resource: "products" as const,
        entityId: input.storeId,
      };

      try {
        return await executeUploadFiles(input.files, target);
      } catch (error) {
        throw new ORPCError("INTERNAL_SERVER_ERROR", {
          message:
            error instanceof Error ? error.message : "Failed to upload images",
        });
      }
    }),
};
