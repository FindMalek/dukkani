import { useFormatter } from "next-intl";
import { useCurrentStoreCurrency } from "./use-current-store-currency";

export function useFormatPriceCurrentStore() {
  const { number } = useFormatter();
  const currentStoreCurrency = useCurrentStoreCurrency();

  function formatPrice(price: number) {
    return number(price, { style: "currency", currency: currentStoreCurrency });
  }

  return formatPrice;
}
