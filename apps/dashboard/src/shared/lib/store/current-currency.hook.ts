import { store } from "@dukkani/common/schemas";
import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";
import { appQueries } from "@/shared/api/queries";
import { useActiveStoreStore } from "./active.store";

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
