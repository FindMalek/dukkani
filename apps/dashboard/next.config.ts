import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./src/lib/i18n.ts");

const nextConfig: NextConfig = {
	typedRoutes: true,
	reactCompiler: true,
	transpilePackages: ["@dukkani/ui"],
	serverExternalPackages: ["@prisma/client"],
	redirects: async () => {
		return [
			{
				source: "/",
				// TODO: Change to default locale
				destination: "/en/dashboard",
				permanent: true,
			},
		];
	},
};

export default withNextIntl(nextConfig);
