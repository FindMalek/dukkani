import { UserOnboardingStep } from "@dukkani/common/schemas/enums";
import { uploadFileOutputSchema } from "@dukkani/common/schemas/storage/output";
import {
  configureStoreOnboardingInputSchema,
  createStoreOnboardingInputSchema,
  getStoreInputSchema,
  listStoresInputSchema,
  storeUploadImageInputSchema,
  subscribeToLaunchInputSchema,
} from "@dukkani/common/schemas/store/input";
import {
  launchNotificationOutputSchema,
  storeIncludeOutputSchema,
  storeSimpleOutputSchema,
  storeStatsOutputSchema,
} from "@dukkani/common/schemas/store/output";
import {
  DashboardService,
  LaunchNotificationService,
  StoreService,
} from "@dukkani/common/services";
import { database } from "@dukkani/db";
import { ORPCError } from "@orpc/server";
import { z } from "zod";
import { rateLimitPublicSafe } from "../../middleware/rate-limit";
import { protectedProcedure, publicProcedure } from "../../procedures";
import { executeUploadFile } from "../../utils/storage-upload";
import { verifyStoreOwnership } from "../../utils/store-access";

export const storeRouter = {
  create: protectedProcedure
    .input(createStoreOnboardingInputSchema)
    .output(storeSimpleOutputSchema)
    .handler(async ({ input, context }) => {
      const userId = context.session.user.id;
      const store = await StoreService.createStore(input, userId);
      await database.user.update({
        where: { id: userId },
        data: { onboardingStep: UserOnboardingStep.STORE_CREATED },
      });
      
      return store;
    }),

  getAll: protectedProcedure
    .input(listStoresInputSchema.optional())
    .output(z.array(storeSimpleOutputSchema))
    .handler(async ({ context }) => {
      const userId = context.session.user.id;
      return await StoreService.getAllStores(userId);
    }),

  getById: protectedProcedure
    .input(getStoreInputSchema)
    .output(storeIncludeOutputSchema)
    .handler(async ({ input, context }) => {
      const userId = context.session.user.id;
      if (!input.id) {
        throw new ORPCError("BAD_REQUEST", { message: "Store ID is required" });
      }

      return await StoreService.getStoreById(input.id, userId);
    }),

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

  configure: protectedProcedure
    .input(configureStoreOnboardingInputSchema)
    .output(storeSimpleOutputSchema)
    .handler(async ({ input, context }) => {
      const userId = context.session.user.id;
      const store = await StoreService.updateStoreConfiguration(
        input.storeId,
        userId,
        { theme: input.theme, category: input.category },
      );

      await database.user.update({
        where: { id: userId },
        data: { onboardingStep: UserOnboardingStep.STORE_CONFIGURED },
      });

      return store;
    }),

  subscribeToLaunch: publicProcedure
    .use(rateLimitPublicSafe)
    .input(subscribeToLaunchInputSchema)
    .output(launchNotificationOutputSchema)
    .handler(async ({ input }) => {
      return await LaunchNotificationService.subscribe(input);
    }),

  uploadAvatar: protectedProcedure
    .input(storeUploadImageInputSchema)
    .output(uploadFileOutputSchema)
    .handler(async ({ input, context }) => {
      const userId = context.session.user.id;
      await verifyStoreOwnership(userId, input.storeId);
      const target = { resource: "stores" as const, entityId: input.storeId };
      try {
        return await executeUploadFile(input.file, target);
      } catch (error) {
        throw new ORPCError("INTERNAL_SERVER_ERROR", {
          message:
            error instanceof Error ? error.message : "Failed to upload image",
        });
      }
    }),

  getStats: protectedProcedure
    .input(
      z
        .object({
          storeId: z.string().optional(),
        })
        .optional(),
    )
    .output(storeStatsOutputSchema)
    .handler(async ({ input, context }) => {
      const userId = context.session.user.id;
      return await DashboardService.getDashboardStats(userId, input?.storeId);
    }),
};
