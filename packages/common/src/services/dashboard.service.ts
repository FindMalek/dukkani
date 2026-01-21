import { database } from "@dukkani/db";
import { addSpanAttributes, traceStaticClass } from "@dukkani/tracing";
import {
	endOfDay,
	endOfWeek,
	startOfDay,
	startOfWeek,
	subDays,
} from "date-fns";
import { OrderEntity } from "../entities/order/entity";
import { OrderQuery } from "../entities/order/query";
import { OrderItemQuery } from "../entities/order-item/query";
import { ProductEntity } from "../entities/product/entity";
import { ProductQuery } from "../entities/product/query";
import { OrderStatus } from "../schemas/order/enums";

/**
 * Dashboard service - Aggregated statistics and dashboard data
 * All methods are automatically traced via traceStaticClass
 */
class DashboardServiceBase {
	/**
	 * Get dashboard statistics for a user's stores
	 * Uses transactions to optimize database queries
	 */
	static async getDashboardStats(userId: string, storeId: string) {
		addSpanAttributes({
			"dashboard.user_id": userId,
			"dashboard.store_id": storeId,
		});

		// Get user's store IDs first
		const userStoreIds = await database.store.findMany({
			where: { ownerId: userId },
			select: { id: true },
		});

		const storeIds = userStoreIds.map((s) => s.id);

		if (storeIds.length === 0) {
			return {
				totalProducts: 0,
				totalOrders: 0,
				ordersByStatus: {
					PENDING: 0,
					CONFIRMED: 0,
					PROCESSING: 0,
					SHIPPED: 0,
					DELIVERED: 0,
					CANCELLED: 0,
				},
				totalRevenue: 0,
				recentOrders: [],
				lowStockProducts: [],
			};
		}

		// Filter to specific store if provided
		const filteredStoreIds =
			storeId && storeIds.includes(storeId) ? [storeId] : storeIds;

		// Date calculations
		const now = new Date();
		const todayStart = startOfDay(now);
		const todayEnd = endOfDay(now);
		const yesterdayStart = startOfDay(subDays(now, 1));
		const yesterdayEnd = endOfDay(subDays(now, 1));
		const weekStart = startOfWeek(now, { weekStartsOn: 1 }); // Monday
		const weekEnd = endOfWeek(now, { weekStartsOn: 1 });

		const baseOrderWhere = OrderQuery.getWhere(filteredStoreIds);
		const baseProductWhere = ProductQuery.getWhere(filteredStoreIds);

		const [
			totalProducts,
			totalOrders,
			ordersByStatus,
			deliveredOrders,
			recentOrders,
			lowStockProducts,
			todayOrders,
			yesterdayOrders,
			todayDeliveredOrders,
			weekOrders,
		] = await database.$transaction([
			// Get total products count
			database.product.count({
				where: baseProductWhere,
			}),

			// Get total orders count
			database.order.count({
				where: baseOrderWhere,
			}),

			// Get orders by status
			database.order.groupBy({
				by: ["status"],
				where: baseOrderWhere,
				_count: {
					id: true,
				},
				orderBy: {
					status: "asc",
				},
			}),

			// Get delivered orders for revenue calculation
			database.order.findMany({
				where: {
					...baseOrderWhere,
					status: OrderStatus.DELIVERED,
				},
				include: {
					orderItems: {
						select: OrderItemQuery.getRevenueSelect(),
					},
				},
			}),

			// Get recent orders (last 10)
			database.order.findMany({
				where: baseOrderWhere,
				take: 10,
				orderBy: OrderQuery.getOrder("desc", "createdAt"),
				include: OrderQuery.getInclude(),
			}),

			// Get low stock products (stock <= 10)
			database.product.findMany({
				where: {
					...baseProductWhere,
					stock: { lte: 10 },
				},
				take: 10,
				orderBy: ProductQuery.getOrder("asc", "stock"),
				include: ProductQuery.getClientSafeInclude(),
			}),

			// Today's orders count
			database.order.count({
				where: {
					...baseOrderWhere,
					createdAt: {
						gte: todayStart,
						lte: todayEnd,
					},
				},
			}),

			// Yesterday's orders count (for change calculation)
			database.order.count({
				where: {
					...baseOrderWhere,
					createdAt: {
						gte: yesterdayStart,
						lte: yesterdayEnd,
					},
				},
			}),

			// Today's delivered orders for revenue
			database.order.findMany({
				where: {
					...baseOrderWhere,
					status: OrderStatus.DELIVERED,
					createdAt: {
						gte: todayStart,
						lte: todayEnd,
					},
				},
				include: {
					orderItems: {
						select: OrderItemQuery.getRevenueSelect(),
					},
				},
			}),

			// This week's orders count
			database.order.count({
				where: {
					...baseOrderWhere,
					createdAt: {
						gte: weekStart,
						lte: weekEnd,
					},
				},
			}),
		]);

		// Calculate today's revenue
		const todayRevenue = todayDeliveredOrders.reduce((sum, order) => {
			const orderTotal = order.orderItems.reduce(
				(itemSum, item) => itemSum + Number(item.price) * item.quantity,
				0,
			);
			return sum + orderTotal;
		}, 0);

		// Calculate change (today vs yesterday)
		const todayOrdersChange =
			yesterdayOrders > 0
				? todayOrders - yesterdayOrders
				: todayOrders > 0
					? todayOrders
					: 0;

		// Build orders by status map
		const ordersByStatusMap: Record<OrderStatus, number> = {
			PENDING: 0,
			CONFIRMED: 0,
			PROCESSING: 0,
			SHIPPED: 0,
			DELIVERED: 0,
			CANCELLED: 0,
		};

		for (const group of ordersByStatus) {
			if (
				group._count &&
				typeof group._count === "object" &&
				"id" in group._count
			) {
				ordersByStatusMap[group.status] = group._count.id ?? 0;
			}
		}

		// Calculate total revenue from delivered orders
		const totalRevenue = deliveredOrders.reduce((sum, order) => {
			const orderTotal = order.orderItems.reduce(
				(itemSum, item) => itemSum + Number(item.price) * item.quantity,
				0,
			);
			return sum + orderTotal;
		}, 0);

		addSpanAttributes({
			"dashboard.stores_count": storeIds.length,
			"dashboard.total_products": totalProducts,
			"dashboard.total_orders": totalOrders,
			"dashboard.total_revenue": totalRevenue,
			"dashboard.recent_orders_count": recentOrders.length,
			"dashboard.low_stock_count": lowStockProducts.length,
		});

		return {
			totalProducts,
			totalOrders,
			ordersByStatus: ordersByStatusMap,
			totalRevenue,
			recentOrders: recentOrders.map(OrderEntity.getSimpleRo),
			lowStockProducts: lowStockProducts.map(ProductEntity.getSimpleRo),
			todayOrders,
			todayOrdersChange,
			todayRevenue,
			weekOrders,
		};
	}
}

export const DashboardService = traceStaticClass(DashboardServiceBase);
