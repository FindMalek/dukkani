import { UserOnboardingStep } from "@dukkani/common/schemas/enums";
import {
	configureStoreOnboardingInputSchema,
	createStoreOnboardingInputSchema,
	getStoreBySlugPublicInputSchema,
	getStoreInputSchema,
	listStoresInputSchema,
	subscribeToLaunchInputSchema,
} from "@dukkani/common/schemas/store/input";
import {
	launchNotificationOutputSchema,
	storeIncludeOutputSchema,
	storePublicOutputSchema,
	storeSimpleOutputSchema,
} from "@dukkani/common/schemas/store/output";
import {
	LaunchNotificationService,
	StoreService,
} from "@dukkani/common/services";
import { database } from "@dukkani/db";
import { ORPCError } from "@orpc/server";
import { z } from "zod";
import { protectedProcedure, publicProcedure, baseProcedure } from "../index";
import { rateLimitPublicSafe } from "../middleware/rate-limit";
import { convertServiceError } from "../utils/convert-service-error";

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

			try {
				return await StoreService.getStoreById(input.id, userId);
			} catch (error) {
				convertServiceError(error);
			}
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

			try {
				return await StoreService.getStoreBySlug(input.slug, userId);
			} catch (error) {
				convertServiceError(error);
			}
		}),

	/**
	 * Get store by slug (public - for storefronts)
	 * No authentication required, uses storefront rate limiting (100/min)
	 * Supports pagination for products
	 */
	getBySlugPublic: baseProcedure
		.use(rateLimitPublicSafe)
		.input(getStoreBySlugPublicInputSchema)
		.output(storePublicOutputSchema)
		.handler(async ({ input }) => {
			if (!input.slug) {
				throw new ORPCError("BAD_REQUEST", {
					message: "Store slug is required",
				});
			}

			try {
				return await StoreService.getStoreBySlugPublic(input.slug, {
					productPage: input.productPage,
					productLimit: input.productLimit,
				});
			} catch (error) {
				convertServiceError(error);
			}
		}),

	/**
	 * Configure store (onboarding flow - theme and category)
	 */
	configure: protectedProcedure
		.input(configureStoreOnboardingInputSchema)
		.output(storeSimpleOutputSchema)
		.handler(async ({ input, context }) => {
			const userId = context.session.user.id;

			try {
				const store = await StoreService.updateStoreConfiguration(
					input.storeId,
					userId,
					{
						theme: input.theme,
						category: input.category,
					},
				);

				// Update user onboarding step to STORE_CONFIGURED
				await database.user.update({
					where: { id: userId },
					data: { onboardingStep: UserOnboardingStep.STORE_CONFIGURED },
				});

				return store;
			} catch (error) {
				convertServiceError(error);
			}
		}),

	/**
	 * Subscribe to launch notifications for a store
	 */
	subscribeToLaunch: publicProcedure
		.use(rateLimitPublicSafe)
		.input(subscribeToLaunchInputSchema)
		.output(launchNotificationOutputSchema)
		.handler(async ({ input }) => {
			try {
				return await LaunchNotificationService.subscribe(input);
			} catch (error) {
				convertServiceError(error);
			}
		}),
};
