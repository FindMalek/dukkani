import "server-only";

const dictionaries = {
	en: () => import("@/locale/en.json").then((module) => module.default),
	fr: () => import("@/locale/fr.json").then((module) => module.default),
};

export type Locale = keyof typeof dictionaries;

export const getDictionary = async (locale: Locale) => {
	return dictionaries[locale]?.() ?? dictionaries.en();
};

export const locales = Object.keys(dictionaries) as Locale[];
export const defaultLocale: Locale = "en";
