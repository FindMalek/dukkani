import path from "node:path";
import { fileURLToPath } from "node:url";
import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./src/lib/i18n.ts");
const __dirname = path.dirname(fileURLToPath(import.meta.url));

const nextConfig: NextConfig = {
	envDir: path.resolve(__dirname, "../.."),
	reactCompiler: true,
	transpilePackages: ["@dukkani/ui"],
	serverExternalPackages: [
		"@prisma/client",
		"pino",
		"pino-pretty",
		"thread-stream",
	],
};

export default withNextIntl(nextConfig);
