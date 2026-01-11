import { z } from "zod";

export const variantOptionValueInputSchema = z.object({
	value: z.string().min(1, "Option value is required"),
});

export const variantOptionInputSchema = z.object({
	name: z.string().min(1, "Option name is required"),
	values: z
		.array(variantOptionValueInputSchema)
		.min(1, "At least one value is required"),
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
	selections: z.record(z.string(), z.string()), // { optionName: valueId }
});

export const productInputSchema = z.object({
	name: z.string().min(1, "Product name is required"),
	description: z.string().optional(),
	price: z.number().positive("Price must be positive"),
	stock: z.number().int().min(0, "Stock cannot be negative"),
	published: z.boolean(),
	storeId: z.string().min(1, "Store ID is required"),
	categoryId: z.string().optional(),
	hasVariants: z.boolean().default(false),
});

export const createProductInputSchema = productInputSchema.extend({
	imageUrls: z.array(z.url()).optional(),
	variantOptions: z.array(variantOptionInputSchema).optional(),
	variants: z.array(variantInputSchema).optional(),
});

export const updateProductInputSchema = productInputSchema.partial().extend({
	id: z.string().min(1, "Product ID is required"),
	imageUrls: z.array(z.url()).optional(),
	variantOptions: z.array(variantOptionInputSchema).optional(),
	variants: z.array(variantInputSchema).optional(),
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

export const togglePublishProductInputSchema = z.object({
	id: z.string().min(1, "Product ID is required"),
	published: z.boolean(),
});

export type ProductInput = z.infer<typeof productInputSchema>;
export type CreateProductInput = z.infer<typeof createProductInputSchema>;
export type UpdateProductInput = z.infer<typeof updateProductInputSchema>;
export type GetProductInput = z.infer<typeof getProductInputSchema>;
export type ListProductsInput = z.infer<typeof listProductsInputSchema>;
export type VariantOptionInput = z.infer<typeof variantOptionInputSchema>;
export type VariantInput = z.infer<typeof variantInputSchema>;
