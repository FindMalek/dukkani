import { getApiUrl } from "@dukkani/env/get-api-url";
import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./src/lib/i18n.ts");

const nextConfig: NextConfig = {
	reactCompiler: true,
	transpilePackages: ["@dukkani/ui", "@dukkani/env"],
	serverExternalPackages: [
		"@prisma/client",
		"pino",
		"pino-pretty",
		"thread-stream",
	],
	env: {
		NEXT_PUBLIC_API_URL: getApiUrl(process.env.NEXT_PUBLIC_API_URL ?? ""),
	},
};

export default withNextIntl(nextConfig);