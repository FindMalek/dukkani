import { z } from "zod";
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

export const productPublicOutputSchema = productSimpleOutputSchema
	.extend({
		imagesUrls: z.array(z.string()),
	})
	.omit({
		storeId: true,
		createdAt: true,
		updatedAt: true,
	});

export const variantOptionValueOutputSchema = z.object({
	id: z.string(),
	value: z.string(),
	optionId: z.string(),
});

export const variantOptionOutputSchema = z.object({
	id: z.string(),
	name: z.string(),
	productId: z.string(),
	values: z.array(variantOptionValueOutputSchema),
});

export const variantSelectionOutputSchema = z.object({
	id: z.string(),
	variantId: z.string(),
	optionId: z.string(),
	valueId: z.string(),
	option: variantOptionOutputSchema,
	value: variantOptionValueOutputSchema,
});

export const variantOutputSchema = z.object({
	id: z.string(),
	sku: z.string().nullable(),
	price: z.number().nullable(),
	stock: z.number(),
	productId: z.string(),
	selections: z.array(variantSelectionOutputSchema),
});

export const productOutputSchema = z.object({
	id: z.string(),
	name: z.string(),
	description: z.string().nullable(),
	price: z.number(),
	stock: z.number(),
	published: z.boolean(),
	categoryId: z.string().nullable(),
	hasVariants: z.boolean(),
	storeId: z.string(),
	createdAt: z.date(),
	updatedAt: z.date(),
	category: z.any().optional(), // CategoryOutput
	variantOptions: z.array(variantOptionOutputSchema).optional(),
	variants: z.array(variantOutputSchema).optional(),
});

export type ProductPublicOutput = z.infer<typeof productPublicOutputSchema>;
export type ProductSimpleOutput = z.infer<typeof productSimpleOutputSchema>;
export type ProductIncludeOutput = z.infer<typeof productIncludeOutputSchema>;
export type ListProductsOutput = z.infer<typeof listProductsOutputSchema>;
export type VariantOptionOutput = z.infer<typeof variantOptionOutputSchema>;
export type VariantOutput = z.infer<typeof variantOutputSchema>;
export type ProductOutput = z.infer<typeof productOutputSchema>;
