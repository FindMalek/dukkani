import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./src/lib/i18n.ts");

const nextConfig: NextConfig = {
	reactCompiler: true,
	transpilePackages: ["@dukkani/ui"],
	serverExternalPackages: [
		"@prisma/client",
		"pino",
		"pino-pretty",
		"thread-stream",
	],
	images: {
		remotePatterns: [
			{
				hostname: "images.unsplash.com",
				pathname: "/**",
			},
			{
				protocol: "http",
				hostname: "localhost",
				port: "9000",
				pathname: "/**",
			},
			{
				hostname: "*.r2.dev",
				pathname: "/**",
			},
		],
	},
};

export default withNextIntl(nextConfig);
