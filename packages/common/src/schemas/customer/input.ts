import { z } from "zod";

export const customerInputSchema = z.object({
	name: z.string().min(1, "Customer name is required"),
	phone: z.string().min(1, "Customer phone is required"),
	storeId: z.string().min(1, "Store ID is required"),
});

export const createCustomerInputSchema = customerInputSchema;

export const updateCustomerInputSchema = customerInputSchema.partial().extend({
	id: z.string().min(1, "Customer ID is required"),
});

export const getCustomerInputSchema = z.object({
	id: z.string().min(1, "Customer ID is required"),
});

export const listCustomersInputSchema = z.object({
	page: z.number().int().min(1).default(1),
	limit: z.number().int().min(1).max(100).default(10),
	search: z.string().optional(),
	storeId: z.string().optional(),
	phone: z.string().optional(),
});

export type CustomerInput = z.infer<typeof customerInputSchema>;
export type CreateCustomerInput = z.infer<typeof createCustomerInputSchema>;
export type UpdateCustomerInput = z.infer<typeof updateCustomerInputSchema>;
export type GetCustomerInput = z.infer<typeof getCustomerInputSchema>;
export type ListCustomersInput = z.infer<typeof listCustomersInputSchema>;
