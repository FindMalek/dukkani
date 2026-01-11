import { z } from "zod";

export const createCategoryInputSchema = z.object({
	name: z.string().min(1, "Category name is required"),
	storeId: z.string().min(1, "Store ID is required"),
});

export const updateCategoryInputSchema = createCategoryInputSchema
	.partial()
	.extend({
		id: z.string().min(1, "Category ID is required"),
	});

export const getCategoryInputSchema = z.object({
	id: z.string().min(1, "Category ID is required"),
});

export const listCategoriesInputSchema = z.object({
	storeId: z.string().min(1, "Store ID is required"),
});

export type CreateCategoryInput = z.infer<typeof createCategoryInputSchema>;
export type UpdateCategoryInput = z.infer<typeof updateCategoryInputSchema>;
export type GetCategoryInput = z.infer<typeof getCategoryInputSchema>;
export type ListCategoriesInput = z.infer<typeof listCategoriesInputSchema>;
