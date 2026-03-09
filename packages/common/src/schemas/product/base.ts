import z from "zod";

export const productSchema = z.strictObject({
	name: z.string().trim().nonempty("Product name is required"),
	description: z
		.string()
		.trim()
		.transform((val) => (val === "" ? undefined : val))
		.optional(),
	price: z.number().positive("Price must be positive"),
	stock: z.number().int().min(0, "Stock cannot be negative"),
	published: z.boolean(),
	storeId: z.string().min(1, "Store ID is required"),
	categoryId: z
		.string()
		.trim()
		.transform((val) => (val === "" ? undefined : val)),
	hasVariants: z.boolean(),
	variantOptions: z.array(
		z.object({
			name: z.string().trim().nonempty(),
			values: z
				.array(
					z.object({
						value: z.string().trim().nonempty(),
					}),
				)
				.nonempty(),
		}),
	),
});

// export const productApiSchema = productSchema.extend({
//     imageUrls: z.array(z.url()).max(10, "Maximum 10 images allowed"),
// });

// export const productUiSchema = productSchema.extend({
// price: z.number().transform((val) => formatCurrency(val)),
// });
