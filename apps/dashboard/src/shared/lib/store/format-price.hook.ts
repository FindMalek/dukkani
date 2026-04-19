"use client";

import { formatPriceFn } from "@dukkani/i18n";
import { useT } from "next-i18next/client";
import { useCurrentStoreCurrency } from "./current-currency.hook";

export function useFormatPriceForActiveStore() {
  const currency = useCurrentStoreCurrency();
  const { i18n } = useT();
  return formatPriceFn(i18n.language, currency);
}
