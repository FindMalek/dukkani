import { CollectionEntity } from "@dukkani/common/entities/collection/entity";
import { CollectionQuery } from "@dukkani/common/entities/collection/query";
import {
  createCollectionInputSchema,
  getCollectionInputSchema,
  listCollectionsInputSchema,
  reorderCollectionProductsInputSchema,
  reorderCollectionsInputSchema,
  updateCollectionInputSchema,
} from "@dukkani/common/schemas/collection/input";
import {
  collectionIncludeOutputSchema,
  collectionSimpleOutputSchema,
  listCollectionsOutputSchema,
} from "@dukkani/common/schemas/collection/output";
import { CollectionService } from "@dukkani/common/services";
import { database } from "@dukkani/db";
import { ORPCError } from "@orpc/server";
import { z } from "zod";
import { protectedProcedure } from "../../procedures";
import { verifyStoreOwnership } from "../../utils/store-access";

export const collectionRouter = {
  create: protectedProcedure
    .input(createCollectionInputSchema)
    .output(collectionSimpleOutputSchema)
    .handler(async ({ input, context }) => {
      const userId = context.session.user.id;
      await verifyStoreOwnership(userId, input.storeId);

      if (input.productIds.length > 0) {
        const products = await database.product.findMany({
          where: { id: { in: input.productIds }, storeId: input.storeId },
          select: { id: true },
        });

        if (products.length !== input.productIds.length) {
          throw new ORPCError("BAD_REQUEST", {
            message:
              "Some products do not exist or belong to a different store",
          });
        }
      }

      return await CollectionService.createCollection(input);
    }),

  getAll: protectedProcedure
    .input(listCollectionsInputSchema)
    .output(listCollectionsOutputSchema)
    .handler(async ({ input, context }) => {
      const userId = context.session.user.id;

      await verifyStoreOwnership(userId, input.storeId);

      return await CollectionService.getAllCollections(input.storeId, {
        search: input.search,
      });
    }),

  getById: protectedProcedure
    .input(getCollectionInputSchema)
    .output(collectionIncludeOutputSchema)
    .handler(async ({ input, context }) => {
      const userId = context.session.user.id;
      const collection = await database.collection.findUnique({
        where: { id: input.id },
        include: CollectionQuery.getInclude(),
      });

      if (!collection) {
        throw new ORPCError("NOT_FOUND", { message: "Collection not found" });
      }

      await verifyStoreOwnership(userId, collection.storeId);
      return CollectionEntity.getRo(collection);
    }),

  update: protectedProcedure
    .input(updateCollectionInputSchema)
    .output(collectionSimpleOutputSchema)
    .handler(async ({ input, context }) => {
      const userId = context.session.user.id;
      const collection = await database.collection.findUnique({
        where: { id: input.id },
      });

      if (!collection) {
        throw new ORPCError("NOT_FOUND", { message: "Collection not found" });
      }

      await verifyStoreOwnership(userId, collection.storeId);

      if (input.productIds !== undefined && input.productIds.length > 0) {
        const products = await database.product.findMany({
          where: {
            id: { in: input.productIds },
            storeId: collection.storeId,
          },
          select: { id: true },
        });

        if (products.length !== input.productIds.length) {
          throw new ORPCError("BAD_REQUEST", {
            message:
              "Some products do not exist or belong to a different store",
          });
        }
      }

      return await CollectionService.updateCollection(input);
    }),

  delete: protectedProcedure
    .input(getCollectionInputSchema)
    .output(z.object({ success: z.boolean(), storeId: z.string() }))
    .handler(async ({ input, context }) => {
      const userId = context.session.user.id;
      const collection = await database.collection.findUnique({
        where: { id: input.id },
      });

      if (!collection) {
        throw new ORPCError("NOT_FOUND", { message: "Collection not found" });
      }

      await verifyStoreOwnership(userId, collection.storeId);
      await CollectionService.deleteCollection(input.id);

      return { success: true, storeId: collection.storeId };
    }),

  reorderProducts: protectedProcedure
    .input(reorderCollectionProductsInputSchema)
    .output(z.object({ success: z.boolean() }))
    .handler(async ({ input, context }) => {
      const userId = context.session.user.id;
      const collection = await database.collection.findUnique({
        where: { id: input.collectionId },
      });

      if (!collection) {
        throw new ORPCError("NOT_FOUND", { message: "Collection not found" });
      }

      await verifyStoreOwnership(userId, collection.storeId);

      const existingProducts = await database.productCollection.findMany({
        where: { collectionId: input.collectionId },
        select: { productId: true },
      });

      const existingProductIds = existingProducts.map((pc) => pc.productId);
      const inputProductIdsSet = new Set(input.productIds);

      if (existingProductIds.length !== input.productIds.length) {
        throw new ORPCError("BAD_REQUEST", {
          message:
            "All products in the collection must be included in the reorder",
        });
      }

      const missingProducts = existingProductIds.filter(
        (id) => !inputProductIdsSet.has(id),
      );
      if (missingProducts.length > 0) {
        throw new ORPCError("BAD_REQUEST", {
          message:
            "All products in the collection must be included in the reorder",
        });
      }

      if (input.productIds.length > 0) {
        const products = await database.product.findMany({
          where: { id: { in: input.productIds }, storeId: collection.storeId },
          select: { id: true },
        });
        if (products.length !== input.productIds.length) {
          throw new ORPCError("BAD_REQUEST", {
            message:
              "Some products do not exist or belong to a different store",
          });
        }
      }

      await CollectionService.reorderCollectionProducts(
        input.collectionId,
        input.productIds,
      );

      return { success: true };
    }),

  reorderCollections: protectedProcedure
    .input(reorderCollectionsInputSchema)
    .output(z.object({ success: z.boolean() }))
    .handler(async ({ input, context }) => {
      const userId = context.session.user.id;
      await verifyStoreOwnership(userId, input.storeId);

      const collections = await database.collection.findMany({
        where: { id: { in: input.collectionIds }, storeId: input.storeId },
        select: { id: true },
      });

      if (collections.length !== input.collectionIds.length) {
        throw new ORPCError("BAD_REQUEST", {
          message:
            "Some collections do not exist or belong to a different store",
        });
      }

      await CollectionService.reorderCollections(
        input.storeId,
        input.collectionIds,
      );
      return { success: true };
    }),
};
