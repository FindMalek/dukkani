import type { I18nConfig } from "next-i18next";
import { DefaultLanguage, SupportedLanguages } from "../../shared/language";

const I18nextWebConfig: I18nConfig = {
  supportedLngs: Object.values(SupportedLanguages),
  fallbackLng: DefaultLanguage,
  defaultNS: "home",
  ns: ["home", "ui"],
  resourceLoader: async (lng, ns) => {
    if (ns === "ui") {
      const uiResources = (await import(`../../ui/locales/${lng}/ui.json`))
        .default;
      return uiResources;
    }
    const resources = (await import(`./locales/${lng}/${ns}.json`)).default;
    return resources;
  },
};

export { I18nextWebConfig };
