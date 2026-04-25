import { CategoryEntity } from "@dukkani/common/entities/category/entity";
import {
  createCategoryInputSchema,
  getCategoryInputSchema,
  listCategoriesInputSchema,
  updateCategoryInputSchema,
} from "@dukkani/common/schemas/category/input";
import { categoryOutputSchema } from "@dukkani/common/schemas/category/output";
import { CategoryService } from "@dukkani/common/services";
import { database } from "@dukkani/db";
import { ORPCError } from "@orpc/server";
import { z } from "zod";
import { rateLimitPublicSafe } from "../../middleware/rate-limit";
import { baseProcedure, protectedProcedure } from "../../procedures";
import { verifyStoreOwnership } from "../../utils/store-access";

export const categoryRouter = {
  create: protectedProcedure
    .input(createCategoryInputSchema)
    .output(categoryOutputSchema)
    .handler(async ({ input, context }) => {
      const userId = context.session.user.id;
      await verifyStoreOwnership(userId, input.storeId);
      return await CategoryService.createCategory(input);
    }),

  getAll: protectedProcedure
    .input(listCategoriesInputSchema)
    .output(z.array(categoryOutputSchema))
    .handler(async ({ input, context }) => {
      const userId = context.session.user.id;
      await verifyStoreOwnership(userId, input.storeId);
      return await CategoryService.getAllCategories(input.storeId);
    }),

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

  getById: protectedProcedure
    .input(getCategoryInputSchema)
    .output(categoryOutputSchema)
    .handler(async ({ input, context }) => {
      const userId = context.session.user.id;
      const category = await database.category.findUnique({
        where: { id: input.id },
      });

      if (!category) {
        throw new ORPCError("NOT_FOUND", { message: "Category not found" });
      }

      await verifyStoreOwnership(userId, category.storeId);

      return CategoryEntity.getSimpleRo(category);
    }),

  update: protectedProcedure
    .input(updateCategoryInputSchema)
    .output(categoryOutputSchema)
    .handler(async ({ input, context }) => {
      const userId = context.session.user.id;
      const category = await database.category.findUnique({
        where: { id: input.id },
      });

      if (!category) {
        throw new ORPCError("NOT_FOUND", { message: "Category not found" });
      }

      await verifyStoreOwnership(userId, category.storeId);

      return await CategoryService.updateCategory(input);
    }),

  delete: protectedProcedure
    .input(getCategoryInputSchema)
    .output(z.object({ success: z.boolean(), storeId: z.string() }))
    .handler(async ({ input, context }) => {
      const userId = context.session.user.id;
      const category = await database.category.findUnique({
        where: { id: input.id },
      });

      if (!category) {
        throw new ORPCError("NOT_FOUND", { message: "Category not found" });
      }

      await verifyStoreOwnership(userId, category.storeId);
      await CategoryService.deleteCategory(input.id);

      return { success: true, storeId: category.storeId };
    }),
};
