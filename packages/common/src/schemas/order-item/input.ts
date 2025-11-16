import { z } from "zod";

export const orderItemInputSchema = z.object({
	orderId: z.string().min(1, "Order ID is required"),
	productId: z.string().min(1, "Product ID is required"),
	quantity: z.number().int().min(1, "Quantity must be at least 1"),
	price: z.number().positive("Price must be positive"),
});

export const createOrderItemInputSchema = orderItemInputSchema;

export const updateOrderItemInputSchema = orderItemInputSchema
	.partial()
	.extend({
		id: z.string().min(1, "Order Item ID is required"),
	});

export const getOrderItemInputSchema = z.object({
	id: z.string().min(1, "Order Item ID is required"),
});

export const listOrderItemsInputSchema = z.object({
	orderId: z.string().optional(),
	productId: z.string().optional(),
});

export type OrderItemInput = z.infer<typeof orderItemInputSchema>;
export type CreateOrderItemInput = z.infer<typeof createOrderItemInputSchema>;
export type UpdateOrderItemInput = z.infer<typeof updateOrderItemInputSchema>;
export type GetOrderItemInput = z.infer<typeof getOrderItemInputSchema>;
export type ListOrderItemsInput = z.infer<typeof listOrderItemsInputSchema>;
