import type { store } from "@dukkani/common/schemas";
import { useFormatter } from "next-intl";

export function useFormatPriceCurrentStore(
  currency: store.SupportedCurrencyInfer,
) {
  const formatter = useFormatter();

  return (value: number | bigint) =>
    formatter.number(value, { style: "currency", currency });
}
