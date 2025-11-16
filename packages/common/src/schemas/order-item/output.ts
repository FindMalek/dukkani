import { z } from "zod";

export const orderItemSimpleOutputSchema = z.object({
	id: z.string(),
	orderId: z.string(),
	productId: z.string(),
	quantity: z.number().int(),
	price: z.number(),
	createdAt: z.date(),
	updatedAt: z.date(),
});

// Lazy schema references to avoid circular dependencies
let _orderSimpleOutputSchema: typeof import("../order/output").orderSimpleOutputSchema | undefined;
let _productSimpleOutputSchema: typeof import("../product/output").productSimpleOutputSchema | undefined;

function getOrderSchema() {
	if (!_orderSimpleOutputSchema) {
		_orderSimpleOutputSchema = require("../order/output").orderSimpleOutputSchema;
	}
	return _orderSimpleOutputSchema!;
}

function getProductSchema() {
	if (!_productSimpleOutputSchema) {
		_productSimpleOutputSchema = require("../product/output").productSimpleOutputSchema;
	}
	return _productSimpleOutputSchema!;
}

export const orderItemIncludeOutputSchema = orderItemSimpleOutputSchema.extend({
	order: z.lazy(() => getOrderSchema()).optional(),
	product: z.lazy(() => getProductSchema()).optional(),
});

export type OrderItemSimpleOutput = z.infer<typeof orderItemSimpleOutputSchema>;
export type OrderItemIncludeOutput = z.infer<typeof orderItemIncludeOutputSchema>;

