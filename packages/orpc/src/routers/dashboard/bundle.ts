import { ProductEntity } from "@dukkani/common/entities/product/entity";
import { ProductQuery } from "@dukkani/common/entities/product/query";
import {
  createBundleInputSchema,
  getBundleInputSchema,
  listBundlesInputSchema,
  updateBundleInputSchema,
} from "@dukkani/common/schemas/bundle/input";
import type {
  BundleIncludeOutput,
  ListBundlesOutput,
} from "@dukkani/common/schemas/bundle/output";
import {
  bundleIncludeOutputSchema,
  listBundlesOutputSchema,
} from "@dukkani/common/schemas/bundle/output";
import type { UploadFilesOutput } from "@dukkani/common/schemas/storage/output";
import { uploadFilesOutputSchema } from "@dukkani/common/schemas/storage/output";
import { successOutputSchema } from "@dukkani/common/schemas/utils/success";
import { BundleService, ProductVersionService } from "@dukkani/common/services";
import { database } from "@dukkani/db";
import { ProductType } from "@dukkani/db/prisma/generated/enums";
import { ORPCError } from "@orpc/server";
import { z } from "zod";
import { protectedProcedure } from "../../procedures";
import { executeUploadFiles } from "../../utils/storage-upload";
import {
  getUserStoreIds,
  verifyStoreOwnership,
} from "../../utils/store-access";

