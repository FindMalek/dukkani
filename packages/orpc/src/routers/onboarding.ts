import type { StoreMinimalDbData } from "@dukkani/common/entities/store/query";
import { StoreQuery } from "@dukkani/common/entities/store/query";
import { onboardingCompleteInputSchema } from "@dukkani/common/schemas/onboarding/input";
import type { OnboardingCompleteOutput } from "@dukkani/common/schemas/onboarding/output";
import { onboardingCompleteOutputSchema } from "@dukkani/common/schemas/onboarding/output";
import { database } from "@dukkani/db";
import { apiEnv } from "@dukkani/env";
import { ORPCError } from "@orpc/server";
import { protectedProcedure } from "../index";

export const onboardingRouter = {
	/**
	 * Get onboarding completion data (store URL, etc.)
	 * Returns the user's first store information
	 */
	complete: protectedProcedure
		.input(onboardingCompleteInputSchema.optional())
		.output(onboardingCompleteOutputSchema)
		.handler(async ({ input, context }): Promise<OnboardingCompleteOutput> => {
			const userId = context.session.user.id;

			// If storeId provided, use it; otherwise get first store
			let store: StoreMinimalDbData | null = null;
			if (input?.storeId) {
				store = await database.store.findFirst({
					where: {
						id: input.storeId,
						ownerId: userId,
					},
					select: {
						...StoreQuery.getMinimalSelect(),
					},
				});

				if (!store) {
					throw new ORPCError("NOT_FOUND", {
						message: "Store not found or you don't have access",
					});
				}
			} else {
				store = await database.store.findFirst({
					where: {
						ownerId: userId,
					},
					orderBy: {
						createdAt: "desc",
					},
					select: {
						...StoreQuery.getMinimalSelect(),
					},
				});

				if (!store) {
					throw new ORPCError("NOT_FOUND", {
						message: "No store found. Please create a store first.",
					});
				}
			}

			// Generate store URL (e.g., store-name.dukkani.tn)
			const storeUrl = `https://${store.slug}.${apiEnv.NEXT_PUBLIC_STORE_DOMAIN}`;

			return {
				storeId: store.id,
				storeSlug: store.slug,
				storeUrl,
			};
		}),
};
