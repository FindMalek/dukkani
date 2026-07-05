import {
  parseCustomerSort,
  parseGovernorates,
  parseLimit,
  parsePage,
  parseSearchQuery,
} from "@dukkani/common/lib";
import type { ListCustomersWithStatsInput } from "@dukkani/common/schemas/customer/input";
import type { GovernorateInfer } from "@dukkani/common/schemas/enums";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useQueryStates } from "nuqs";
import { useMemo } from "react";
import { isOrpcNotFoundError } from "@/shared/api/error-handler";
import { appMutations } from "@/shared/api/mutations";
import { appQueries } from "@/shared/api/queries";
import { useActiveStoreStore } from "../store/active.store";
import { useSelectionMode } from "./selection-mode.hook";

/**
 * Customer detail screen: oRPC query only. `CustomerIncludeOutput` already
 * carries derived stats (orderCount/totalSpent/avgOrderValue/lastOrderAt)
 * and addresses/orders — computed server-side in CustomerEntity.getRo, no
 * client-side derivation needed.
 */
export function useCustomerDetailPage(customerId: string | undefined) {
  const {
    data: customer,
    isLoading,
    isError,
    error,
  } = useQuery({
    ...appQueries.customer.byId({ input: { id: customerId ?? "" } }),
    enabled: !!customerId,
  });
  const isNotFoundError = isError && isOrpcNotFoundError(error);
  const deleteCustomerMutation = useMutation(appMutations.customer.delete());

  return {
    customer,
    isLoading,
    isError,
    isNotFoundError,
    deleteCustomerMutation,
  };
}

/**
 * Controller hook that composes:
 * - Active store state (Zustand)
 * - Filter + pagination state (nuqs — URL-synced, shareable, bookmarkable)
 * - Bulk-selection UI state (local, see useSelectionMode)
 * - ORPC query hooks (list with stats, governorate chip counts)
 * - ORPC mutation hooks
 *
 * Provides a single interface for the customers list page.
 */
export function useCustomersController() {
  const { selectedStoreId } = useActiveStoreStore();
  const selection = useSelectionMode();

  const [filters, setFilters] = useQueryStates({
    search: parseSearchQuery.withDefault(""),
    governorates: parseGovernorates,
    sortBy: parseCustomerSort,
    page: parsePage,
    limit: parseLimit,
  });

  const resetFilters = () =>
    setFilters({ search: "", governorates: null, sortBy: "recent", page: 1 });

  const queryInput = useMemo<ListCustomersWithStatsInput>(() => {
    const input: ListCustomersWithStatsInput = {
      page: filters.page,
      limit: filters.limit,
      sortBy: filters.sortBy,
      storeId: selectedStoreId ?? undefined,
    };
    if (filters.search) input.search = filters.search;
    if (filters.governorates && filters.governorates.length > 0) {
      input.governorates = filters.governorates;
    }
    return input;
  }, [selectedStoreId, filters]);

  const customersQuery = useQuery(
    appQueries.customer.all({ input: queryInput }),
  );
  const governorateCountsQuery = useQuery(
    appQueries.customer.governorateCounts({
      input: { storeId: selectedStoreId ?? undefined },
    }),
  );

  const createCustomerMutation = useMutation(appMutations.customer.create());
  const deleteCustomerMutation = useMutation(appMutations.customer.delete());

  return {
    selectedStoreId,
    search: filters.search,
    governorates: filters.governorates ?? [],
    sortBy: filters.sortBy,
    page: filters.page,
    setSearch: (v: string) => {
      setFilters({ search: v, page: 1 });
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
    setSortBy: (v: typeof filters.sortBy) => {
      setFilters({ sortBy: v, page: 1 });
    },
    setPage: (v: number) => {
      setFilters({ page: v });
    },
    resetFilters,
    selection,
    customersQuery,
    governorateCountsQuery,
    createCustomerMutation,
    deleteCustomerMutation,
  };
}
