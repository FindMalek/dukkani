import {
  parseGovernorates,
  parseLimit,
  parseOrderStatus,
  parsePage,
  parseSearchQuery,
} from "@dukkani/common/lib";
import type { GovernorateInfer } from "@dukkani/common/schemas/enums";
import type { ListOrdersInput } from "@dukkani/common/schemas/order/input";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useQueryStates } from "nuqs";
import { useMemo } from "react";
import { isOrpcNotFoundError } from "@/shared/api/error-handler";
import { appMutations } from "@/shared/api/mutations";
import { appQueries } from "@/shared/api/queries";
import { useFormatOrderRelativeDateTime } from "@/shared/lib/i18n/use-format-order-relative-datetime";
import { useActiveStoreStore } from "../store/active.store";
import { useOrderStore } from "./store";

/**
 * Order detail screen: oRPC query + `formattedCreatedAt` + status mutation.
 * After `order` is loaded, derive UI fields with `getOrderDetailView` from
 * `order.util.ts` (not returned here, to avoid placeholder values when loading).
 */
export function useOrderDetailPage(orderId: string | undefined) {
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
  const formattedCreatedAt = useFormatOrderRelativeDateTime(order?.createdAt);

  return {
    order,
    isLoading,
    isError,
    isNotFoundError,
    updateStatusMutation,
    formattedCreatedAt,
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
    governorates: parseGovernorates,
    page: parsePage,
    limit: parseLimit,
  });

  const resetFilters = () =>
    setFilters({
      search: "",
      status: null,
      governorates: null,
      page: 1,
      limit: 50,
    });

  const queryInput = useMemo<ListOrdersInput>(() => {
    const input: ListOrdersInput = {
      page: filters.page,
      limit: filters.limit,
      storeId: selectedStoreId ?? undefined,
    };
    if (filters.search) input.search = filters.search;
    if (filters.status) input.status = filters.status;
    if (filters.governorates && filters.governorates.length > 0) {
      input.governorates = filters.governorates;
    }
    return input;
  }, [selectedStoreId, filters]);

  const ordersQuery = useQuery(appQueries.order.all({ input: queryInput }));
  const governorateCountsQuery = useQuery(
    appQueries.order.governorateCounts({
      input: { storeId: selectedStoreId ?? undefined },
    }),
  );

  const createOrderMutation = useMutation(appMutations.order.create());
  const updateOrderStatusMutation = useMutation(
    appMutations.order.updateStatus(),
  );
  const deleteOrderMutation = useMutation(appMutations.order.delete());

  return {
    selectedStoreId,
    search: filters.search,
    status: filters.status,
    governorates: filters.governorates ?? [],
    page: filters.page,
    setSearch: (v: string) => {
      setFilters({ search: v, page: 1 });
    },
    setStatus: (v: typeof filters.status) => {
      setFilters({ status: v, page: 1 });
    },
    toggleGovernorate: (governorate: GovernorateInfer) => {
      const current = filters.governorates ?? [];
      const next = current.includes(governorate)
        ? current.filter((g) => g !== governorate)
        : [...current, governorate];
      setFilters({ governorates: next.length > 0 ? next : null, page: 1 });
    },
    setGovernorates: (v: GovernorateInfer[]) => {
      setFilters({ governorates: v.length > 0 ? v : null, page: 1 });
    },
    setPage: (v: number) => {
      setFilters({ page: v });
    },
    resetFilters,
    selectedOrderId,
    setSelectedOrderId,
    ordersQuery,
    governorateCountsQuery,
    createOrderMutation,
    updateOrderStatusMutation,
    deleteOrderMutation,
  };
}
