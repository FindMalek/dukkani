import { I18nConfig } from "next-i18next";

const I18nextUIConfig: I18nConfig = {
  supportedLngs: ["fr", "en"],
  fallbackLng: "fr",
  defaultNS: "ui",
  resourceLoader: async (lng, ns) => {
    const resources = await import(`./locales/${lng}/${ns}.json`);

    return resources;
  },
};

export { I18nextUIConfig };
