import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./src/lib/i18n.ts");

const nextConfig: NextConfig = {
	reactCompiler: true,
	transpilePackages: ["@dukkani/ui"],
	serverExternalPackages: ["@prisma/client"],
};

export default withNextIntl(nextConfig);