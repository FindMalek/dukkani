import { defineConfig } from "tsdown";

export default defineConfig({
  entry: ["src/index.ts", "src/cli/index.ts", "src/env/index.ts"],
  format: ["esm"],
  dts: true,
  clean: true,
});
