import prisma from "@dukkani/db";
import { protectedProcedure } from "../index";
import { getUserStoreIds, verifyStoreOwnership } from "../utils/store-access";
import { OrderService } from "@dukkani/common/services/orderService";
import {
	listOrdersInputSchema,
	createOrderInputSchema,
	getOrderInputSchema,
} from "@dukkani/common/schemas/order/input";
import { orderStatusSchema } from "@dukkani/common/schemas/order/enums";
import { OrderQuery } from "@dukkani/common/entities/order/query";
import { OrderEntity } from "@dukkani/common/entities/order/entity";
import type {
	ListOrdersOutput,
	OrderIncludeOutput,
} from "@dukkani/common/schemas/order/output";
import { z } from "zod";
import { ORPCError } from "@orpc/server";

// Schema for creating order without id (will be generated)
const createOrderWithoutIdSchema = createOrderInputSchema.omit({ id: true });

// Schema for updating order status
const updateOrderStatusSchema = z.object({
	id: z.string().min(1),
	status: orderStatusSchema,
});

export const orderRouter = {
	/**
	 * Get all orders for user's stores (with pagination/filtering)
	 */
	getAll: protectedProcedure
		.input(listOrdersInputSchema.optional())
		.handler(async ({ input, context }): Promise<ListOrdersOutput> => {
			const userId = context.session.user.id;
			const userStoreIds = await getUserStoreIds(userId);

			if (userStoreIds.length === 0) {
				return {
					orders: [],
					total: 0,
					hasMore: false,
					page: input?.page ?? 1,
					limit: input?.limit ?? 20,
				};
			}

			const page = input?.page ?? 1;
			const limit = input?.limit ?? 20;
			const skip = (page - 1) * limit;

			// Verify store ownership if filtering by specific store
			if (input?.storeId) {
				await verifyStoreOwnership(userId, input.storeId);
			}

			const where = OrderQuery.getWhere(userStoreIds, {
				storeId: input?.storeId,
				status: input?.status,
				customerId: input?.customerId,
				search: input?.search,
			});

			const [orders, total] = await Promise.all([
				prisma.order.findMany({
					where,
					skip,
					take: limit,
					orderBy: OrderQuery.getOrder("desc", "createdAt"),
					include: OrderQuery.getInclude(),
				}),
				prisma.order.count({ where }),
			]);

			const hasMore = skip + orders.length < total;

			return {
				orders: orders.map(OrderEntity.getSimpleRo),
				total,
				hasMore,
				page,
				limit,
			};
		}),

	/**
	 * Get order by ID with order items (verify store ownership)
	 */
	getById: protectedProcedure
		.input(getOrderInputSchema)
		.handler(async ({ input, context }): Promise<OrderIncludeOutput> => {
			const userId = context.session.user.id;

			const order = await prisma.order.findUnique({
				where: { id: input.id },
				include: OrderQuery.getInclude(),
			});

			if (!order) {
				throw new ORPCError("NOT_FOUND", {
					message: "Order not found",
				});
			}

			// Verify ownership
			await verifyStoreOwnership(userId, order.storeId);

			return OrderEntity.getRo(order);
		}),

	/**
	 * Create new order (verify store ownership)
	 */
	create: protectedProcedure
		.input(createOrderWithoutIdSchema)
		.handler(async ({ input, context }): Promise<OrderIncludeOutput> => {
			const userId = context.session.user.id;

			// Get store to generate order ID
			const store = await prisma.store.findUnique({
				where: { id: input.storeId },
				select: { slug: true },
			});

			if (!store) {
				throw new ORPCError("NOT_FOUND", {
					message: "Store not found",
				});
			}

			// Generate order ID
			const orderId = OrderService.generateOrderId(store.slug);

			// Create order using service (handles stock validation and updates)
			return await OrderService.createOrder(
				{
					...input,
					id: orderId,
					status: input.status,
				},
				userId,
			);
		}),

	/**
	 * Update order status (verify store ownership)
	 */
	updateStatus: protectedProcedure
		.input(updateOrderStatusSchema)
		.handler(async ({ input, context }): Promise<OrderIncludeOutput> => {
			const userId = context.session.user.id;
			return await OrderService.updateOrderStatus(
				input.id,
				input.status,
				userId,
			);
		}),

	/**
	 * Delete order (verify store ownership)
	 */
	delete: protectedProcedure
		.input(getOrderInputSchema)
		.handler(async ({ input, context }) => {
			const userId = context.session.user.id;
			await OrderService.deleteOrder(input.id, userId);
			return { success: true };
		}),
};
