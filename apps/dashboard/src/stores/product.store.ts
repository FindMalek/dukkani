import { create } from "zustand";
import { persist } from "zustand/middleware";

type StockFilter = "all" | "in-stock" | "low-stock" | "out-of-stock";
type ViewMode = "table" | "grid";

interface ProductStoreState {
	// Filters
	search: string;
	categoryId: string | null;
	published: boolean | null;
	stockFilter: StockFilter;
	// Pagination
	page: number;
	limit: number;
	// Selection
	selectedProductId: string | null;
	// View mode
	viewMode: ViewMode;
	// Actions
	setSearch: (search: string) => void;
	setCategoryId: (categoryId: string | null) => void;
	setPublished: (published: boolean | null) => void;
	setStockFilter: (filter: StockFilter) => void;
	setPage: (page: number) => void;
	setLimit: (limit: number) => void;
	setSelectedProductId: (id: string | null) => void;
	setViewMode: (mode: ViewMode) => void;
	resetFilters: () => void;
}

const initialState = {
	search: "",
	categoryId: null,
	published: null,
	stockFilter: "all" as StockFilter,
	page: 1,
	limit: 50,
	selectedProductId: null,
	viewMode: "table" as ViewMode,
};

export const useProductStore = create<ProductStoreState>()(
	persist(
		(set) => ({
			...initialState,
			setSearch: (search) => set({ search, page: 1 }),
			setCategoryId: (categoryId) => set({ categoryId, page: 1 }),
			setPublished: (published) => set({ published, page: 1 }),
			setStockFilter: (filter) => set({ stockFilter: filter, page: 1 }),
			setPage: (page) => set({ page }),
			setLimit: (limit) => set({ limit, page: 1 }),
			setSelectedProductId: (id) => set({ selectedProductId: id }),
			setViewMode: (mode) => set({ viewMode: mode }),
			resetFilters: () =>
				set({
					search: initialState.search,
					categoryId: initialState.categoryId,
					published: initialState.published,
					stockFilter: initialState.stockFilter,
					page: initialState.page,
				}),
		}),
		{
			name: "product-store",
			partialize: (state) => ({
				search: state.search,
				categoryId: state.categoryId,
				published: state.published,
				stockFilter: state.stockFilter,
				viewMode: state.viewMode,
			}),
		},
	),
);
