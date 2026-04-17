import { formatPriceFn, SupportedCurrency } from "@dukkani/i18n";
import { useT } from "next-i18next/client";

export function useFormatPriceCurrentStore(currency: SupportedCurrency) {
  const { i18n } = useT();
  return formatPriceFn(i18n.language, currency);
}
