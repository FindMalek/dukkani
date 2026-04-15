import { defineConfig } from "i18next-cli";
import { SupportedLanguages } from "../../shared";
import { I18nextWebNamespaces } from "./instance";

export default defineConfig({
  locales: Object.values(SupportedLanguages),
  extract: {
    input: ["../../apps/web/src/**/*.{ts,tsx}"],
    output: (language, namespace) => {
      if (namespace && !I18nextWebNamespaces.includes(namespace)) {
        return `./src/shared/locales/${language}/ui.json`;
      }
      return `./src/apps/web/locales/${language}/${namespace}.json`;
    },
    defaultNS: "home",
  },
  types: {
    input: [
      "./src/apps/web/locales/fr/*.json",
      "./src/shared/locales/fr/ui.json",
    ],
    output: "./src/apps/web/types.d.ts",
    enableSelector: false,
    resourcesFile: "./src/apps/web/resources.ts",
  },
});
