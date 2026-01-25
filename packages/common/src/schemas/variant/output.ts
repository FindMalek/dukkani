import { z } from "zod";

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

export const variantSimpleOutputSchema = z.object({
	id: z.string(),
	sku: z.string().nullable(),
	price: z.number().nullable(),
	stock: z.number(),
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

export type VariantOptionValueOutput = z.infer<
	typeof variantOptionValueOutputSchema
>;
export type VariantOptionOutput = z.infer<typeof variantOptionOutputSchema>;
export type VariantSimpleOutput = z.infer<typeof variantSimpleOutputSchema>;
export type VariantSelectionOutput = z.infer<
	typeof variantSelectionOutputSchema
>;
export type VariantOutput = z.infer<typeof variantOutputSchema>;
