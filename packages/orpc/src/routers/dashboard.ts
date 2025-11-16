import prisma from "@dukkani/db";
import { protectedProcedure } from "../index";
import { getUserStoreIds } from "../utils/store-access";
import { ProductQuery } from "@dukkani/common/entities/product/query";
import { ProductEntity } from "@dukkani/common/entities/product/entity";
import { OrderQuery } from "@dukkani/common/entities/order/query";
import { OrderEntity } from "@dukkani/common/entities/order/entity";
import { OrderStatus } from "@dukkani/common/schemas/order/enums";

export const dashboardRouter = {
	/**
	 * Get aggregated dashboard statistics from user's stores
	 */
	getStats: protectedProcedure.handler(async ({ context }) => {
		const userId = context.session.user.id;
		const userStoreIds = await getUserStoreIds(userId);

		if (userStoreIds.length === 0) {
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

		// Get total products count
		const totalProducts = await prisma.product.count({
			where: {
				storeId: { in: userStoreIds },
			},
		});

		// Get total orders count
		const totalOrders = await prisma.order.count({
			where: {
				storeId: { in: userStoreIds },
			},
		});

		// Get orders by status
		const ordersByStatus = await prisma.order.groupBy({
			by: ["status"],
			where: {
				storeId: { in: userStoreIds },
			},
			_count: {
				id: true,
			},
		});

		const ordersByStatusMap: Record<OrderStatus, number> = {
			PENDING: 0,
			CONFIRMED: 0,
			PROCESSING: 0,
			SHIPPED: 0,
			DELIVERED: 0,
			CANCELLED: 0,
		};

		for (const group of ordersByStatus) {
			ordersByStatusMap[group.status] = group._count.id;
		}

		// Calculate total revenue from delivered orders
		const deliveredOrders = await prisma.order.findMany({
			where: {
				storeId: { in: userStoreIds },
				status: "DELIVERED",
			},
			include: {
				orderItems: {
					select: {
						quantity: true,
						price: true,
					},
				},
			},
		});

		const totalRevenue = deliveredOrders.reduce((sum, order) => {
			const orderTotal = order.orderItems.reduce(
				(itemSum, item) => itemSum + Number(item.price) * item.quantity,
				0,
			);
			return sum + orderTotal;
		}, 0);

		// Get recent orders (last 10)
		const recentOrders = await prisma.order.findMany({
			where: {
				storeId: { in: userStoreIds },
			},
			take: 10,
			orderBy: {
				createdAt: "desc",
			},
			include: OrderQuery.getInclude(),
		});

		// Get low stock products (stock <= 10)
		const lowStockProducts = await prisma.product.findMany({
			where: {
				storeId: { in: userStoreIds },
				stock: {
					lte: 10,
				},
			},
			take: 10,
			orderBy: {
				stock: "asc",
			},
			include: ProductQuery.getClientSafeInclude(),
		});

		return {
			totalProducts,
			totalOrders,
			ordersByStatus: ordersByStatusMap,
			totalRevenue,
			recentOrders: recentOrders.map(OrderEntity.getSimpleRo),
			lowStockProducts: lowStockProducts.map(ProductEntity.getSimpleRo),
		};
	}),
};
