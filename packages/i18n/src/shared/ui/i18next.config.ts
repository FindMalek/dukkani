import { defineConfig } from "i18next-cli";
import { SupportedLanguages } from "../lib/language";

export default defineConfig({
  locales: Object.values(SupportedLanguages),
  extract: {
    input: ["../ui/src/**/*.{ts,tsx}"],
    output: "./src/shared/locales/{{language}}/{{namespace}}.json",
    defaultNS: "ui",
  },
  types: {
    input: "./src/shared/locales/fr/ui.json",
    output: "./src/shared/ui/types.d.ts",
    enableSelector: false,
    resourcesFile: "./src/shared/ui/resources.ts",
  },
});
