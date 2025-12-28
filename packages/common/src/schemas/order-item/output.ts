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

const productMinimalOutputSchema = z.object({
	id: z.string(),
	name: z.string(),
});

export const orderItemWithProductOutputSchema =
	orderItemSimpleOutputSchema.extend({
		product: productMinimalOutputSchema.optional(),
	});

export type OrderItemSimpleOutput = z.infer<typeof orderItemSimpleOutputSchema>;
export type OrderItemWithProductOutput = z.infer<
	typeof orderItemWithProductOutputSchema
>;
