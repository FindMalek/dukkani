import { z } from "zod";

export const imageSimpleOutputSchema = z.object({
	id: z.string(),
	url: z.string(),
	productId: z.string(),
	createdAt: z.date(),
	updatedAt: z.date(),
});

// Lazy schema reference to avoid circular dependency
let _productSimpleOutputSchema: typeof import("../product/output").productSimpleOutputSchema | undefined;

function getProductSchema() {
	if (!_productSimpleOutputSchema) {
		_productSimpleOutputSchema = require("../product/output").productSimpleOutputSchema;
	}
	return _productSimpleOutputSchema!;
}

export const imageIncludeOutputSchema = imageSimpleOutputSchema.extend({
	product: z.lazy(() => getProductSchema()).optional(),
});

export type ImageSimpleOutput = z.infer<typeof imageSimpleOutputSchema>;
export type ImageIncludeOutput = z.infer<typeof imageIncludeOutputSchema>;

