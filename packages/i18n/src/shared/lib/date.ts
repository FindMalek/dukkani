import type { SupportedLanguage } from "./language";

export const DateTimeFormattingOptions = {
  date: {
    short: { dateStyle: "short" } satisfies Intl.DateTimeFormatOptions,
    medium: { dateStyle: "medium" } satisfies Intl.DateTimeFormatOptions,
    long: { dateStyle: "long" } satisfies Intl.DateTimeFormatOptions,
  },
  time: {
    short: { timeStyle: "short" } satisfies Intl.DateTimeFormatOptions,
    medium: { timeStyle: "medium" } satisfies Intl.DateTimeFormatOptions,
  },
  dateTime: {
    short: {
      dateStyle: "short",
      timeStyle: "short",
    } satisfies Intl.DateTimeFormatOptions,
    medium: {
      dateStyle: "medium",
      timeStyle: "short",
    } satisfies Intl.DateTimeFormatOptions,
    long: {
      dateStyle: "long",
      timeStyle: "short",
    } satisfies Intl.DateTimeFormatOptions,
  },
} as const;

export function formatDateFn(
  language: SupportedLanguage,
  options: Intl.DateTimeFormatOptions = DateTimeFormattingOptions.dateTime.long,
) {
  return Intl.DateTimeFormat(language, options).format;
}
