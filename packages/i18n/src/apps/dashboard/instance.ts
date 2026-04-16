import type { I18nConfig } from "next-i18next";
import { DefaultLanguage, SupportedLanguages } from "../../shared";

const I18nextDashboardNamespaces = ["pages"];

const I18nextDashboardConfig: I18nConfig = {
  supportedLngs: Object.values(SupportedLanguages),
  fallbackLng: DefaultLanguage,
  defaultNS: "pages",
  ns: [...I18nextDashboardNamespaces, "ui"],
  resourceLoader: async (lng, ns) => {
    if (!I18nextDashboardNamespaces.includes(ns)) {
      const uiResources = (
        await import(`../../shared/locales/${lng}/${ns}.json`)
      ).default;
      return uiResources;
    }
    const resources = (await import(`./locales/${lng}/${ns}.json`)).default;
    return resources;
  },
};

export { I18nextDashboardConfig, I18nextDashboardNamespaces };
