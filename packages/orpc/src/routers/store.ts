import {
	getStoreInputSchema,
	listStoresInputSchema,
} from "@dukkani/common/schemas/store/input";
import {
	storeIncludeOutputSchema,
	storeSimpleOutputSchema,
} from "@dukkani/common/schemas/store/output";
import { StoreService } from "@dukkani/common/services";
import { ORPCError } from "@orpc/server";
import { z } from "zod";
import { protectedProcedure } from "../index";

export const storeRouter = {
	/**
	 * Get all stores owned by the authenticated user
	 */
	getAll: protectedProcedure
		.input(listStoresInputSchema.optional())
		.output(z.array(storeSimpleOutputSchema))
		.handler(async ({ context }) => {
			const userId = context.session.user.id;

			return await StoreService.getAllStores(userId);
		}),

	/**
	 * Get a specific store by ID (verify ownership)
	 */
	getById: protectedProcedure
		.input(getStoreInputSchema)
		.output(storeIncludeOutputSchema)
		.handler(async ({ input, context }) => {
			const userId = context.session.user.id;

			if (!input.id) {
				throw new ORPCError("BAD_REQUEST", {
					message: "Store ID is required",
				});
			}

			return await StoreService.getStoreById(input.id, userId);
		}),

	/**
	 * Get store by slug (verify ownership)
	 */
	getBySlug: protectedProcedure
		.input(getStoreInputSchema)
		.output(storeIncludeOutputSchema)
		.handler(async ({ input, context }) => {
			const userId = context.session.user.id;

			if (!input.slug) {
				throw new ORPCError("BAD_REQUEST", {
					message: "Store slug is required",
				});
			}

			return await StoreService.getStoreBySlug(input.slug, userId);
		}),
};
