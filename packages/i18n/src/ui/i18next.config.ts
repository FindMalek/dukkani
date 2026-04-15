import { defineConfig } from "i18next-cli";

export default defineConfig({
  locales: ["fr", "en"],
  extract: {
    input: ["../ui/src/**/*.{ts,tsx}"],
    output: "./src/ui/locales/{{language}}/ui.json",
    defaultNS: "ui",
  },
  types: {
    input: "./src/ui/locales/fr/ui.json",
    output: "./src/ui/types.d.ts",
    enableSelector: false,
    resourcesFile: "./src/ui/resources.ts",
  },
});
