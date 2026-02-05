import { z } from "zod";
import { orderStatusSchema, paymentMethodSchema } from "./enums";

export const orderItemInputSchema = z.object({
	productId: z.string().min(1, "Product ID is required"),
	variantId: z.string().optional(),
	quantity: z.number().int().min(1, "Quantity must be at least 1"),
	price: z.number().positive("Price must be positive"),
});

export const createOrderInputSchema = z.object({
	id: z.string().min(1, "Order ID is required"),
	status: orderStatusSchema,
	paymentMethod: paymentMethodSchema,
	customerName: z.string().min(1, "Customer name is required"),
	customerPhone: z.string().min(1, "Customer phone is required"),
	address: z.string().optional(),
	notes: z.string().optional(),
	storeId: z.string().min(1, "Store ID is required"),
	customerId: z.string().optional(),
	orderItems: z
		.array(orderItemInputSchema)
		.min(1, "At least one order item is required"),
});

export const updateOrderInputSchema = createOrderInputSchema.partial().extend({
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

export type CreateOrderInput = z.infer<typeof createOrderInputSchema>;
export type UpdateOrderInput = z.infer<typeof updateOrderInputSchema>;
export type GetOrderInput = z.infer<typeof getOrderInputSchema>;
export type ListOrdersInput = z.infer<typeof listOrdersInputSchema>;

export const updateOrderStatusInputSchema = z.object({
	id: z.string().min(1, "Order ID is required"),
	status: orderStatusSchema,
});

export type UpdateOrderStatusInput = z.infer<
	typeof updateOrderStatusInputSchema
>;

/**
 * Public order creation input schema (for storefront)
 * No id or status required - auto-generated
 * No userId required - guest orders
 */
export const createOrderPublicInputSchema = z.object({
	customerName: z.string().min(1, "Customer name is required"),
	customerPhone: z.string().min(1, "Customer phone is required"),
	address: z.string().optional(),
	notes: z.string().optional(),
	paymentMethod: paymentMethodSchema,
	storeId: z.string().min(1, "Store ID is required"),
	orderItems: z
		.array(orderItemInputSchema)
		.min(1, "At least one order item is required"),
});

export type CreateOrderPublicInput = z.infer<
	typeof createOrderPublicInputSchema
>;
