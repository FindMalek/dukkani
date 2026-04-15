import { I18nConfig } from "next-i18next";
import { DefaultLanguage, SupportedLanguages } from "../shared/language";

const I18nextUIConfig: I18nConfig = {
  supportedLngs: Object.values(SupportedLanguages),
  fallbackLng: DefaultLanguage,
  defaultNS: "ui",
  resourceLoader: async (lng, ns) => {
    const resources = await import(`./locales/${lng}/${ns}.json`);

    return resources;
  },
};

export { I18nextUIConfig };
