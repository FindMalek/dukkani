import { useFormatPriceCurrentStore } from "@dukkani/ui/hooks/use-format-price";
import { useCurrentStoreCurrency } from "./current-currency.hook";

export function useFormatPriceForActiveStore() {
  const currency = useCurrentStoreCurrency();
  return useFormatPriceCurrentStore(currency);
}
