import { z } from "zod";
import { productLineItemSchema } from "../product/input";
import { orderStatusSchema, paymentMethodSchema } from "./enums";

export const orderItemInputSchema = productLineItemSchema.extend({
	price: z.number().positive("Price must be positive"),
});

/** Public order item - no price (server fetches from DB to prevent tampering) */
export const orderItemPublicInputSchema = productLineItemSchema;

export const createOrderInputSchema = z.object({
	id: z.string().min(1, "Order ID is required"),
	status: orderStatusSchema,
	paymentMethod: paymentMethodSchema,
	isWhatsApp: z.boolean().default(false),
	notes: z.string().optional(),
	storeId: z.string().min(1, "Store ID is required"),
	customerId: z.string().min(1, "Customer ID is required"),
	addressId: z.string().min(1, "Address ID is required"),
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
 * Customer and address are created/found automatically
 */
const addressInputSchema = z.object({
	street: z.string().min(1, "Street address is required"),
	city: z.string().min(1, "City is required"),
	postalCode: z.string().optional(),
	latitude: z.number().optional(),
	longitude: z.number().optional(),
});

export const createOrderPublicInputSchema = z
	.object({
		customerName: z.string().min(1, "Customer name is required"),
		customerPhone: z
			.string()
			.min(1, "Customer phone is required")
			.refine(
				(value) =>
					/^[\d\s+\-()]+$/.test(value) &&
					(value.match(/\d/g) || []).length >= 8,
				{ message: "Please enter a valid phone number (at least 8 digits)" },
			),
		address: addressInputSchema.optional(),
		addressId: z.string().optional(),
		notes: z.string().optional(),
		paymentMethod: paymentMethodSchema,
		isWhatsApp: z.boolean().default(false),
		storeId: z.string().min(1, "Store ID is required"),
		orderItems: z
			.array(orderItemPublicInputSchema)
			.min(1, "At least one order item is required"),
	})
	.refine((data) => !!data.addressId || !!data.address, {
		message: "Either address or addressId must be provided",
		path: ["address"],
	});

export type CreateOrderPublicInput = z.infer<
	typeof createOrderPublicInputSchema
>;
