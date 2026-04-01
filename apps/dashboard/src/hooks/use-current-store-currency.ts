import { store } from "@dukkani/common/schemas";
import { useMemo } from "react";
import { useActiveStoreStore } from "@/stores";
import { useGetStoreByIdQuery } from "./api/use-stores.hook";

export function useCurrentStoreCurrency() {
  const selectedStoreId = useActiveStoreStore((state) => state.selectedStoreId);
  const currentStoreQuery = useGetStoreByIdQuery(selectedStoreId ?? undefined);

  return useMemo(() => {
    if (currentStoreQuery.isSuccess && currentStoreQuery.data) {
      return currentStoreQuery.data.currency;
    }
    return store.supportedCurrencyEnum.TND;
  }, [currentStoreQuery.data, currentStoreQuery.isSuccess]);
}
