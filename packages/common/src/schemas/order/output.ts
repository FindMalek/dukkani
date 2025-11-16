import { z } from "zod";
import { orderStatusSchema } from "./enums";

export const orderSimpleOutputSchema = z.object({
	id: z.string(),
	status: orderStatusSchema,
	customerName: z.string(),
	customerPhone: z.string(),
	address: z.string().nullable(),
	notes: z.string().nullable(),
	storeId: z.string(),
	customerId: z.string().nullable(),
	createdAt: z.date(),
	updatedAt: z.date(),
});

export const orderIncludeOutputSchema = orderSimpleOutputSchema.extend({
	store: z.unknown().optional(),
	customer: z.unknown().optional(),
	orderItems: z.array(z.unknown()).optional(),
	whatsappMessages: z.array(z.unknown()).optional(),
});

export const listOrdersOutputSchema = z.object({
	orders: z.array(orderSimpleOutputSchema),
	total: z.number().int(),
	hasMore: z.boolean(),
	page: z.number().int(),
	limit: z.number().int(),
});

export type OrderSimpleOutput = z.infer<typeof orderSimpleOutputSchema>;
export type OrderIncludeOutput = z.infer<typeof orderIncludeOutputSchema>;
export type ListOrdersOutput = z.infer<typeof listOrdersOutputSchema>;

