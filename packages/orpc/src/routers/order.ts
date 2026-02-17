import { OrderEntity } from "@dukkani/common/entities/order/entity";
import { OrderQuery } from "@dukkani/common/entities/order/query";
import {
	createOrderInputSchema,
	createOrderPublicInputSchema,
	getOrderInputSchema,
	listOrdersInputSchema,
	updateOrderStatusInputSchema,
} from "@dukkani/common/schemas/order/input";
import type {
	ListOrdersOutput,
	OrderIncludeOutput,
} from "@dukkani/common/schemas/order/output";
import {
	listOrdersOutputSchema,
	orderIncludeOutputSchema,
	orderPublicOutputSchema,
} from "@dukkani/common/schemas/order/output";
import { successOutputSchema } from "@dukkani/common/schemas/utils/success";
import { OrderService } from "@dukkani/common/services";
import { database } from "@dukkani/db";
import { ORPCError } from "@orpc/server";
import { baseProcedure, protectedProcedure } from "../index";
import { getUserStoreIds, verifyStoreOwnership } from "../utils/store-access";
import { rateLimitPublicSafe } from "../middleware/rate-limit";

export const orderRouter = {
	/**
	 * Create order (admin - requires store ownership)
	 */
	create: protectedProcedure
		.input(createOrderInputSchema)
		.output(orderIncludeOutputSchema)
		.handler(async ({ input, context }): Promise<OrderIncludeOutput> => {
			const userId = context.session.user.id;
			return await OrderService.createOrder(input, userId);
		}),

	/**
	 * Get all orders for user's stores (with pagination/filtering)
	 */
	getAll: protectedProcedure
		.input(listOrdersInputSchema.optional())
		.output(listOrdersOutputSchema)
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
				database.order.findMany({
					where,
					skip,
					take: limit,
					orderBy: OrderQuery.getOrder("desc", "createdAt"),
					include: OrderQuery.getInclude(),
				}),
				database.order.count({ where }),
			]);

			const hasMore = skip + orders.length < total;

			return {
				orders: orders.map(OrderEntity.getRo),
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
		.output(orderIncludeOutputSchema)
		.handler(async ({ input, context }): Promise<OrderIncludeOutput> => {
			const userId = context.session.user.id;

			const order = await database.order.findUnique({
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
	 * Update order status (verify store ownership)
	 */
	updateStatus: protectedProcedure
		.input(updateOrderStatusInputSchema)
		.output(orderIncludeOutputSchema)
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
		.output(successOutputSchema)
		.handler(async ({ input, context }) => {
			const userId = context.session.user.id;
			await OrderService.deleteOrder(input.id, userId);
			return { success: true };
		}),

	/**
	 * Create new order (public - for storefronts)
	 * No authentication required, uses public rate limiting
	 * Status automatically set to PENDING
	 */
	createPublic: baseProcedure
		.use(rateLimitPublicSafe)
		.input(createOrderPublicInputSchema)
		.output(orderPublicOutputSchema)
		.handler(async ({ input }): Promise<OrderIncludeOutput> => {
			return await OrderService.createOrderPublic(input);
		}),
};
