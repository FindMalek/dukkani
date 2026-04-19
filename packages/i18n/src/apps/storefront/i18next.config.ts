import { defineConfig } from "i18next-cli";
import { SupportedLanguages } from "../../shared";
import { I18nextStorefrontNamespaces } from "./instance";

export default defineConfig({
  locales: Object.values(SupportedLanguages),
  extract: {
    input: ["../../apps/storefront/src/**/*.{ts,tsx}"],
    output: (language, namespace) => {
      if (namespace && !I18nextStorefrontNamespaces.includes(namespace)) {
        return `./src/shared/locales/${language}/${namespace}.json`;
      }
      return `./src/apps/storefront/locales/${language}/${namespace}.json`;
    },
    defaultNS: "pages",
  },
  types: {
    input: ["./src/apps/storefront/locales/fr/*.json"],
    output: "./src/apps/storefront/types.d.ts",
    enableSelector: false,
    resourcesFile: "./src/apps/storefront/resources.ts",
  },
});
