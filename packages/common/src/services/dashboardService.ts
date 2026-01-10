import { database } from "@dukkani/db";
import { addSpanAttributes, Trace } from "@dukkani/tracing";
import { OrderEntity } from "../entities/order/entity";
import { OrderQuery } from "../entities/order/query";
import { OrderItemQuery } from "../entities/order-item/query";
import { ProductEntity } from "../entities/product/entity";
import { ProductQuery } from "../entities/product/query";
import { OrderStatus } from "../schemas/order/enums";

/**
 * Dashboard service - Aggregated statistics and dashboard data
 */
export class DashboardService {
	/**
	 * Get dashboard statistics for a user's stores
	 * Uses transactions to optimize database queries
	 */
	@Trace("dashboard.get_stats")
	static async getDashboardStats(userId: string) {
		addSpanAttributes({
			"dashboard.user_id": userId,
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

		// Use transaction to run all queries in parallel for better performance
		const baseOrderWhere = OrderQuery.getWhere(storeIds);
		const baseProductWhere = ProductQuery.getWhere(storeIds);

		const [
			totalProducts,
			totalOrders,
			ordersByStatus,
			deliveredOrders,
			recentOrders,
			lowStockProducts,
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
		]);

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
		};
	}
}
