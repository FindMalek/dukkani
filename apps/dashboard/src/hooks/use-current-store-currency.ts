import { store } from "@dukkani/common/schemas";
import { useActiveStoreStore } from "@/stores";
import { useGetStoreByIdQuery } from "./api/use-stores.hook";

export function useCurrentStoreCurrency() {
  const selectedStoreId = useActiveStoreStore((state) => state.selectedStoreId);
  const currentStoreQuery = useGetStoreByIdQuery(selectedStoreId!);
  const currency =
    currentStoreQuery.data?.currency || store.supportedCurrencyEnum.TND;

  return currency;
}
