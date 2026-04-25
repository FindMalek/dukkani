import { CategoryEntity } from "@dukkani/common/entities/category/entity";
import { listCategoriesInputSchema } from "@dukkani/common/schemas/category/input";
import { categoryOutputSchema } from "@dukkani/common/schemas/category/output";
import { StoreStatus } from "@dukkani/common/schemas/enums";
import { database } from "@dukkani/db";
import { ORPCError } from "@orpc/server";
import { z } from "zod";
import { rateLimitPublicSafe } from "../../middleware/rate-limit";
import { baseProcedure } from "../../procedures";

export const categoryRouter = {
  getAllPublic: baseProcedure
    .use(rateLimitPublicSafe)
    .input(listCategoriesInputSchema)
    .output(z.array(categoryOutputSchema))
    .handler(async ({ input }) => {
      const store = await database.store.findUnique({
        where: { id: input.storeId },
        select: { id: true, status: true },
      });

      if (!store) {
        throw new ORPCError("NOT_FOUND", { message: "Store not found" });
      }

      if (store.status !== StoreStatus.PUBLISHED) {
        throw new ORPCError("FORBIDDEN", { message: "Store is not available" });
      }

      const categories = await database.category.findMany({
        where: {
          storeId: input.storeId,
          products: { some: { published: true } },
        },
        orderBy: { name: "asc" },
      });

      return categories.map(CategoryEntity.getSimpleRo);
    }),
};
