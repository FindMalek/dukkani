import { DefaultCurrency } from "@dukkani/i18n";
import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";
import { appQueries } from "@/shared/api/queries";
import { useActiveStoreStore } from "./active.store";

export function useCurrentStoreCurrency() {
  const selectedStoreId = useActiveStoreStore((state) => state.selectedStoreId);
  const storeId = selectedStoreId || undefined;
  const currentStoreQuery = useQuery({
    ...appQueries.store.byId({
      input: { id: storeId },
    }),
    enabled: Boolean(selectedStoreId),
  });

  return useMemo(() => {
    if (currentStoreQuery.isSuccess && currentStoreQuery.data) {
      return currentStoreQuery.data.currency;
    }
    return DefaultCurrency;
  }, [currentStoreQuery.data, currentStoreQuery.isSuccess]);
}
