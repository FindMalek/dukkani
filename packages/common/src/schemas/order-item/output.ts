import { z } from "zod";
import { orderSimpleOutputSchema } from "../order/output";
import { productSimpleOutputSchema } from "../product/output";
export const orderItemSimpleOutputSchema = z.object({
	id: z.string(),
	orderId: z.string(),
	productId: z.string(),
	quantity: z.number().int(),
	price: z.number(),
	createdAt: z.date(),
	updatedAt: z.date(),
});

export const orderItemIncludeOutputSchema = orderItemSimpleOutputSchema.extend({
	order: orderSimpleOutputSchema.optional(),
	product: productSimpleOutputSchema.optional(),
});

export type OrderItemSimpleOutput = z.infer<typeof orderItemSimpleOutputSchema>;
export type OrderItemIncludeOutput = z.infer<
	typeof orderItemIncludeOutputSchema
>;
