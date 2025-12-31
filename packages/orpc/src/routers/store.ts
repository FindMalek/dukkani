import { UserOnboardingStep } from "@dukkani/common/schemas/enums";
import {
	createStoreOnboardingInputSchema,
	getStoreInputSchema,
	listStoresInputSchema,
} from "@dukkani/common/schemas/store/input";
import {
	storeIncludeOutputSchema,
	storeSimpleOutputSchema,
} from "@dukkani/common/schemas/store/output";
import { StoreService } from "@dukkani/common/services";
import { database } from "@dukkani/db";
import { ORPCError } from "@orpc/server";
import { z } from "zod";
import { protectedProcedure, publicProcedure } from "../index";

export const storeRouter = {
	/**
	 * Create a new store (onboarding flow)
	 * Auto-generates slug from store name and creates default FREE plan
	 */
	create: protectedProcedure
		.input(createStoreOnboardingInputSchema)
		.output(storeSimpleOutputSchema)
		.handler(async ({ input, context }) => {
			const userId = context.session.user.id;

			// Create store using service
			const store = await StoreService.createStore(input, userId);

			// Update user onboarding step to COMPLETE
			await database.user.update({
				where: { id: userId },
				data: { onboardingStep: UserOnboardingStep.STORE_CREATED },
			});

			return store;
		}),

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

	/**
	 * Get store by slug (public - for storefronts)
	 * No authentication required, but rate limited
	 * @todo: Do we really need a rate limit for this?
	 */
	getBySlugPublic: publicProcedure
		.input(z.object({ slug: z.string() }))
		.output(storeIncludeOutputSchema)
		.handler(async ({ input }) => {
			if (!input.slug) {
				throw new ORPCError("BAD_REQUEST", {
					message: "Store slug is required",
				});
			}

			return await StoreService.getStoreBySlugPublic(input.slug);
		}),
};
