import { ProductEntity } from "@dukkani/common/entities/product/entity";
import { ProductQuery } from "@dukkani/common/entities/product/query";
import {
  createProductInputSchema,
  discardDraftProductInputSchema,
  getProductInputSchema,
  listProductsInputSchema,
  productUploadImagesInputSchema,
  publishProductInputSchema,
  togglePublishProductInputSchema,
  updateProductInputSchema,
} from "@dukkani/common/schemas/product/input";
import type {
  ListProductsOutput,
  ProductIncludeOutput,
} from "@dukkani/common/schemas/product/output";
import {
  listProductsOutputSchema,
  productIncludeOutputSchema,
} from "@dukkani/common/schemas/product/output";
import type { UploadFilesOutput } from "@dukkani/common/schemas/storage/output";
import { uploadFilesOutputSchema } from "@dukkani/common/schemas/storage/output";
import { successOutputSchema } from "@dukkani/common/schemas/utils/success";
import {
  ProductService,
  ProductVersionService,
} from "@dukkani/common/services";
import { database } from "@dukkani/db";
import { logger } from "@dukkani/logger";
import { StorageService } from "@dukkani/storage";
import { env } from "@dukkani/storage/env";
import { ORPCError } from "@orpc/server";
import { protectedProcedure } from "../../procedures";
import { STOCK_RANGE_MAP } from "../../utils/product-list-maps";
import { executeUploadFiles } from "../../utils/storage-upload";
import {
  getUserStoreIds,
  verifyStoreOwnership,
} from "../../utils/store-access";

export const productRouter = {
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

      if (input?.storeId && !userStoreIds.includes(input.storeId)) {
        throw new ORPCError("FORBIDDEN", {
          message: "You don't have access to this store",
        });
      }

      const hasVariants =
        input?.variantsFilter && input.variantsFilter !== "all"
          ? input.variantsFilter === "with-variants"
          : undefined;

      const where = ProductQuery.getWhere(userStoreIds, {
        storeId: input?.storeId,
        published: input?.published,
        search: input?.search,
        stock: STOCK_RANGE_MAP[input?.stockFilter ?? "all"],
        categoryId: input?.categoryId,
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
        throw new ORPCError("NOT_FOUND", { message: "Product not found" });
      }

      await verifyStoreOwnership(userId, product.storeId);
      return ProductEntity.getRo(product);
    }),

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
        throw new ORPCError("NOT_FOUND", { message: "Store not found" });
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
            stock: input.hasVariants ? 0 : input.stock,
            hasVariants: input.hasVariants ?? false,
            imageUrls: input.imageUrls,
            variantOptions: input.hasVariants
              ? input.variantOptions
              : undefined,
            variants: input.hasVariants ? input.variants : undefined,
            addonGroups: input.addonGroups,
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
        throw new ORPCError("NOT_FOUND", { message: "Product not found" });
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

          const keptImageUrls = new Set(input.imageUrls);

          if (draftImages.length > 0) {
            try {
              for (const image of draftImages) {
                if (!image?.url || keptImageUrls.has(image.url)) continue;
                const imageKey = await StorageService.getKeyFromPublicUrl(
                  image.url,
                  env.S3_PUBLIC_BASE_URL,
                );
                if (!imageKey) continue;
                await StorageService.deleteFile(env.S3_BUCKET, imageKey);
              }
            } catch (storageError) {
              logger.error(
                { error: storageError, productId: input.id },
                "Failed to delete removed draft product images from storage",
              );
            }
          }

          await tx.image.deleteMany({ where: { productVersionId: versionId } });

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
          input.variantOptions.length > 0
        ) {
          if (!input.variants?.length) {
            throw new ORPCError("BAD_REQUEST", {
              message:
                "Variants matrix is required when variant options are provided",
            });
          }

          let imageUrlToId: Map<string, string> | undefined;
          if (input.variants.some((v) => v.imageUrl)) {
            const images = await tx.image.findMany({
              where: { productVersionId: versionId },
              select: { id: true, url: true },
            });
            imageUrlToId = new Map(images.map((img) => [img.url, img.id]));
          }

          await ProductVersionService.clearVariantMatrix(tx, versionId);
          await ProductVersionService.writeVariantMatrix(
            tx,
            versionId,
            input.variantOptions,
            input.variants,
            imageUrlToId,
          );
        }

        if (input.addonGroups !== undefined) {
          await ProductVersionService.writeAddonGroups(
            tx,
            versionId,
            input.addonGroups,
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
            ...(effectiveHasVariants
              ? { stock: 0 }
              : input.stock !== undefined
                ? { stock: input.stock }
                : {}),
            ...(input.hasVariants !== undefined && {
              hasVariants: input.hasVariants,
            }),
          },
        });

        if (effectiveHasVariants && input.price !== undefined) {
          await ProductVersionService.recomputeVariantEffectivePriceBounds(
            tx,
            versionId,
          );
        }
        await ProductVersionService.recomputeTotalVariantStock(tx, versionId);

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

  delete: protectedProcedure
    .input(getProductInputSchema)
    .output(successOutputSchema)
    .handler(async ({ input, context }) => {
      const userId = context.session.user.id;

      const product = await database.product.findUnique({
        where: { id: input.id },
        select: { storeId: true },
      });

      if (!product) {
        throw new ORPCError("NOT_FOUND", { message: "Product not found" });
      }

      await verifyStoreOwnership(userId, product.storeId);

      const images = await database.image.findMany({
        where: { productVersion: { productId: input.id } },
        select: { url: true },
      });

      if (images.length > 0) {
        try {
          const imageKeys = new Set<string>();
          for (const image of images) {
            if (image?.url) {
              const imageKey = await StorageService.getKeyFromPublicUrl(
                image.url,
                env.S3_PUBLIC_BASE_URL,
              );
              if (imageKey) {
                imageKeys.add(imageKey);
              }
            }
          }
          const results = await Promise.allSettled(
            [...imageKeys].map((key) =>
              StorageService.deleteFile(env.S3_BUCKET, key),
            ),
          );
          for (const result of results) {
            if (result.status === "rejected") {
              logger.error(
                { error: result.reason, productId: input.id },
                "Failed to delete product image from storage",
              );
            }
          }
        } catch (storageError) {
          logger.error(
            { error: storageError, productId: input.id },
            "Failed to delete product images from storage",
          );
        }
      }

      await database.product.delete({ where: { id: input.id } });
      return { success: true };
    }),

  togglePublish: protectedProcedure
    .input(togglePublishProductInputSchema)
    .output(productIncludeOutputSchema)
    .handler(async ({ input, context }): Promise<ProductIncludeOutput> => {
      const userId = context.session.user.id;

      const product = await database.product.findUnique({
        where: { id: input.id },
        select: { storeId: true },
      });

      if (!product) {
        throw new ORPCError("NOT_FOUND", { message: "Product not found" });
      }

      await verifyStoreOwnership(userId, product.storeId);

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
        throw new ORPCError("NOT_FOUND", { message: "Product not found" });
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
        throw new ORPCError("NOT_FOUND", { message: "Product not found" });
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

  uploadImages: protectedProcedure
    .input(productUploadImagesInputSchema)
    .output(uploadFilesOutputSchema)
    .handler(async ({ input, context }): Promise<UploadFilesOutput> => {
      const userId = context.session.user.id;
      await verifyStoreOwnership(userId, input.storeId);
      const target = { resource: "products" as const, entityId: input.storeId };
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
