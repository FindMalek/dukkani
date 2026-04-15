import { defineConfig } from "i18next-cli";

export default defineConfig({
  locales: ["fr", "en"],
  extract: {
    input: ["../../apps/web/src/**/*.{ts,tsx}"],
    output: (language, namespace) => {
      if (namespace === "ui") {
        return `./src/ui/locales/${language}/ui.json`;
      }
      return `./src/apps/web/locales/${language}/${namespace}.json`;
    },
    defaultNS: "home",
  },
  types: {
    input: "./src/apps/web/locales/fr/*.json",
    output: "./src/apps/web/types.d.ts",
    enableSelector: false,
    resourcesFile: "./src/apps/web/resources.ts",
  },
});
