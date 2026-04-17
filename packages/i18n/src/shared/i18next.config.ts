import { defineConfig } from "i18next-cli";
import { SupportedLanguages } from "./lib/language";

export default defineConfig({
  locales: Object.values(SupportedLanguages),
  extract: {
    input: ["../ui/src/**/*.{ts,tsx}"],
    output: "./src/shared/locales/{{language}}/{{namespace}}.json",
    defaultNS: false,
  },
  types: {
    input: "./src/shared/locales/fr/*.json",
    output: "./src/shared/types.d.ts",
    enableSelector: false,
    resourcesFile: "./src/shared/resources.ts",
  },
});
