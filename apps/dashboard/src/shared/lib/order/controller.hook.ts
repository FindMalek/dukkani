import {
  parseLimit,
  parseOrderStatus,
  parsePage,
  parseSearchQuery,
} from "@dukkani/common/lib";
import type { ListOrdersInput } from "@dukkani/common/schemas/order/input";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useQueryStates } from "nuqs";
import { useMemo } from "react";
import { appMutations } from "@/shared/api/mutations";
import { appQueries } from "@/shared/api/queries";
import { useActiveStoreStore } from "../store/active.store";
import { useOrderStore } from "./store";

/**
 * Controller hook that composes:
 * - Active store state (Zustand)
 * - Filter + pagination state (nuqs — URL-synced, shareable, bookmarkable)
 * - UI state — selection (Zustand)
 * - ORPC query hooks
 * - ORPC mutation hooks
 *
 * Provides a single interface for Orders pages.
 */
export function useOrdersController() {
  const { selectedStoreId } = useActiveStoreStore();
  const { selectedOrderId, setSelectedOrderId } = useOrderStore();

  // Filters and pagination live in the URL so they're shareable and
  // cleared automatically when the user navigates away.
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
    // Store context
    selectedStoreId,
    // URL filter state
    search: filters.search,
    status: filters.status,
    page: filters.page,
    // Filter setters — wrapped to return void (nuqs setters return Promise internally)
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
    // UI state
    selectedOrderId,
    setSelectedOrderId,
    // Query
    ordersQuery,
    // Mutations
    createOrderMutation,
    updateOrderStatusMutation,
    deleteOrderMutation,
  };
}
