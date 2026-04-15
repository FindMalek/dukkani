import { SupportedLanguage } from "./language";

export const SupportedCurrencies = {
  TND: "TND",
  USD: "USD",
  EUR: "EUR",
  GBP: "GBP",
  DZD: "DZD",
  LYB: "LYB",
} as const;

export type SupportedCurrency =
  (typeof SupportedCurrencies)[keyof typeof SupportedCurrencies];

export const DefaultCurrency = SupportedCurrencies.TND;

export function formatCurrencyFn(
  language: SupportedLanguage,
  currency: SupportedCurrency,
) {
  return new Intl.NumberFormat(language, {
    style: "currency",
    currency: currency,
  }).format;
}
