import { create } from "zustand";
import { persist } from "zustand/middleware";

interface FilterStoreState {
	selectedCategoryId: string | null;
	searchQuery: string;
	setSelectedCategoryId: (categoryId: string | null) => void;
	setSearchQuery: (query: string) => void;
	resetFilters: () => void;
}

export const useFilterStore = create<FilterStoreState>()(
	persist(
		(set) => ({
			selectedCategoryId: null,
			searchQuery: "",
			setSelectedCategoryId: (categoryId) =>
				set({ selectedCategoryId: categoryId }),
			setSearchQuery: (query) => set({ searchQuery: query }),
			resetFilters: () =>
				set({
					selectedCategoryId: null,
					searchQuery: "",
				}),
		}),
		{
			name: "storefront-filters",
		},
	),
);
