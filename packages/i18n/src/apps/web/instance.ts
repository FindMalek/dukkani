import type { I18nConfig } from "next-i18next";
import { DefaultLanguage, SupportedLanguages } from "../../shared";

const I18nextWebNamespaces = ["home"];

const I18nextWebConfig: I18nConfig = {
  supportedLngs: Object.values(SupportedLanguages),
  fallbackLng: DefaultLanguage,
  defaultNS: "home",
  ns: [...I18nextWebNamespaces, "ui"],
  resourceLoader: async (lng, ns) => {
    if (!I18nextWebNamespaces.includes(ns)) {
      const uiResources = (
        await import(`../../shared/locales/${lng}/${ns}.json`)
      ).default;
      return uiResources;
    }
    const resources = (await import(`./locales/${lng}/${ns}.json`)).default;
    return resources;
  },
};

export { I18nextWebConfig, I18nextWebNamespaces };
