"use client";

import { store } from "@dukkani/common/schemas";
import { useFormatPriceCurrentStore as useFormatPriceForCurrency } from "@dukkani/ui/hooks/use-format-price";
import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { appQueries } from "@/shared/api/queries";

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

export function useCurrentStoreCurrency() {
  const selectedStoreId = useActiveStoreStore((state) => state.selectedStoreId);
  const currentStoreQuery = useQuery(
    appQueries.store.byId({
      enabled: selectedStoreId !== null,
      input: { id: selectedStoreId || undefined },
    }),
  );

  return useMemo(() => {
    if (currentStoreQuery.isSuccess && currentStoreQuery.data) {
      return currentStoreQuery.data.currency;
    }
    return store.supportedCurrencyEnum.TND;
  }, [currentStoreQuery.data, currentStoreQuery.isSuccess]);
}

export function useFormatPriceForActiveStore() {
  const currency = useCurrentStoreCurrency();
  return useFormatPriceForCurrency(currency);
}
