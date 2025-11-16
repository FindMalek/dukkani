import { z } from "zod";
import { storeSimpleOutputSchema } from "../store/output";
import { imageSimpleOutputSchema } from "../image/output";
import { orderItemSimpleOutputSchema } from "../order-item/output";

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
	store: storeSimpleOutputSchema.optional(),
	images: z.array(imageSimpleOutputSchema).optional(),
	orderItems: z.array(orderItemSimpleOutputSchema).optional(),
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
