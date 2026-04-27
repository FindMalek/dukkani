import {
  ORDER_STATUS_BADGE_VARIANT,
  OrderEntity,
} from "@dukkani/common/entities/order/entity";
import {
  isLocalCalendarDayToday,
  isLocalCalendarDayYesterday,
} from "@dukkani/common/lib";
import type {
  OrderForLineTotals,
  OrderIncludeOutput,
  OrderListItemOutput,
} from "@dukkani/common/schemas/order/output";

export type DateGroupKey = "today" | "yesterday" | "older";

export interface GroupedOrders {
  today: OrderListItemOutput[];
  yesterday: OrderListItemOutput[];
  older: { label: string; orders: OrderListItemOutput[] }[];
}

export interface OrderListDisplaySection {
  key: string;
  title: string;
  orders: OrderListItemOutput[];
}

/**
 * Flattens grouped orders into non-empty sections for list rendering (today, yesterday, then older by date).
 */
export function getOrderListDisplaySections(
  grouped: GroupedOrders,
  labels: { today: string; yesterday: string },
): OrderListDisplaySection[] {
  return [
    { key: "today", title: labels.today, orders: grouped.today },
    { key: "yesterday", title: labels.yesterday, orders: grouped.yesterday },
    ...grouped.older.map((g) => ({
      key: g.label,
      title: g.label,
      orders: g.orders,
    })),
  ].filter((s) => s.orders.length > 0);
}

/**
 * Groups orders by date: today, yesterday, and older (with formatted date labels).
 */
export function groupOrdersByDate(
  orders: OrderListItemOutput[],
  now = new Date(),
): GroupedOrders {
  const today: OrderListItemOutput[] = [];
  const yesterday: OrderListItemOutput[] = [];
  const olderByDate = new Map<string, OrderListItemOutput[]>();

  for (const order of orders) {
    const createdAt = new Date(order.createdAt);
    if (isLocalCalendarDayToday(createdAt, now)) {
      today.push(order);
    } else if (isLocalCalendarDayYesterday(createdAt, now)) {
      yesterday.push(order);
    } else {
      const label = createdAt.toLocaleDateString(undefined, {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      });
      const existing = olderByDate.get(label) ?? [];
      existing.push(order);
      olderByDate.set(label, existing);
    }
  }

  const older = Array.from(olderByDate.entries())
    .map(([label, ords]) => {
      const firstDate = ords[0] ? new Date(ords[0].createdAt).getTime() : 0;
      return { label, orders: ords, sortKey: firstDate };
    })
    .sort((a, b) => b.sortKey - a.sortKey)
    .map(({ label, orders: ords }) => ({ label, orders: ords }));

  return { today, yesterday, older };
}

export function getOrderTotal(order: OrderForLineTotals): number {
  return (
    order.orderItems?.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0,
    ) ?? 0
  );
}

export function getItemsCount(order: OrderForLineTotals): number {
  return order.orderItems?.reduce((sum, item) => sum + item.quantity, 0) ?? 0;
}

/**
 * Pure derived fields for the order detail screen. Call only when `order` is loaded.
 */
export function getOrderDetailView(order: OrderIncludeOutput) {
  const subtotal = getOrderTotal(order);
  const deliveryFee = order.store?.shippingCost ?? 0;
  const nextStatus = OrderEntity.getNextStatus(order.status);
  const customerName = order.customer?.name?.trim() || undefined;
  return {
    subtotal,
    deliveryFee,
    total: subtotal + deliveryFee,
    itemsCount: getItemsCount(order),
    nextStatus,
    canAdvance: nextStatus !== null,
    badgeVariant: ORDER_STATUS_BADGE_VARIANT[order.status] ?? "outline",
    statusKey: OrderEntity.getStatusLabelKey(order.status),
    paymentKey: OrderEntity.getPaymentMethodLabelKey(order.paymentMethod),
    phone: order.customer?.phone,
    isWhatsApp: order.isWhatsApp,
    customerName,
  };
}

export type OrderDetailView = ReturnType<typeof getOrderDetailView>;
