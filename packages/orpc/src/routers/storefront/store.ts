import { isReservedStoreSlug } from "@dukkani/common/schemas/store/constants";
import {
  getStoreBySlugPublicInputSchema,
  subscribeToLaunchInputSchema,
} from "@dukkani/common/schemas/store/input";
import {
  launchNotificationOutputSchema,
  storePublicOutputSchema,
} from "@dukkani/common/schemas/store/output";
import {
  LaunchNotificationService,
  StoreService,
} from "@dukkani/common/services";
import { database } from "@dukkani/db";
import { ORPCError } from "@orpc/server";
import { unstable_cache } from "next/cache";
import { z } from "zod";
import { rateLimitPublicSafe } from "../../middleware/rate-limit";
import { baseProcedure, publicProcedure } from "../../procedures";

// Time-based cache, no tag invalidation: dashboard edits (product/store/bundle
// writes) become visible on the storefront within this window automatically.
// Deliberately not using revalidateTag here — there's a hidden cross-entity
// dependency (editing a plain product can affect a different bundle's cached
// stock via recomputeBundlesReferencingProducts) that would make tag wiring
// across ~30 mutation call sites error-prone with no existing test coverage.
// Order creation re-validates stock/price fresh from the DB independent of
// this cache, so staleness here cannot cause an overselling/pricing bug.
const STORE_PUBLIC_CACHE_REVALIDATE_SECONDS = 20;

const getCachedStoreBySlugPublic = unstable_cache(
  async (slug: string, productPage?: number, productLimit?: number) =>
    StoreService.getStoreBySlugPublic(slug, { productPage, productLimit }),
  ["store-by-slug-public"],
  { revalidate: STORE_PUBLIC_CACHE_REVALIDATE_SECONDS },
);

export const storeRouter = {
  getBySlugPublic: baseProcedure
    .use(rateLimitPublicSafe)
    .input(getStoreBySlugPublicInputSchema)
    .output(storePublicOutputSchema)
    .handler(async ({ input }) => {
      return await getCachedStoreBySlugPublic(
        input.slug,
        input.productPage,
        input.productLimit,
      );
    }),

  subscribeToLaunch: publicProcedure
    .use(rateLimitPublicSafe)
    .input(subscribeToLaunchInputSchema)
    .output(launchNotificationOutputSchema)
    .handler(async ({ input }) => {
      return await LaunchNotificationService.subscribe(input);
    }),

  selectStore: publicProcedure
    .use(rateLimitPublicSafe)
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
