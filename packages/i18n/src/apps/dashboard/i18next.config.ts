import { defineConfig } from "i18next-cli";
import { SupportedLanguages } from "../../shared";
import { I18nextDashboardNamespaces } from "./instance";

export default defineConfig({
  locales: Object.values(SupportedLanguages),
  extract: {
    input: ["../../apps/dashboard/src/**/*.{ts,tsx}"],
    output: (language, namespace) => {
      if (namespace && !I18nextDashboardNamespaces.includes(namespace)) {
        return `./src/shared/locales/${language}/${namespace}.json`;
      }
      return `./src/apps/dashboard/locales/${language}/${namespace}.json`;
    },
    defaultNS: "pages",
  },
  types: {
    input: [
      "./src/apps/dashboard/locales/fr/*.json",
      "./src/shared/locales/fr/ui.json",
    ],
    output: "./src/apps/dashboard/types.d.ts",
    enableSelector: false,
    resourcesFile: "./src/apps/dashboard/resources.ts",
  },
});
