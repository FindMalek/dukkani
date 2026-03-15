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
				hostname: "assets.dukkani.co",
				pathname: "/**",
			},
			{
				hostname: "assets.preview.dukkani.co",
				pathname: "/**",
			},
		],
	},
};

export default withNextIntl(nextConfig);
