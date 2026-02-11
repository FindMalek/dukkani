import { database } from "@dukkani/db";
import { generateOrderId } from "@dukkani/db/utils/generate-id";
import logger from "@dukkani/logger";
import {
	addSpanAttributes,
	addSpanEvent,
	enhanceLogWithTraceContext,
	traceStaticClass,
} from "@dukkani/tracing";
import { OrderEntity } from "../entities/order/entity";
import { OrderQuery } from "../entities/order/query";
import { StoreQuery } from "../entities/store/query";
import { OrderStatus } from "../schemas/order/enums";
import type {
	CreateOrderInput,
	CreateOrderPublicInput,
} from "../schemas/order/input";
import type {
	OrderIncludeOutput,
	OrderPublicOutput,
} from "../schemas/order/output";
import { AddressService } from "./address.service";
import { CustomerService } from "./customer.service";
import { ProductService } from "./product.service";

/**
 * Order service - Shared business logic for order operations
 * All methods are automatically traced via traceStaticClass
 */
class OrderServiceBase {
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
		addSpanAttributes({
			"order.store_id": input.storeId,
			"order.items_count": input.orderItems.length,
			"order.user_id": userId,
		});

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

		addSpanEvent("order.store.verified", { store_id: store.id });
		logger.info(
			enhanceLogWithTraceContext({
				store_id: input.storeId,
				items_count: input.orderItems.length,
				user_id: userId,
			}),
			"Order creation started",
		);

