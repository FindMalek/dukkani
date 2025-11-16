import { protectedProcedure } from "../index";
import { StoreService } from "@dukkani/common/services";
import {
	listStoresInputSchema,
	getStoreInputSchema,
} from "@dukkani/common/schemas/store/input";

export const storeRouter = {
	/**
	 * Get all stores owned by the authenticated user
	 */
	getAll: protectedProcedure
		.input(listStoresInputSchema.optional())
		.handler(async ({ context }) => {
			const userId = context.session.user.id;

			return await StoreService.getAllStores(userId);
		}),

	/**
	 * Get a specific store by ID (verify ownership)
	 */
	getById: protectedProcedure
		.input(getStoreInputSchema)
		.handler(async ({ input, context }) => {
			const userId = context.session.user.id;

			if (!input.id) {
				throw new Error("Store ID is required");
			}

			return await StoreService.getStoreById(input.id, userId);
		}),

	/**
	 * Get store by slug (verify ownership)
	 */
	getBySlug: protectedProcedure
		.input(getStoreInputSchema)
		.handler(async ({ input, context }) => {
			const userId = context.session.user.id;
			
			if (!input.slug) {
				throw new Error("Store slug is required");
			}

			return await StoreService.getStoreBySlug(input.slug, userId);
		}),
};
