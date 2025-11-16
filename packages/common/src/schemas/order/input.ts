import { z } from "zod";
import { orderStatusSchema } from "./enums";

export const orderInputSchema = z.object({
	status: orderStatusSchema,
	customerName: z.string().min(1, "Customer name is required"),
	customerPhone: z.string().min(1, "Customer phone is required"),
	address: z.string().optional(),
	notes: z.string().optional(),
	storeId: z.string().min(1, "Store ID is required"),
	customerId: z.string().optional(),
});

export const createOrderInputSchema = orderInputSchema.extend({
	id: z.string().min(1, "Order ID is required"),
	orderItems: z
		.array(
			z.object({
				productId: z.string().min(1, "Product ID is required"),
				quantity: z.number().int().min(1, "Quantity must be at least 1"),
				price: z.number().positive("Price must be positive"),
			}),
		)
		.min(1, "At least one order item is required"),
});

export const updateOrderInputSchema = orderInputSchema.partial().extend({
	id: z.string().min(1, "Order ID is required"),
});

export const getOrderInputSchema = z.object({
	id: z.string().min(1, "Order ID is required"),
});

export const listOrdersInputSchema = z.object({
	page: z.number().int().min(1).default(1),
	limit: z.number().int().min(1).max(100).default(10),
	search: z.string().optional(),
	storeId: z.string().optional(),
	customerId: z.string().optional(),
	status: orderStatusSchema.optional(),
});

export type OrderInput = z.infer<typeof orderInputSchema>;
export type CreateOrderInput = z.infer<typeof createOrderInputSchema>;
export type UpdateOrderInput = z.infer<typeof updateOrderInputSchema>;
export type GetOrderInput = z.infer<typeof getOrderInputSchema>;
export type ListOrdersInput = z.infer<typeof listOrdersInputSchema>;
