import { CategoryEntity } from "@dukkani/common/entities/category/entity";
import { listCategoriesInputSchema } from "@dukkani/common/schemas/category/input";
import { categoryOutputSchema } from "@dukkani/common/schemas/category/output";
import { database } from "@dukkani/db";
import { z } from "zod";
import { rateLimitPublicSafe } from "../../middleware/rate-limit";
import { baseProcedure } from "../../procedures";

export const categoryRouter = {
  getAllPublic: baseProcedure
    .use(rateLimitPublicSafe)
    .input(listCategoriesInputSchema)
    .output(z.array(categoryOutputSchema))
    .handler(async ({ input }) => {
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
