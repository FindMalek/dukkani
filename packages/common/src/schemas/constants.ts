/**
 * Image variant sizes configuration
 * Used for generating multiple size variants of uploaded images
 */
export const VARIANT_SIZES = {
	THUMBNAIL: { width: 150, height: 150 },
	SMALL: { width: 400, height: 400 },
	MEDIUM: { width: 800, height: 800 },
	LARGE: { width: 1200, height: 1200 },
} as const;

export type VariantSize = (typeof VARIANT_SIZES)[keyof typeof VARIANT_SIZES];

/**
 * RTL locales - future-proof for Arabic, Hebrew, Persian, etc.
 */
export const RTL_LOCALES = ["ar"] as const;
export type RtlLocale = (typeof RTL_LOCALES)[number];

/**
 * Supported locales configuration
 * Used for internationalization of the application
 */
export const LOCALES = ["en", "fr", "ar"] as const;
export type Locale = (typeof LOCALES)[number];
export const DEFAULT_LOCALE: Locale = "en";
export const LOCALES_MAP = {
	en: "English",
	fr: "French",
	ar: "العربية",
} as const;
export type LocaleMap = (typeof LOCALES_MAP)[keyof typeof LOCALES_MAP];

export function isRtlLocale(locale: string): boolean {
	return RTL_LOCALES.includes(locale as RtlLocale);
}

export function getTextDirection(locale: string): "ltr" | "rtl" {
	return isRtlLocale(locale) ? "rtl" : "ltr";
}

export const LOCALE_FLAGS: Record<Locale, string> = {
	en: "🇬🇧",
	fr: "🇫🇷",
	ar: "🇸🇦",
};
