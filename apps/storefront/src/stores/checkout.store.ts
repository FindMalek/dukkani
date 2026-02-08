import { create } from "zustand";

interface CheckoutStoreState {
	isSummaryMinimal: boolean;
	setSummaryMinimal: (value: boolean) => void;
}

export const useCheckoutStore = create<CheckoutStoreState>()((set) => ({
	isSummaryMinimal: false,
	setSummaryMinimal: (value) => set({ isSummaryMinimal: value }),
}));
