import { database } from "@dukkani/db";
import { StorePlanType } from "@dukkani/db/prisma/generated/enums";
import { StoreEntity } from "../entities/store/entity";
import { StoreQuery } from "../entities/store/query";
import type { CreateStoreOnboardingInput } from "../schemas/store/input";
import type {
	StoreIncludeOutput,
	StorePublicOutput,
	StoreSimpleOutput,
} from "../schemas/store/output";
import { getOrderLimitForPlan } from "../schemas/store-plan/constants";

/**
 * Store service - Shared business logic for store operations
 */
export class StoreService {
	/**
	 * Generate a unique slug from store name
	 * Handles conflicts by appending numbers
	 */
	private static async generateUniqueSlug(baseName: string): Promise<string> {
		// Convert to slug: lowercase, replace spaces with hyphens, remove special chars
		const baseSlug = baseName
			.toLowerCase()
			.trim()
			.replace(/\s+/g, "-")
			.replace(/[^a-z0-9-]/g, "")
			.replace(/-+/g, "-")
			.replace(/^-|-$/g, "");

		let slug = baseSlug;
		let counter = 1;

		// Check if slug exists, if so append number
		while (true) {
			const existing = await database.store.findUnique({
				where: { slug },
				select: { id: true },
			});

			if (!existing) {
				return slug;
			}

			slug = `${baseSlug}-${counter}`;
			counter++;
		}
	}

	/**
	 * Create a new store with auto-generated slug and default plan
	 */
	static async createStore(
		input: CreateStoreOnboardingInput,
		userId: string,
	): Promise<StoreSimpleOutput> {
		const slug = await StoreService.generateUniqueSlug(input.name);
		const orderLimit = getOrderLimitForPlan(StorePlanType.FREE);

		const store = await database.store.create({
			data: {
				name: input.name,
				slug,
				description: input.description,
				theme: input.theme,
				notificationMethod: input.notificationMethod,
				ownerId: userId,
				storePlan: {
					create: {
						planType: StorePlanType.FREE,
						orderLimit,
						orderCount: 0,
					},
				},
			},
			include: StoreQuery.getClientSafeInclude(),
		});

		return StoreEntity.getSimpleRo(store);
	}

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

/**
 * Get store by slug (public - for storefronts)
 * Returns public data with owner (limited) and products (published only, paginated)
 */
static async getStoreBySlugPublic(
	slug: string,
	options?: {
		productPage?: number;
		productLimit?: number;
	},
): Promise<StorePublicOutput> {
	const productPage = options?.productPage ?? 1;
	const productLimit = options?.productLimit ?? 20;

	// First, get the store to find its ID
	const store = await database.store.findUnique({
		where: { slug },
		select: { id: true },
	});

	if (!store) {
		throw new Error("Store not found");
	}

	// Get total count of published products
	const totalProducts = await database.product.count({
		where: {
			storeId: store.id,
			published: true,
		},
	});

	// Get store with paginated products
	const storeWithProducts = await database.store.findUnique({
		where: { slug },
		include: StoreQuery.getPublicInclude({
			productPage,
			productLimit,
		}),
	});

	if (!storeWithProducts) {
		throw new Error("Store not found");
	}

	const result = StoreEntity.getPublicRo(storeWithProducts);

	// Add pagination metadata
	const productSkip = (productPage - 1) * productLimit;
	const hasMoreProducts = productSkip + (storeWithProducts.products?.length ?? 0) < totalProducts;

	return {
		...result,
		productsPagination: {
			total: totalProducts,
			hasMore: hasMoreProducts,
			page: productPage,
			limit: productLimit,
		},
	};
}
}
