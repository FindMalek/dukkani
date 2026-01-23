import { database } from "@dukkani/db";
import { addSpanAttributes, traceStaticClass } from "@dukkani/tracing";
import { CollectionEntity } from "../entities/collection/entity";
import { CollectionQuery } from "../entities/collection/query";
import type {
	CreateCollectionInput,
	UpdateCollectionInput,
} from "../schemas/collection/input";
import type {
	CollectionIncludeOutput,
	CollectionOutput,
} from "../schemas/collection/output";

class CollectionServiceBase {
	/**
	 * Generate a unique slug from collection name
	 * Handles conflicts by appending numbers
	 */
	private static async generateUniqueSlug(
		baseName: string,
		storeId: string,
	): Promise<string> {
		addSpanAttributes({
			"collection.slug_base": baseName,
			"collection.store_id": storeId,
		});

		// Convert to slug: lowercase, replace spaces with hyphens, remove special chars
		const baseSlug = baseName
			.toLowerCase()
			.trim()
			.replace(/\s+/g, "-")
			.replace(/[^a-z0-9-]/g, "");

		let slug = baseSlug;
		let counter = 1;

		// Check if slug exists for this store, if so append number
		while (true) {
			const existing = await database.collection.findUnique({
				where: {
					storeId_slug: {
						storeId,
						slug,
					},
				},
				select: { id: true },
			});

			if (!existing) {
				addSpanAttributes({
					"collection.slug_final": slug,
					"collection.slug_attempts": counter,
				});
				return slug;
			}

			slug = `${baseSlug}-${counter}`;
			counter++;
		}
	}

	/**
	 * Create a new collection
	 */
	static async createCollection(
		input: CreateCollectionInput,
	): Promise<CollectionOutput> {
		addSpanAttributes({
			"collection.store_id": input.storeId,
			"collection.name": input.name,
			"collection.product_count": input.productIds.length,
		});

		const slug = await CollectionServiceBase.generateUniqueSlug(
			input.name,
			input.storeId,
		);

		const collection = await database.collection.create({
			data: {
				name: input.name,
				slug,
				description: input.description,
				image: input.image || null,
				position: input.position,
				storeId: input.storeId,
				productCollections: {
					create: input.productIds.map((productId, index) => ({
						productId,
						position: index,
					})),
				},
			},
			include: CollectionQuery.getSimpleInclude(),
		});

		return CollectionEntity.getSimpleRo(collection);
	}

	/**
	 * Get all collections for a store
	 */
	static async getAllCollections(
		storeId: string,
		filters?: { search?: string },
	): Promise<CollectionOutput[]> {
		addSpanAttributes({
			"collection.store_id": storeId,
		});

		const collections = await database.collection.findMany({
			where: CollectionQuery.getWhere(storeId, filters),
			include: CollectionQuery.getSimpleInclude(),
			orderBy: CollectionQuery.getOrder("asc", "position"),
		});

		return collections.map(CollectionEntity.getSimpleRo);
	}

	/**
	 * Get collection by ID
	 */
	static async getCollectionById(id: string): Promise<CollectionIncludeOutput> {
		addSpanAttributes({
			"collection.id": id,
		});

		const collection = await database.collection.findUnique({
			where: { id },
			include: CollectionQuery.getInclude(),
		});

		if (!collection) {
			throw new Error("Collection not found");
		}

		return CollectionEntity.getRo(collection);
	}

	/**
	 * Update collection
	 */
	static async updateCollection(
		input: UpdateCollectionInput,
	): Promise<CollectionOutput> {
		addSpanAttributes({
			"collection.id": input.id,
		});

		// If productIds are provided, update the product-collection relationships
		if (input.productIds !== undefined) {
			// Use transaction to ensure atomicity
			return await database.$transaction(async (tx) => {
				// Delete existing product-collection relationships
				await tx.productCollection.deleteMany({
					where: { collectionId: input.id },
				});

				// Create new relationships with positions
				if (input.productIds.length > 0) {
					await tx.productCollection.createMany({
						data: input.productIds.map((productId, index) => ({
							collectionId: input.id,
							productId,
							position: index,
						})),
					});
				}

				// Update collection fields
				const collection = await tx.collection.update({
					where: { id: input.id },
					data: {
						...(input.name && { name: input.name }),
						...(input.description !== undefined && {
							description: input.description || null,
						}),
						...(input.image !== undefined && { image: input.image || null }),
						...(input.position !== undefined && { position: input.position }),
					},
					include: CollectionQuery.getSimpleInclude(),
				});

				return CollectionEntity.getSimpleRo(collection);
			});
		}

		// Simple update without product changes
		const collection = await database.collection.update({
			where: { id: input.id },
			data: {
				...(input.name && { name: input.name }),
				...(input.description !== undefined && {
					description: input.description || null,
				}),
				...(input.image !== undefined && { image: input.image || null }),
				...(input.position !== undefined && { position: input.position }),
			},
			include: CollectionQuery.getSimpleInclude(),
		});

		return CollectionEntity.getSimpleRo(collection);
	}

	/**
	 * Delete collection
	 */
	static async deleteCollection(id: string): Promise<void> {
		addSpanAttributes({
			"collection.id": id,
		});

		await database.collection.delete({
			where: { id },
		});
	}

	/**
	 * Reorder products within a collection
	 */
	static async reorderCollectionProducts(
		collectionId: string,
		productIds: string[],
	): Promise<void> {
		addSpanAttributes({
			"collection.id": collectionId,
			"collection.product_count": productIds.length,
		});

		await database.$transaction(async (tx) => {
			// Delete existing relationships
			await tx.productCollection.deleteMany({
				where: { collectionId },
			});

			// Create new relationships with updated positions
			if (productIds.length > 0) {
				await tx.productCollection.createMany({
					data: productIds.map((productId, index) => ({
						collectionId,
						productId,
						position: index,
					})),
				});
			}
		});
	}

	/**
	 * Reorder collections for a store
	 */
	static async reorderCollections(
		storeId: string,
		collectionIds: string[],
	): Promise<void> {
		addSpanAttributes({
			"collection.store_id": storeId,
			"collection.count": collectionIds.length,
		});

		await database.$transaction(async (tx) => {
			// Update positions for each collection
			await Promise.all(
				collectionIds.map((collectionId, index) =>
					tx.collection.update({
						where: { id: collectionId },
						data: { position: index },
					}),
				),
			);
		});
	}
}

export const CollectionService = traceStaticClass(CollectionServiceBase);
