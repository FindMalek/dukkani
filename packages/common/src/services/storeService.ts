import { database } from "@dukkani/db";
import { StoreEntity } from "../entities/store/entity";
import { StoreQuery } from "../entities/store/query";
import type {
	StoreIncludeOutput,
	StoreSimpleOutput,
} from "../schemas/store/output";

/**
 * Store service - Shared business logic for store operations
 */
export class StoreService {
	/**
	 * Get all stores owned by a user
	 */
	static async getAllStores(userId: string): Promise<StoreSimpleOutput[]> {
		const stores = await database.store.findMany({
			where: {
				ownerId: userId,
			},
			orderBy: {
				createdAt: "desc",
			},
			include: StoreQuery.getClientSafeInclude(),
		});

		return stores.map(StoreEntity.getSimpleRo);
	}

	/**
	 * Get store by ID with ownership verification
	 */
	static async getStoreById(
		id: string,
		userId: string,
	): Promise<StoreIncludeOutput> {
		const store = await database.store.findUnique({
			where: { id },
			include: StoreQuery.getInclude(),
		});

		if (!store) {
			throw new Error("Store not found");
		}

		if (store.ownerId !== userId) {
			throw new Error("You don't have access to this store");
		}

		return StoreEntity.getRo(store);
	}

	/**
	 * Get store by slug with ownership verification
	 */
	static async getStoreBySlug(
		slug: string,
		userId: string,
	): Promise<StoreIncludeOutput> {
		const store = await database.store.findUnique({
			where: { slug },
			include: StoreQuery.getInclude(),
		});

		if (!store) {
			throw new Error("Store not found");
		}

		if (store.ownerId !== userId) {
			throw new Error("You don't have access to this store");
		}

		return StoreEntity.getRo(store);
	}
}
