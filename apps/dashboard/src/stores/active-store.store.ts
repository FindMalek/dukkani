import { create } from "zustand";
import { persist } from "zustand/middleware";

interface ActiveStoreState {
	selectedStoreId: string | null;
	isSwitching: boolean;
	isLoading: boolean;
	setSelectedStoreId: (storeId: string | null) => void;
	setIsSwitching: (isSwitching: boolean) => void;
	setIsLoading: (isLoading: boolean) => void;
}

const getInitialState = (persistedState: Partial<ActiveStoreState> | null) => ({
	selectedStoreId: persistedState?.selectedStoreId ?? null,
	isSwitching: false,
	isLoading: !persistedState?.selectedStoreId,
});

export const useActiveStoreStore = create<ActiveStoreState>()(
	persist(
		(set) => ({
			...getInitialState(null),
			setSelectedStoreId: (storeId) => set({ selectedStoreId: storeId }),
			setIsSwitching: (isSwitching) => set({ isSwitching }),
			setIsLoading: (isLoading) => set({ isLoading }),
		}),
		{
			name: "active-store",
			partialize: (state) => ({
				selectedStoreId: state.selectedStoreId,
			}),
			onRehydrateStorage: () => (state) => {
				if (state) {
					state.isLoading = !state.selectedStoreId;
				}
			},
		},
	),
);
