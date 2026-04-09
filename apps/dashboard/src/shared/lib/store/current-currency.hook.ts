import { store } from "@dukkani/common/schemas";
import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";
import { appQueries } from "@/shared/api/queries";
import { useActiveStoreStore } from "./active.store";

export function useCurrentStoreCurrency() {
  const selectedStoreId = useActiveStoreStore((state) => state.selectedStoreId);
  const storeId = selectedStoreId || undefined;
  const currentStoreQuery = useQuery(
    appQueries.store.byId({
      enabled: Boolean(selectedStoreId),
      input: { id: storeId },
    }),
  );

  return useMemo(() => {
    if (currentStoreQuery.isSuccess && currentStoreQuery.data) {
      return currentStoreQuery.data.currency;
    }
    return store.supportedCurrencyEnum.TND;
  }, [currentStoreQuery.data, currentStoreQuery.isSuccess]);
}
