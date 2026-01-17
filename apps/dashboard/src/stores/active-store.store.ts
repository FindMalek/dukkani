import { create } from "zustand";
import { persist } from "zustand/middleware";

interface ActiveStoreState {
	selectedStoreId: string | null;
	isSwitching: boolean;
	setSelectedStoreId: (storeId: string | null) => void;
	setIsSwitching: (isSwitching: boolean) => void;
}

export const useActiveStoreStore = create<ActiveStoreState>()(
	persist(
		(set) => ({
			selectedStoreId: null,
			isSwitching: false,
			setSelectedStoreId: (storeId) => set({ selectedStoreId: storeId }),
			setIsSwitching: (isSwitching) => set({ isSwitching }),
		}),
		{
			name: "active-store",
			partialize: (state) => ({
				selectedStoreId: state.selectedStoreId,
			}),
		},
	),
);
