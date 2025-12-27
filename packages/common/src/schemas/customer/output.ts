import { z } from "zod";
import { orderSimpleOutputSchema } from "../order/output";
import { storeSimpleOutputSchema } from "../store/output";

export const customerSimpleOutputSchema = z.object({
	id: z.string(),
	name: z.string(),
	phone: z.string(),
	storeId: z.string(),
	createdAt: z.date(),
	updatedAt: z.date(),
});

export const customerIncludeOutputSchema = customerSimpleOutputSchema.extend({
	store: storeSimpleOutputSchema.optional(),
	orders: z.array(orderSimpleOutputSchema).optional(),
});

export const listCustomersOutputSchema = z.object({
	customers: z.array(customerSimpleOutputSchema),
	total: z.number().int(),
	hasMore: z.boolean(),
	page: z.number().int(),
	limit: z.number().int(),
});

export type CustomerSimpleOutput = z.infer<typeof customerSimpleOutputSchema>;
export type CustomerIncludeOutput = z.infer<typeof customerIncludeOutputSchema>;
export type ListCustomersOutput = z.infer<typeof listCustomersOutputSchema>;
