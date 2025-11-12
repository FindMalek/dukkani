import { defineConfig } from "tsdown";

export default defineConfig({
	entry: ["src/**/*.{ts,tsx}"],
	sourcemap: true,
	dts: true,
	format: ["esm"],
});
