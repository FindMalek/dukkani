import { create } from "zustand";
import { persist } from "zustand/middleware";

type ViewMode = "table" | "grid";

interface ProductStoreState {
  // UI-only state — not filters (those live in URL via nuqs)
  selectedProductId: string | null;
  viewMode: ViewMode;
  // Actions
  setSelectedProductId: (id: string | null) => void;
  setViewMode: (mode: ViewMode) => void;
}

export const useProductStore = create<ProductStoreState>()(
  persist(
    (set) => ({
      selectedProductId: null,
      viewMode: "table",
      setSelectedProductId: (id) => set({ selectedProductId: id }),
      setViewMode: (mode) => set({ viewMode: mode }),
    }),
    {
      name: "product-store",
      // Only persist view preference, not transient selection
      partialize: (state) => ({ viewMode: state.viewMode }),
    },
  ),
);
