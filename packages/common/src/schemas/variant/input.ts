import { z } from "zod";

export const variantOptionValueInputSchema = z.object({
	value: z.string().min(1, "Option value is required"),
});

export const variantOptionInputSchema = z.object({
	name: z.string().trim().min(1, "Option name is required"),
	values: z
		.array(variantOptionValueInputSchema)
		.min(1, "At least one value is required")
		.refine(
			(values) => {
				const valueStrings = values.map((v) => v.value.toLowerCase().trim());
				return new Set(valueStrings).size === valueStrings.length;
			},
			{
				message: "Duplicate values are not allowed in the same option",
			},
		),
});

/**
 * Represents a product variant.
 * @property {string} sku - The stock keeping unit of the variant.
 * @property {number} price - The price of the variant.
 * @property {number} stock - The stock of the variant.
 * @property {Record<string, string>} selections - The selections of the variant.
 *
 * @example This means: Option "Size" has value "M", Option "Color" has value "Red"
 * { "Size": "M", "Color": "Red" }
 */
export const variantInputSchema = z.object({
	sku: z.string().optional(),
	price: z.number().positive().optional(),
	stock: z.number().int().min(0),
	selections: z.record(z.string(), z.string()),
});

export type VariantOptionInput = z.infer<typeof variantOptionInputSchema>;
export type VariantInput = z.infer<typeof variantInputSchema>;
