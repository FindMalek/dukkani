import { SupportedCurrency } from "@dukkani/i18n";
import { useFormatter } from "next-intl";

export function useFormatPriceCurrentStore(currency: SupportedCurrency) {
  const formatter = useFormatter();

  return (value: number | bigint) =>
    formatter.number(value, { style: "currency", currency });
}
