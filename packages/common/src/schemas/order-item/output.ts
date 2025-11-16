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

export const orderItemIncludeOutputSchema = orderItemSimpleOutputSchema.extend({
	order: z.unknown().optional(),
	product: z.unknown().optional(),
});

export type OrderItemSimpleOutput = z.infer<typeof orderItemSimpleOutputSchema>;
export type OrderItemIncludeOutput = z.infer<typeof orderItemIncludeOutputSchema>;

