import { database } from "@dukkani/db";
import { generateOrderId } from "@dukkani/db/utils/generate-id";
import { OrderEntity } from "../entities/order/entity";
import { OrderQuery } from "../entities/order/query";
import type { OrderStatus } from "../schemas/order/enums";
import type { CreateOrderInput } from "../schemas/order/input";
import type { OrderIncludeOutput } from "../schemas/order/output";
import { ProductService } from "./productService";

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
	 * Wrapped in transaction to ensure atomicity and prevent race conditions
	 */
	static async createOrder(
		input: CreateOrderInput,
		userId: string,
	): Promise<OrderIncludeOutput> {
		// Get store to verify ownership and generate ID
		const store = await database.store.findUnique({
			where: { id: input.storeId },
			select: { id: true, slug: true, ownerId: true },
		});

		if (!store) {
			throw new Error("Store not found");
		}

		if (store.ownerId !== userId) {
			throw new Error("You don't have access to this store");
		}

		// Wrap stock check, order creation, and stock updates in transaction
		// This ensures atomicity: all operations succeed or fail together
		const order = await database.$transaction(async (tx) => {
			// Validate products exist and check stock (within transaction for isolation)
			await ProductService.checkStockAvailability(
				input.orderItems.map((item) => ({
					productId: item.productId,
					quantity: item.quantity,
				})),
				input.storeId,
				tx,
			);

			// Create order with order items (within transaction)
			const createdOrder = await tx.order.create({
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
				include: {
					...OrderQuery.getInclude(),
					orderItems: {
						include: {
							product: {
								select: {
									name: true,
								},
							},
						},
					},
				},
			});

			await ProductService.updateMultipleProductStocks(
				input.orderItems.map((item) => ({
					productId: item.productId,
					quantity: item.quantity,
				})),
				"decrement",
				tx,
			);

			return createdOrder;
		});

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
		const order = await database.order.findUnique({
			where: { id: orderId },
			select: { storeId: true },
		});

		if (!order) {
			throw new Error("Order not found");
		}

		const store = await database.store.findUnique({
			where: { id: order.storeId },
			select: { ownerId: true },
		});

		if (!store || store.ownerId !== userId) {
			throw new Error("You don't have access to this order");
		}

		const updatedOrder = await database.order.update({
			where: { id: orderId },
			data: { status },
			include: OrderQuery.getInclude(),
		});

		return OrderEntity.getRo(updatedOrder);
	}

	/**
	 * Delete order and restore stock
	 * Wrapped in transaction to ensure atomicity
	 */
	static async deleteOrder(orderId: string, userId: string): Promise<void> {
		// Get order to verify ownership and get order items
		const order = await database.order.findUnique({
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

		const store = await database.store.findUnique({
			where: { id: order.storeId },
			select: { ownerId: true },
		});

		if (!store || store.ownerId !== userId) {
			throw new Error("You don't have access to this order");
		}

		// Wrap stock increment and order deletion in transaction
		// This ensures atomicity: both operations succeed or fail together
		await database.$transaction(async (tx) => {
			// Restore product stock if order has items (within transaction)
			if (order.orderItems.length > 0) {
				await ProductService.updateMultipleProductStocks(
					order.orderItems.map((item) => ({
						productId: item.productId,
						quantity: item.quantity,
					})),
					"increment",
					tx,
				);
			}

			// Delete order (order items will be cascade deleted) within same transaction
			await tx.order.delete({
				where: { id: orderId },
			});
		});
	}
}
