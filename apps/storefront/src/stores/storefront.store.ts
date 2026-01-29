import { create } from "zustand";

interface StorefrontStoreState {
	storeId: string | null;
	storeSlug: string | null;
	setStore: (store: { id: string; slug: string }) => void;
}

export const useStorefrontStore = create<StorefrontStoreState>()((set) => ({
	storeId: null,
	storeSlug: null,
	setStore: (store) => set({ storeId: store.id, storeSlug: store.slug }),
}));
