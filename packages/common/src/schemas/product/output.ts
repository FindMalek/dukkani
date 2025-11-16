import { z } from "zod";

export const productSimpleOutputSchema = z.object({
	id: z.string(),
	name: z.string(),
	description: z.string().nullable(),
	price: z.number(),
	stock: z.number().int(),
	published: z.boolean(),
	storeId: z.string(),
	createdAt: z.date(),
	updatedAt: z.date(),
});

export const productIncludeOutputSchema = productSimpleOutputSchema.extend({
	store: z.unknown().optional(),
	images: z.array(z.unknown()).optional(),
	orderItems: z.array(z.unknown()).optional(),
});

export const listProductsOutputSchema = z.object({
	products: z.array(productSimpleOutputSchema),
	total: z.number().int(),
	hasMore: z.boolean(),
	page: z.number().int(),
	limit: z.number().int(),
});

export type ProductSimpleOutput = z.infer<typeof productSimpleOutputSchema>;
export type ProductIncludeOutput = z.infer<typeof productIncludeOutputSchema>;
export type ListProductsOutput = z.infer<typeof listProductsOutputSchema>;

