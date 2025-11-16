import { z } from "zod";

export const productInputSchema = z.object({
	name: z.string().min(1, "Product name is required"),
	description: z.string().optional(),
	price: z.number().positive("Price must be positive"),
	stock: z.number().int().min(0, "Stock cannot be negative"),
	published: z.boolean().default(false),
	storeId: z.string().min(1, "Store ID is required"),
});

export const createProductInputSchema = productInputSchema.extend({
	id: z.string().min(1, "Product ID is required"),
});

export const updateProductInputSchema = productInputSchema.partial().extend({
	id: z.string().min(1, "Product ID is required"),
});

export const getProductInputSchema = z.object({
	id: z.string().min(1, "Product ID is required"),
});

export const listProductsInputSchema = z.object({
	page: z.number().int().min(1).default(1),
	limit: z.number().int().min(1).max(100).default(10),
	search: z.string().optional(),
	storeId: z.string().optional(),
	published: z.boolean().optional(),
});

export type ProductInput = z.infer<typeof productInputSchema>;
export type CreateProductInput = z.infer<typeof createProductInputSchema>;
export type UpdateProductInput = z.infer<typeof updateProductInputSchema>;
export type GetProductInput = z.infer<typeof getProductInputSchema>;
export type ListProductsInput = z.infer<typeof listProductsInputSchema>;

