import type { StoreMinimalDbData } from "@dukkani/common/entities/store/query";
import { StoreQuery } from "@dukkani/common/entities/store/query";
import { UserEntity } from "@dukkani/common/entities/user/entity";
import { UserQuery } from "@dukkani/common/entities/user/query";
import { StoreStatus, UserOnboardingStep } from "@dukkani/common/schemas/enums";
import {
  onboardingCompleteInputSchema,
  onboardingGetStateInputSchema,
  onboardingGetStepConfigInputSchema,
} from "@dukkani/common/schemas/onboarding/input";
import type {
  OnboardingCompleteOutput,
  OnboardingGetStateOutput,
  OnboardingGetStepConfigOutput,
  OnboardingIsCompleteOutput,
  OnboardingShouldShowStoresOutput,
} from "@dukkani/common/schemas/onboarding/output";
import {
  onboardingCompleteOutputSchema,
  onboardingGetStateOutputSchema,
  onboardingGetStepConfigOutputSchema,
  onboardingIsCompleteOutputSchema,
  onboardingShouldShowStoresOutputSchema,
} from "@dukkani/common/schemas/onboarding/output";
import {
  LaunchNotificationService,
  OnboardingService,
} from "@dukkani/common/services";
import { database } from "@dukkani/db";
import { apiEnv } from "@dukkani/env";
import { logger } from "@dukkani/logger";
import { ORPCError } from "@orpc/server";
import { protectedProcedure, publicProcedure } from "../procedures";

export const onboardingRouter = {
  /**
   * Get onboarding completion data (store URL, etc.)
   * Returns the user's first store information
   * Also publishes the store and marks onboarding as complete
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
      // Get old status before update
      const oldStatus = store.status;

      // Publish the store and mark onboarding as complete
      await database.$transaction([
        // Update store status to PUBLISHED
        database.store.update({
          where: { id: store.id },
          data: { status: StoreStatus.PUBLISHED },
        }),
        // Update user onboarding step to STORE_LAUNCHED
        database.user.update({
          where: { id: userId },
          data: { onboardingStep: UserOnboardingStep.STORE_LAUNCHED },
        }),
      ]);

      // Notify subscribers if store was just published
      if (oldStatus === StoreStatus.DRAFT) {
        // Don't await - fire and forget to not block the response
        LaunchNotificationService.notifySubscribers(store.id).catch((error) => {
          logger.error(
            { error, storeId: store.id },
            "Failed to notify subscribers:",
          );
        });
      }

      // Generate store URL (e.g., store-name.dukkani.tn)
      const storeUrl = `https://${store.slug}.${apiEnv.NEXT_PUBLIC_STORE_DOMAIN}`;

      return {
        storeId: store.id,
        storeSlug: store.slug,
        storeUrl,
      };
    }),

  /**
   * Get complete onboarding state for the current user
   * Returns all onboarding-related information including state, steps, and permissions
   */
  getState: protectedProcedure
    .input(onboardingGetStateInputSchema.optional())
    .output(onboardingGetStateOutputSchema)
    .handler(async ({ input, context }): Promise<OnboardingGetStateOutput> => {
      // Get current user from session
      const userId = context.session?.user?.id;
      if (!userId) {
        throw new ORPCError("UNAUTHORIZED", {
          message: "User not authenticated",
        });
      }

      const user = await database.user.findUnique({
        where: { id: userId },
        include: UserQuery.getSimpleInclude(),
      });

      if (!user) {
        throw new ORPCError("NOT_FOUND", {
          message: "User not found",
        });
      }

      const currentUser = UserEntity.getSimpleRo(user);

      return OnboardingService.getState(
        currentUser,
        input?.guestStep ?? null,
        true, // authenticated
      );
    }),

  /**
   * Check if stores should be shown for the current user
   * Used to determine if store-related UI should be displayed
   */
  shouldShowStores: protectedProcedure
    .output(onboardingShouldShowStoresOutputSchema)
    .handler(async ({ context }): Promise<OnboardingShouldShowStoresOutput> => {
      // Get current user from session
      const userId = context.session?.user?.id;
      if (!userId) {
        throw new ORPCError("UNAUTHORIZED", {
          message: "User not authenticated",
        });
      }

      const user = await database.user.findUnique({
        where: { id: userId },
        include: UserQuery.getSimpleInclude(),
      });

      if (!user) {
        throw new ORPCError("NOT_FOUND", {
          message: "User not found",
        });
      }

      const currentUser = UserEntity.getSimpleRo(user);

      return OnboardingService.shouldShowStores(
        currentUser,
        true, // authenticated
      );
    }),

  /**
   * Check if onboarding is complete for the current user
   * Returns true if user has completed all onboarding steps
   */
  isComplete: protectedProcedure
    .output(onboardingIsCompleteOutputSchema)
    .handler(async ({ context }): Promise<OnboardingIsCompleteOutput> => {
      // Get current user from session
      const userId = context.session?.user?.id;
      if (!userId) {
        throw new ORPCError("UNAUTHORIZED", {
          message: "User not authenticated",
        });
      }

      const user = await database.user.findUnique({
        where: { id: userId },
        include: UserQuery.getSimpleInclude(),
      });

      if (!user) {
        throw new ORPCError("NOT_FOUND", {
          message: "User not found",
        });
      }

      const currentUser = UserEntity.getSimpleRo(user);

      return OnboardingService.isOnboardingComplete(currentUser);
    }),

  /**
   * Get step configuration for a specific onboarding step
   * Returns base configuration without i18n translations
   */
  getStepConfig: publicProcedure
    .input(onboardingGetStepConfigInputSchema)
    .output(onboardingGetStepConfigOutputSchema)
    .handler(async ({ input }): Promise<OnboardingGetStepConfigOutput> => {
      return OnboardingService.getStepConfig(input.step);
    }),
};
