import { database } from "@dukkani/db";
import { addSpanAttributes, traceStaticClass } from "@dukkani/tracing";
import {
  endOfDay,
  endOfWeek,
  startOfDay,
  startOfWeek,
  subDays,
} from "date-fns";
import { OrderQuery } from "../entities/order/query";
import { OrderItemQuery } from "../entities/order-item/query";
import { OrderStatus } from "../schemas/order/enums";

/**
 * Dashboard service - Aggregated statistics for the dashboard home overview
 * All methods are automatically traced via traceStaticClass
 */
class DashboardServiceBase {
  /**
   * Stats used by the dashboard home UI (today / this week). Scoped to the user's store(s).
   */
  static async getDashboardStats(userId: string, storeId?: string) {
    addSpanAttributes({
      "dashboard.user_id": userId,
      "dashboard.store_id": storeId ?? "undefined",
    });

    const userStoreIds = await database.store.findMany({
      where: { ownerId: userId },
      select: { id: true },
    });

    const storeIds = userStoreIds.map((s) => s.id);

    if (storeIds.length === 0) {
      return {
        todayOrders: 0,
        todayOrdersChange: 0,
        todayRevenue: 0,
        weekOrders: 0,
      };
    }

    const filteredStoreIds =
      storeId && storeIds.includes(storeId) ? [storeId] : storeIds;

    const now = new Date();
    const todayStart = startOfDay(now);
    const todayEnd = endOfDay(now);
    const yesterdayStart = startOfDay(subDays(now, 1));
    const yesterdayEnd = endOfDay(subDays(now, 1));
    const weekStart = startOfWeek(now, { weekStartsOn: 1 });
    const weekEnd = endOfWeek(now, { weekStartsOn: 1 });

    const baseOrderWhere = OrderQuery.getWhere(filteredStoreIds);

    const [todayOrders, yesterdayOrders, todayDeliveredOrders, weekOrders] =
      await database.$transaction([
        database.order.count({
          where: {
            ...baseOrderWhere,
            createdAt: {
              gte: todayStart,
              lte: todayEnd,
            },
          },
        }),
        database.order.count({
          where: {
            ...baseOrderWhere,
            createdAt: {
              gte: yesterdayStart,
              lte: yesterdayEnd,
            },
          },
        }),
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

    const todayRevenue = todayDeliveredOrders.reduce((sum, order) => {
      const orderTotal = order.orderItems.reduce(
        (itemSum, item) => itemSum + Number(item.price) * item.quantity,
        0,
      );
      return sum + orderTotal;
    }, 0);

    const todayOrdersChange =
      yesterdayOrders > 0 ? todayOrders - yesterdayOrders : todayOrders;

    addSpanAttributes({
      "dashboard.stores_count": storeIds.length,
    });

    return {
      todayOrders,
      todayOrdersChange,
      todayRevenue,
      weekOrders,
    };
  }
}

export const DashboardService = traceStaticClass(DashboardServiceBase);
