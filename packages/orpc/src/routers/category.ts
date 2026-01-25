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
import { protectedProcedure, publicProcedure } from "../index";
import { rateLimitPublicSafe } from "../middleware/rate-limit";
import { verifyStoreOwnership } from "../utils/store-access";

export const categoryRouter = {
	/**
	 * Create a new category for a store
	 */
	create: protectedProcedure
		.input(createCategoryInputSchema)
		.output(categoryOutputSchema)
		.handler(async ({ input, context }) => {
			const userId = context.session.user.id;
			await verifyStoreOwnership(userId, input.storeId);
			return await CategoryService.createCategory(input);
		}),

	/**
	 * Get all categories for a store
	 */
	getAll: protectedProcedure
		.input(listCategoriesInputSchema)
		.output(z.array(categoryOutputSchema))
		.handler(async ({ input, context }) => {
			const userId = context.session.user.id;
			await verifyStoreOwnership(userId, input.storeId);

			return await CategoryService.getAllCategories(input.storeId);
		}),

	/**
	 * Get all categories for a store (public - for storefronts)
	 * Only returns categories that have published products
	 */
	getAllPublic: publicProcedure
		.use(rateLimitPublicSafe)
		.input(listCategoriesInputSchema)
		.output(z.array(categoryOutputSchema))
		.handler(async ({ input }) => {
			// Get categories that have at least one published product
			const categories = await database.category.findMany({
				where: {
					storeId: input.storeId,
					products: {
						some: {
							published: true,
						},
					},
				},
				orderBy: {
					name: "asc",
				},
			});

			return categories.map(CategoryEntity.getSimpleRo);
		}),

	/**
	 * Get category by ID
	 */
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

	/**
	 * Update category
	 */
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

	/**
	 * Delete category
	 */
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
