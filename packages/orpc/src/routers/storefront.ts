import { isReservedStoreSlug } from "@dukkani/common/schemas/store/constants";
import { ORPCError } from "@orpc/server";
import { z } from "zod";
import { createORPCClientUtils } from "../client";
import { storefrontProcedure } from "../storefront-context";

export const storefrontRouter = {
  selectStore: storefrontProcedure
    .input(z.object({ slug: z.string() }))
    .output(z.object({ success: z.literal(true) }))
    .handler(async ({ input, context }) => {
      const slug = input.slug.trim().toLowerCase();
      if (!slug || isReservedStoreSlug(slug)) {
        throw new ORPCError("BAD_REQUEST", {
          message: "Invalid or reserved store slug",
        });
      }

      const apiClient = createORPCClientUtils(context.apiUrl).client;
      await apiClient.store.getBySlugPublic({ slug });

      return { success: true as const };
    }),
};
