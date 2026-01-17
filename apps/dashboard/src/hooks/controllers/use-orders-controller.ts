import type { ListOrdersInput } from "@dukkani/common/schemas/order/input";
import { useMemo } from "react";
import {
	useCreateOrderMutation,
	useDeleteOrderMutation,
	useOrdersQuery,
	useUpdateOrderStatusMutation,
} from "@/hooks/api/use-orders.hook";
import { useActiveStoreStore } from "@/stores/active-store.store";
import { useOrderStore } from "@/stores/order.store";

/**
 * Controller hook that composes:
 * - Active store state
 * - Order store state (filters, pagination, selection)
 * - ORPC query hooks
 * - ORPC mutation hooks
 *
 * Provides a single interface for Orders pages
 */
export function useOrdersController() {
	const { selectedStoreId } = useActiveStoreStore();
	const {
		search,
		status,
		dateRange,
		page,
		limit,
		selectedOrderId,
		setSearch,
		setStatus,
		setDateRange,
		setPage,
		setLimit,
		setSelectedOrderId,
		resetFilters,
	} = useOrderStore();

	// Build query input from store state
	const queryInput = useMemo<ListOrdersInput>(() => {
		const input: ListOrdersInput = {
			page,
			limit,
			storeId: selectedStoreId ?? undefined,
		};

		if (search) input.search = search;
		if (status) input.status = status;
		// Note: dateRange filtering would need to be implemented on the backend
		// For now, we'll just pass the storeId

		return input;
	}, [selectedStoreId, search, status, page, limit]);

	// Query orders
	const ordersQuery = useOrdersQuery(queryInput);

	// Mutations
	const createOrderMutation = useCreateOrderMutation();
	const updateOrderStatusMutation = useUpdateOrderStatusMutation();
	const deleteOrderMutation = useDeleteOrderMutation();

	return {
		// Store state
		selectedStoreId,
		search,
		status,
		dateRange,
		page,
		limit,
		selectedOrderId,
		// Store actions
		setSearch,
		setStatus,
		setDateRange,
		setPage,
		setLimit,
		setSelectedOrderId,
		resetFilters,
		// Query
		ordersQuery,
		// Mutations
		createOrderMutation,
		updateOrderStatusMutation,
		deleteOrderMutation,
	};
}
