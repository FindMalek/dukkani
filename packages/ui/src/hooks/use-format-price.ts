import { formatCurrencyFn, SupportedCurrency } from "@dukkani/i18n";
import { useT } from "next-i18next/client";

export function useFormatPriceCurrentStore(currency: SupportedCurrency) {
  const { i18n } = useT();
  return formatCurrencyFn(i18n.language, currency);
}