		// Wrap stock check, order creation, and stock updates in transaction
		// This ensures atomicity: all operations succeed or fail together
		const order = await database.$transaction(async (tx) => {
			// Validate products exist and check stock (within transaction for isolation)
			await ProductService.checkStockAvailability(
				input.orderItems.map((item) => ({
					productId: item.productId,
					variantId: item.variantId,
					quantity: item.quantity,
				})),
				input.storeId,
				tx,
			);

			addSpanEvent("order.stock.validated", { store_id: store.id });

			// Create order with order items (within transaction)
			const createdOrder = await tx.order.create({
				data: {
					id: input.id,
					storeId: input.storeId,
					paymentMethod: input.paymentMethod,
					isWhatsApp: input.isWhatsApp,
					notes: input.notes,
					customerId: input.customerId,
					addressId: input.addressId,
					status: input.status,
					orderItems: {
						create: input.orderItems.map((item) => ({
							productId: item.productId,
							productVariantId: item.variantId,
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

			addSpanEvent("order.created", { order_id: createdOrder.id });
			logger.info(
				enhanceLogWithTraceContext({
					order_id: createdOrder.id,
					store_id: input.storeId,
					total_items: createdOrder.orderItems.length,
					status: createdOrder.status,
				}),
				"Order created successfully",
			);

			await ProductService.updateMultipleProductStocks(
				input.orderItems.map((item) => ({
					productId: item.productId,
					variantId: item.variantId,
					quantity: item.quantity,
				})),
				"decrement",
				tx,
			);

			addSpanEvent("order.stock.updated", { order_id: createdOrder.id });

			return createdOrder;
		});

		addSpanAttributes({
			"order.id": order.id,
			"order.total_items": order.orderItems.length,
			"order.status": order.status,
			"order.has_customer": !!order.customerId,
		});

		return OrderEntity.getRo(order);
	}

	/**
	 * Create order for public storefront (guest orders)
	 * No userId required, no ownership check
	 * Status automatically set to PENDING
	 */
	static async createOrderPublic(
		input: CreateOrderPublicInput,
	): Promise<OrderPublicOutput> {
		addSpanAttributes({
			"order.store_id": input.storeId,
			"order.items_count": input.orderItems.length,
			"order.is_guest": true,
		});

		// Get store to generate ID and validate payment method (no ownership check)
		const store = await database.store.findUnique({
			where: { id: input.storeId, ...StoreQuery.getPublishedWhere() },
			select: {
				id: true,
				slug: true,
				status: true,
				supportedPaymentMethods: true,
				shippingCost: true,
			},
		});

		if (!store) {
			throw new Error("Store not found");
		}

		// Validate payment method is supported by store
		if (!store.supportedPaymentMethods.includes(input.paymentMethod)) {
			throw new Error(
				`Payment method ${input.paymentMethod} is not supported by this store. Supported methods: ${store.supportedPaymentMethods.join(", ")}`,
			);
		}

		addSpanEvent("order.store.verified", { store_id: store.id });
		logger.info(
			enhanceLogWithTraceContext({
				store_id: input.storeId,
				items_count: input.orderItems.length,
				is_guest: true,
			}),
			"Public order creation started",
		);

		// Generate order ID from store slug
		const orderId = OrderService.generateOrderId(store.slug);

		// Wrap stock check, customer/address creation, order creation, and stock updates in transaction
		const order = await database.$transaction(async (tx) => {
			// Validate products exist and check stock (within transaction for isolation)
			await ProductService.checkStockAvailability(
				input.orderItems.map((item) => ({
					productId: item.productId,
					variantId: item.variantId,
					quantity: item.quantity,
				})),
				input.storeId,
				tx,
			);

			addSpanEvent("order.stock.validated", { store_id: store.id });

			// Fetch server-side prices (never trust client-provided values)
			const orderItemsWithPrices = await ProductService.getOrderItemPrices(
				input.orderItems,
				input.storeId,
				tx,
			);

			// Find or create customer
			const customer = await CustomerService.findOrCreateCustomer(
				input.customerPhone,
				input.customerName,
				input.storeId,
				tx,
			);

			addSpanEvent("order.customer.created_or_found", {
				customer_id: customer.id,
			});

			// Update customer's WhatsApp preference to match this order's choice
			if (customer.prefersWhatsApp !== input.isWhatsApp) {
				await tx.customer.update({
					where: { id: customer.id },
					data: { prefersWhatsApp: input.isWhatsApp },
				});
			}

			// Create or find address
			// If addressId is provided, use it; otherwise create/find from address object
			let addressId: string | null = null;
			if (input.addressId) {
				const existingAddress = await tx.address.findFirst({
					where: {
						id: input.addressId,
						customerId: customer.id,
					},
					select: { id: true },
				});
				if (!existingAddress) {
					throw new Error(
						"Address not found or does not belong to this customer",
					);
				}
				addressId = existingAddress.id;
			} else {
				const address = await AddressService.createOrFindAddress(
					{
						...input.address,
						customerId: customer.id,
						isDefault: false, // Don't set as default on order creation
					},
					tx,
				);
				addressId = address.id;
			}

			addSpanEvent("order.address.created_or_found", {
				address_id: addressId,
			});

			// Create order with order items (within transaction)
			const createdOrder = await tx.order.create({
				data: {
					id: orderId,
					storeId: input.storeId,
					paymentMethod: input.paymentMethod,
					isWhatsApp: input.isWhatsApp,
					notes: input.notes,
					customerId: customer.id,
					addressId,
					status: OrderStatus.PENDING,
					orderItems: {
						create: orderItemsWithPrices.map((item) => ({
							productId: item.productId,
							productVariantId: item.variantId,
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

			addSpanEvent("order.created", { order_id: createdOrder.id });
			logger.info(
				enhanceLogWithTraceContext({
					order_id: createdOrder.id,
					store_id: input.storeId,
					total_items: createdOrder.orderItems.length,
					status: createdOrder.status,
				}),
				"Public order created successfully",
			);

			await ProductService.updateMultipleProductStocks(
				input.orderItems.map((item) => ({
					productId: item.productId,
					variantId: item.variantId,
					quantity: item.quantity,
				})),
				"decrement",
				tx,
			);

			addSpanEvent("order.stock.updated", { order_id: createdOrder.id });

			return createdOrder;
		});

		addSpanAttributes({
			"order.id": order.id,
			"order.total_items": order.orderItems.length,
			"order.status": order.status,
			"order.has_customer": false,
		});

		return OrderEntity.getPublicRo(order);
	}

	/**
	 * Update order status
	 */
	static async updateOrderStatus(
		orderId: string,
		status: OrderStatus,
		userId: string,
	): Promise<OrderIncludeOutput> {
		addSpanAttributes({
			"order.id": orderId,
			"order.status": status,
			"order.user_id": userId,
		});

		// Get order to verify ownership
		const order = await database.order.findUnique({
			where: { id: orderId },
			select: { storeId: true, status: true },
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

		logger.info(
			enhanceLogWithTraceContext({
				order_id: orderId,
				previous_status: order.status,
				new_status: status,
				user_id: userId,
			}),
			"Order status updated",
		);

		const updatedOrder = await database.order.update({
			where: { id: orderId },
			data: { status },
			include: OrderQuery.getInclude(),
		});

		addSpanAttributes({
			"order.previous_status": order.status,
			"order.new_status": status,
		});

		return OrderEntity.getRo(updatedOrder);
	}

	/**
	 * Delete order and restore stock
	 * Wrapped in transaction to ensure atomicity
	 */
	static async deleteOrder(orderId: string, userId: string): Promise<void> {
		addSpanAttributes({
			"order.id": orderId,
			"order.user_id": userId,
		});

		// Get order to verify ownership and get order items
		const order = await database.order.findUnique({
			where: { id: orderId },
			select: {
				storeId: true,
				orderItems: {
					select: {
						productId: true,
						productVariantId: true,
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

		logger.info(
			enhanceLogWithTraceContext({
				order_id: orderId,
				items_to_restore: order.orderItems.length,
				user_id: userId,
			}),
			"Order deleted",
		);

		// Wrap stock increment and order deletion in transaction
		// This ensures atomicity: both operations succeed or fail together
		await database.$transaction(async (tx) => {
			// Restore product stock if order has items (within transaction)
			if (order.orderItems.length > 0) {
				await ProductService.updateMultipleProductStocks(
					order.orderItems.map((item) => ({
						productId: item.productId,
						variantId: item.productVariantId ?? undefined,
						quantity: item.quantity,
					})),
					"increment",
					tx,
				);
			}

			addSpanAttributes({
				"order.items_to_restore": order.orderItems.length,
			});

			// Delete order (order items will be cascade deleted) within same transaction
			await tx.order.delete({
				where: { id: orderId },
			});
		});
	}
}

export const OrderService = traceStaticClass(OrderServiceBase);
