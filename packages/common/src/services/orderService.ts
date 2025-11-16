import prisma from "@dukkani/db";
import { generateOrderId } from "../utils/generate-id";
import { ProductService } from "./productService";
import { OrderQuery } from "../entities/order/query";
import { OrderEntity } from "../entities/order/entity";
import type {
	CreateOrderInput,
	UpdateOrderInput,
} from "../schemas/order/input";
import type { OrderIncludeOutput } from "../schemas/order/output";
import type { OrderStatus } from "../schemas/order/enums";

/**
 * Order service - Shared business logic for order operations
 */
export class OrderService {
	/**
	 * Generate order ID using store slug
	 */
	static generateOrderId(storeSlug: string): string {
		return generateOrderId(storeSlug);
	}

	/**
	 * Create order with stock validation and updates
	 */
	static async createOrder(
		input: CreateOrderInput,
		userId: string,
	): Promise<OrderIncludeOutput> {
		// Get store to verify ownership and generate ID
		const store = await prisma.store.findUnique({
			where: { id: input.storeId },
			select: { id: true, slug: true, ownerId: true },
		});

		if (!store) {
			throw new Error("Store not found");
		}

		if (store.ownerId !== userId) {
			throw new Error("You don't have access to this store");
		}

		// Validate products exist and check stock
		await ProductService.checkStockAvailability(
			input.orderItems.map((item) => ({
				productId: item.productId,
				quantity: item.quantity,
			})),
			input.storeId,
		);

		// Create order with order items
		const order = await prisma.order.create({
			data: {
				id: input.id,
				storeId: input.storeId,
				customerName: input.customerName,
				customerPhone: input.customerPhone,
				address: input.address,
				notes: input.notes,
				customerId: input.customerId,
				status: input.status,
				orderItems: {
					create: input.orderItems.map((item) => ({
						productId: item.productId,
						quantity: item.quantity,
						price: item.price,
					})),
				},
			},
			include: OrderQuery.getInclude(),
		});

		// Update product stock (decrement)
		await ProductService.updateMultipleProductStocks(
			input.orderItems.map((item) => ({
				productId: item.productId,
				quantity: item.quantity,
			})),
			"decrement",
		);

		return OrderEntity.getRo(order);
	}

	/**
	 * Update order status
	 */
	static async updateOrderStatus(
		orderId: string,
		status: OrderStatus,
		userId: string,
	): Promise<OrderIncludeOutput> {
		// Get order to verify ownership
		const order = await prisma.order.findUnique({
			where: { id: orderId },
			select: { storeId: true },
		});

		if (!order) {
			throw new Error("Order not found");
		}

		const store = await prisma.store.findUnique({
			where: { id: order.storeId },
			select: { ownerId: true },
		});

		if (!store || store.ownerId !== userId) {
			throw new Error("You don't have access to this order");
		}

		const updatedOrder = await prisma.order.update({
			where: { id: orderId },
			data: { status },
			include: OrderQuery.getInclude(),
		});

		return OrderEntity.getRo(updatedOrder);
	}

	/**
	 * Delete order and restore stock
	 */
	static async deleteOrder(
		orderId: string,
		userId: string,
	): Promise<void> {
		// Get order to verify ownership and get order items
		const order = await prisma.order.findUnique({
			where: { id: orderId },
			select: {
				storeId: true,
				orderItems: {
					select: {
						productId: true,
						quantity: true,
					},
				},
			},
		});

		if (!order) {
			throw new Error("Order not found");
		}

		const store = await prisma.store.findUnique({
			where: { id: order.storeId },
			select: { ownerId: true },
		});

		if (!store || store.ownerId !== userId) {
			throw new Error("You don't have access to this order");
		}

		// Restore product stock if order has items
		if (order.orderItems.length > 0) {
			await ProductService.updateMultipleProductStocks(
				order.orderItems.map((item) => ({
					productId: item.productId,
					quantity: item.quantity,
				})),
				"increment",
			);
		}

		// Delete order (order items will be cascade deleted)
		await prisma.order.delete({
			where: { id: orderId },
		});
	}
}