export const bundleRouter = {
  getAll: protectedProcedure
    .input(listBundlesInputSchema)
    .output(listBundlesOutputSchema)
    .handler(async ({ input, context }): Promise<ListBundlesOutput> => {
      const userId = context.session.user.id;
      const userStoreIds = await getUserStoreIds(userId);

      if (userStoreIds.length === 0) {
        return {
          bundles: [],
          total: 0,
          hasMore: false,
          page: input?.page ?? 1,
          limit: input?.limit ?? 20,
        };
      }

      if (input?.storeId && !userStoreIds.includes(input.storeId)) {
        throw new ORPCError("FORBIDDEN", {
          message: "You don't have access to this store",
        });
      }

      const page = input?.page ?? 1;
      const limit = input?.limit ?? 20;
      const skip = (page - 1) * limit;

      const where = {
        storeId: input?.storeId
          ? { in: [input.storeId] }
          : { in: userStoreIds },
        type: ProductType.BUNDLE,
        ...(input?.search && {
          OR: [
            {
              currentPublishedVersion: {
                name: { contains: input.search, mode: "insensitive" as const },
              },
            },
            {
              draftVersion: {
                name: { contains: input.search, mode: "insensitive" as const },
              },
            },
          ],
        }),
      };

      const [products, total] = await Promise.all([
        database.product.findMany({
          where,
          skip,
          take: limit,
          orderBy: { createdAt: "desc" },
          include: ProductQuery.getBundleInclude(),
        }),
        database.product.count({ where }),
      ]);

      const hasMore = skip + products.length < total;

      return {
        bundles: products.map(ProductEntity.getBundleListRo),
        total,
        hasMore,
        page,
        limit,
      };
    }),

  getById: protectedProcedure
    .input(getBundleInputSchema)
    .output(bundleIncludeOutputSchema)
    .handler(async ({ input, context }): Promise<BundleIncludeOutput> => {
      const userId = context.session.user.id;

      const product = await database.product.findUnique({
        where: { id: input.id, type: ProductType.BUNDLE },
        include: ProductQuery.getBundleInclude(),
      });

      if (!product) {
        throw new ORPCError("NOT_FOUND", { message: "Bundle not found" });
      }

      await verifyStoreOwnership(userId, product.storeId);
      return ProductEntity.getBundleRo(product);
    }),

  create: protectedProcedure
    .input(createBundleInputSchema)
    .output(bundleIncludeOutputSchema)
    .handler(async ({ input, context }): Promise<BundleIncludeOutput> => {
      const userId = context.session.user.id;
      await verifyStoreOwnership(userId, input.storeId);

      const store = await database.store.findUnique({
        where: { id: input.storeId },
        select: { slug: true },
      });

      if (!store) {
        throw new ORPCError("NOT_FOUND", { message: "Store not found" });
      }

      const productId = await database.$transaction(async (tx) => {
        return await BundleService.createBundle(
          tx,
          store.slug,
          input.storeId,
          input,
        );
      });

      const product = await database.product.findUnique({
        where: { id: productId },
        include: ProductQuery.getBundleInclude(),
      });

      if (!product) {
        throw new ORPCError("INTERNAL_SERVER_ERROR", {
          message: "Failed to load bundle after creation",
        });
      }

      return ProductEntity.getBundleRo(product);
    }),

  update: protectedProcedure
    .input(updateBundleInputSchema)
    .output(bundleIncludeOutputSchema)
    .handler(async ({ input, context }): Promise<BundleIncludeOutput> => {
      const userId = context.session.user.id;

      const existing = await database.product.findUnique({
        where: { id: input.id, type: ProductType.BUNDLE },
        select: { storeId: true },
      });

      if (!existing) {
        throw new ORPCError("NOT_FOUND", { message: "Bundle not found" });
      }

      await verifyStoreOwnership(userId, existing.storeId);

      await database.$transaction(async (tx) => {
        await BundleService.updateBundle(tx, input.id, input);
      });

      const product = await database.product.findUnique({
        where: { id: input.id },
        include: ProductQuery.getBundleInclude(),
      });

      if (!product) {
        throw new ORPCError("INTERNAL_SERVER_ERROR", {
          message: "Failed to load bundle after update",
        });
      }

      return ProductEntity.getBundleRo(product);
    }),

  delete: protectedProcedure
    .input(getBundleInputSchema)
    .output(successOutputSchema)
    .handler(async ({ input, context }) => {
      const userId = context.session.user.id;

      const product = await database.product.findUnique({
        where: { id: input.id, type: ProductType.BUNDLE },
        select: { storeId: true },
      });

      if (!product) {
        throw new ORPCError("NOT_FOUND", { message: "Bundle not found" });
      }

      await verifyStoreOwnership(userId, product.storeId);

      await database.product.delete({ where: { id: input.id } });
      return { success: true };
    }),

  publish: protectedProcedure
    .input(
      z.object({
        id: z.string().min(1),
        expectedDraftUpdatedAt: z.date().optional(),
      }),
    )
    .output(bundleIncludeOutputSchema)
    .handler(async ({ input, context }): Promise<BundleIncludeOutput> => {
      const userId = context.session.user.id;

      const product = await database.product.findUnique({
        where: { id: input.id, type: ProductType.BUNDLE },
        select: { storeId: true },
      });

      if (!product) {
        throw new ORPCError("NOT_FOUND", { message: "Bundle not found" });
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
        include: ProductQuery.getBundleInclude(),
      });

      if (!updated) {
        throw new ORPCError("INTERNAL_SERVER_ERROR", {
          message: "Failed to load bundle after publish",
        });
      }

      return ProductEntity.getBundleRo(updated);
    }),

  discardDraft: protectedProcedure
    .input(getBundleInputSchema)
    .output(bundleIncludeOutputSchema)
    .handler(async ({ input, context }): Promise<BundleIncludeOutput> => {
      const userId = context.session.user.id;

      const product = await database.product.findUnique({
        where: { id: input.id, type: ProductType.BUNDLE },
        select: { storeId: true },
      });

      if (!product) {
        throw new ORPCError("NOT_FOUND", { message: "Bundle not found" });
      }

      await verifyStoreOwnership(userId, product.storeId);

      await database.$transaction(async (tx) => {
        await ProductVersionService.discardDraft(tx, input.id);
      });

      const updated = await database.product.findUnique({
        where: { id: input.id },
        include: ProductQuery.getBundleInclude(),
      });

      if (!updated) {
        throw new ORPCError("INTERNAL_SERVER_ERROR", {
          message: "Failed to load bundle after discarding draft",
        });
      }

      return ProductEntity.getBundleRo(updated);
    }),

  uploadImages: protectedProcedure
    .input(
      z.object({
        storeId: z.string().min(1),
        files: z.array(z.instanceof(File)).min(1).max(10),
      }),
    )
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
