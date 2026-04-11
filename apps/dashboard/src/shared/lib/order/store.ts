import { create } from "zustand";

interface OrderStoreState {
  // UI-only state — not filters (those live in URL via nuqs)
  selectedOrderId: string | null;
  // Actions
  setSelectedOrderId: (id: string | null) => void;
}

export const useOrderStore = create<OrderStoreState>()((set) => ({
  selectedOrderId: null,
  setSelectedOrderId: (id) => set({ selectedOrderId: id }),
}));
