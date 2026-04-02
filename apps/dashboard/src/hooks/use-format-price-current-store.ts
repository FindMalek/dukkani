import { useFormatPriceCurrentStore as useFormatPriceForCurrency } from "@dukkani/ui/hooks/use-format-price";
import { useCurrentStoreCurrency } from "./use-current-store-currency";

export function useFormatPriceCurrentStore() {
  const currency = useCurrentStoreCurrency();
  return useFormatPriceForCurrency(currency);
}
