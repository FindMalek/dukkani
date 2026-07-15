import {
  ORDER_STATUS_BADGE_VARIANT,
  OrderEntity,
} from "@dukkani/common/entities/order/entity";
import type { OrderListItemOutput } from "@dukkani/common/schemas/order/output";
import { useTranslations } from "next-intl";
import { useFormatOrderRelativeDateTime } from "@/shared/lib/i18n/use-format-order-relative-datetime";
import { getItemsCount, getOrderTotal } from "./order.util";

/**
 * Derives the display strings shared by every orders-list presentation
 * (mobile card, desktop table) from a single {@link OrderListItemOutput}.
 *
 * Keeps price/date/status formatting in one place so the card and table
 * can't drift.
 */
export function useOrderListItemView(order: OrderListItemOutput) {
  const t = useTranslations("orders.list");
  const formattedDate = useFormatOrderRelativeDateTime(order.createdAt);

  const total = getOrderTotal(order);
  const itemsCount = getItemsCount(order);
  const paymentLabel = t(
    OrderEntity.getPaymentMethodLabelKey(order.paymentMethod),
  );
  const badgeVariant = ORDER_STATUS_BADGE_VARIANT[order.status] ?? "outline";
  const statusLabel = t(OrderEntity.getStatusLabelKey(order.status));
  const nextStatus = OrderEntity.getNextStatus(order.status);

  return {
    total,
    itemsCount,
    paymentLabel,
    badgeVariant,
    statusLabel,
    nextStatus,
    canAdvance: nextStatus !== null,
    formattedDate,
    customerName: order.customer?.name ?? undefined,
  };
}
