"use client";

import { formatCurrencyFn } from "@dukkani/i18n";
import { useT } from "next-i18next/client";
import { useCurrentStoreCurrency } from "./current-currency.hook";

export function useFormatPriceForActiveStore() {
  const currency = useCurrentStoreCurrency();
  const { i18n } = useT();
  return formatCurrencyFn(i18n.language, currency);
}
