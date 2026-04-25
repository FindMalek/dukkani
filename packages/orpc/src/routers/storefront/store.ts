import { isReservedStoreSlug } from "@dukkani/common/schemas/store/constants";
import {
  getStoreBySlugPublicInputSchema,
  subscribeToLaunchInputSchema,
} from "@dukkani/common/schemas/store/input";
import {
  launchNotificationOutputSchema,
  storePublicOutputSchema,
} from "@dukkani/common/schemas/store/output";
import { LaunchNotificationService, StoreService } from "@dukkani/common/services";
import { database } from "@dukkani/db";
import { ORPCError } from "@orpc/server";
import { z } from "zod";
import { rateLimitPublicSafe } from "../../middleware/rate-limit";
import { baseProcedure, publicProcedure } from "../../procedures";

export const storeRouter = {
  getBySlugPublic: baseProcedure
    .use(rateLimitPublicSafe)
    .input(getStoreBySlugPublicInputSchema)
    .output(storePublicOutputSchema)
    .handler(async ({ input }) => {
      return await StoreService.getStoreBySlugPublic(input.slug, {
        productPage: input.productPage,
        productLimit: input.productLimit,
      });
    }),

  subscribeToLaunch: publicProcedure
    .use(rateLimitPublicSafe)
    .input(subscribeToLaunchInputSchema)
    .output(launchNotificationOutputSchema)
    .handler(async ({ input }) => {
      return await LaunchNotificationService.subscribe(input);
    }),

  selectStore: publicProcedure
    .input(z.object({ slug: z.string() }))
    .output(z.object({ success: z.literal(true) }))
    .handler(async ({ input }) => {
      const slug = input.slug.trim().toLowerCase();
      if (!slug || isReservedStoreSlug(slug)) {
        throw new ORPCError("BAD_REQUEST", {
          message: "Invalid or reserved store slug",
        });
      }
      const store = await database.store.findUnique({
        where: { slug },
        select: { id: true },
      });
      
      if (!store) {
        throw new ORPCError("NOT_FOUND", { message: "Store not found" });
      }

      return { success: true as const };
    }),
};
