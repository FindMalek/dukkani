import {
  ORDER_STATUS_BADGE_VARIANT,
  OrderEntity,
} from "@dukkani/common/entities/order/entity";
import {
  parseLimit,
  parseOrderStatus,
  parsePage,
  parseSearchQuery,
} from "@dukkani/common/lib";
import type { ListOrdersInput } from "@dukkani/common/schemas/order/input";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useFormatter, useTranslations } from "next-intl";
import { useQueryStates } from "nuqs";
import { useMemo } from "react";
import { isOrpcNotFoundError } from "@/shared/api/error-handler";
import { appMutations } from "@/shared/api/mutations";
import { appQueries } from "@/shared/api/queries";
import { useActiveStoreStore } from "../store/active.store";
import { getItemsCount, getOrderTotal } from "./order.util";
import { useOrderStore } from "./store";

/**
 * Formats `createdAt` like the order detail meta line: "Today, 08:10" or full date+time.
 */
export function useFormatOrderListRelativeTime(
  createdAt: Date | string | undefined,
): string {
  const tList = useTranslations("orders.list");
  const format = useFormatter();

  return useMemo(() => {
    if (createdAt == null) return "";
    const orderDate = new Date(createdAt);
    const now = new Date();
    const yesterday = new Date(now);
    yesterday.setDate(now.getDate() - 1);
    const isToday = orderDate.toDateString() === now.toDateString();
    const isYesterday = orderDate.toDateString() === yesterday.toDateString();
    const formattedTime = format.dateTime(orderDate, {
      hour: "2-digit",
      minute: "2-digit",
    });
    if (isToday) return `${tList("today")}, ${formattedTime}`;
    if (isYesterday) return `${tList("yesterday")}, ${formattedTime}`;
    return format.dateTime(orderDate, {
      dateStyle: "medium",
      timeStyle: "short",
    });
  }, [createdAt, format, tList]);
}

/**
 * Data and derived fields for the order detail screen. Pass `orderId` from
 * `getDynamicRouteParam` after the page has ensured it is defined, or
 * `undefined` when missing (query will stay disabled).
 */
export function useOrderDetailPage(orderId: string | undefined) {
  const tDetail = useTranslations("orders.detail");
  const {
    data: order,
    isLoading,
    isError,
    error,
  } = useQuery({
    ...appQueries.order.byId({ input: { id: orderId ?? "" } }),
    enabled: !!orderId,
  });
  const isNotFoundError = isError && isOrpcNotFoundError(error);
  const updateStatusMutation = useMutation(appMutations.order.updateStatus());
  const formattedCreatedAt = useFormatOrderListRelativeTime(order?.createdAt);

  const view = useMemo(() => {
    if (!order) {
      return {
        subtotal: 0,
        deliveryFee: 0,
        total: 0,
        itemsCount: 0,
        nextStatus: null,
        canAdvance: false,
        badgeVariant: "outline" as const,
        statusKey: "status.pending" as const,
        paymentKey: "cashOnDelivery" as const,
        phone: undefined as string | undefined,
        isWhatsApp: false,
        firstName: tDetail("call"),
      };
    }
    const subtotal = getOrderTotal(order);
    const deliveryFee = order.store?.shippingCost ?? 0;
    const nextStatus = OrderEntity.getNextStatus(order.status);
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
      isWhatsApp: order.customer?.prefersWhatsApp ?? false,
      firstName: order.customer?.name?.split(" ")[0] ?? tDetail("call"),
    };
  }, [order, tDetail]);

  return {
    order,
    isLoading,
    isError,
    isNotFoundError,
    updateStatusMutation,
    formattedCreatedAt,
    ...view,
  };
}

/**
 * Controller hook that composes:
 * - Active store state (Zustand)
 * - Filter + pagination state (nuqs — URL-synced, shareable, bookmarkable)
 * - UI state — selection (Zustand)
 * - ORPC query hooks
 * - ORPC mutation hooks
 *
 * Provides a single interface for the orders list page.
 */
export function useOrdersController() {
  const { selectedStoreId } = useActiveStoreStore();
  const { selectedOrderId, setSelectedOrderId } = useOrderStore();

  const [filters, setFilters] = useQueryStates({
    search: parseSearchQuery.withDefault(""),
    status: parseOrderStatus,
    page: parsePage,
    limit: parseLimit,
  });

  const resetFilters = () =>
    setFilters({ search: "", status: null, page: 1, limit: 50 });

  const queryInput = useMemo<ListOrdersInput>(() => {
    const input: ListOrdersInput = {
      page: filters.page,
      limit: filters.limit,
      storeId: selectedStoreId ?? undefined,
    };
    if (filters.search) input.search = filters.search;
    if (filters.status) input.status = filters.status;
    return input;
  }, [selectedStoreId, filters]);

  const ordersQuery = useQuery(appQueries.order.all({ input: queryInput }));

  const createOrderMutation = useMutation(appMutations.order.create());
  const updateOrderStatusMutation = useMutation(
    appMutations.order.updateStatus(),
  );
  const deleteOrderMutation = useMutation(appMutations.order.delete());

  return {
    selectedStoreId,
    search: filters.search,
    status: filters.status,
    page: filters.page,
    setSearch: (v: string) => {
      setFilters({ search: v, page: 1 });
    },
    setStatus: (v: typeof filters.status) => {
      setFilters({ status: v, page: 1 });
    },
    setPage: (v: number) => {
      setFilters({ page: v });
    },
    resetFilters,
    selectedOrderId,
    setSelectedOrderId,
    ordersQuery,
    createOrderMutation,
    updateOrderStatusMutation,
    deleteOrderMutation,
  };
}
