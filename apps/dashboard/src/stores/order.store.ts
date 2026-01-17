import type { OrderStatus } from "@dukkani/common/schemas/order/enums";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface DateRange {
	from: Date | null;
	to: Date | null;
}

interface OrderStoreState {
	// Filters
	search: string;
	status: OrderStatus | null;
	dateRange: DateRange;
	// Pagination
	page: number;
	limit: number;
	// Selection
	selectedOrderId: string | null;
	// Actions
	setSearch: (search: string) => void;
	setStatus: (status: OrderStatus | null) => void;
	setDateRange: (range: DateRange) => void;
	setPage: (page: number) => void;
	setLimit: (limit: number) => void;
	setSelectedOrderId: (id: string | null) => void;
	resetFilters: () => void;
}

const initialState = {
	search: "",
	status: null,
	dateRange: { from: null, to: null },
	page: 1,
	limit: 50,
	selectedOrderId: null,
};

export const useOrderStore = create<OrderStoreState>()(
	persist(
		(set) => ({
			...initialState,
			setSearch: (search) => set({ search, page: 1 }),
			setStatus: (status) => set({ status, page: 1 }),
			setDateRange: (range) => set({ dateRange: range, page: 1 }),
			setPage: (page) => set({ page }),
			setLimit: (limit) => set({ limit, page: 1 }),
			setSelectedOrderId: (id) => set({ selectedOrderId: id }),
			resetFilters: () =>
				set({
					search: initialState.search,
					status: initialState.status,
					dateRange: initialState.dateRange,
					page: initialState.page,
				}),
		}),
		{
			name: "order-store",
			partialize: (state) => ({
				search: state.search,
				status: state.status,
			}),
		},
	),
);
