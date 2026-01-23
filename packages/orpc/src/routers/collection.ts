import { CollectionEntity } from "@dukkani/common/entities/collection/entity";
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
import { protectedProcedure } from "../index";
import { verifyStoreOwnership } from "../utils/store-access";

export const collectionRouter = {
	/**
	 * Create a new collection for a store
	 */
	create: protectedProcedure
		.input(createCollectionInputSchema)
		.output(collectionSimpleOutputSchema)
		.handler(async ({ input, context }) => {
			const userId = context.session.user.id;
			await verifyStoreOwnership(userId, input.storeId);

			// Validate that all product IDs belong to the same store
			if (input.productIds.length > 0) {
				const products = await database.product.findMany({
					where: {
						id: { in: input.productIds },
						storeId: input.storeId,
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

			return await CollectionService.createCollection(input);
		}),

	/**
	 * Get all collections for a store
	 */
	getAll: protectedProcedure
		.input(listCollectionsInputSchema)
		.output(z.array(collectionSimpleOutputSchema))
		.handler(async ({ input, context }) => {
			const userId = context.session.user.id;
			await verifyStoreOwnership(userId, input.storeId);

			return await CollectionService.getAllCollections(input.storeId, {
				search: input.search,
			});
		}),

	/**
	 * Get collection by ID
	 */
	getById: protectedProcedure
		.input(getCollectionInputSchema)
		.output(collectionIncludeOutputSchema)
		.handler(async ({ input, context }) => {
			const userId = context.session.user.id;
			const collection = await database.collection.findUnique({
				where: { id: input.id },
			});

			if (!collection) {
				throw new ORPCError("NOT_FOUND", { message: "Collection not found" });
			}

			await verifyStoreOwnership(userId, collection.storeId);
			return await CollectionService.getCollectionById(input.id);
		}),

	/**
	 * Update collection
	 */
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

			// Validate product IDs if provided
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

	/**
	 * Delete collection
	 */
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

	/**
	 * Reorder products within a collection
	 */
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

			// Validate product IDs belong to the collection
			const existingProducts = await database.productCollection.findMany({
				where: {
					collectionId: input.collectionId,
					productId: { in: input.productIds },
				},
				select: { productId: true },
			});

			if (existingProducts.length !== input.productIds.length) {
				throw new ORPCError("BAD_REQUEST", {
					message: "Some products do not belong to this collection",
				});
			}

			await CollectionService.reorderCollectionProducts(
				input.collectionId,
				input.productIds,
			);
			return { success: true };
		}),

	/**
	 * Reorder collections for a store
	 */
	reorderCollections: protectedProcedure
		.input(reorderCollectionsInputSchema)
		.output(z.object({ success: z.boolean() }))
		.handler(async ({ input, context }) => {
			const userId = context.session.user.id;
			await verifyStoreOwnership(userId, input.storeId);

			// Validate all collections belong to the store
			const collections = await database.collection.findMany({
				where: {
					id: { in: input.collectionIds },
					storeId: input.storeId,
				},
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
