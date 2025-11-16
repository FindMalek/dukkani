import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	typedRoutes: true,
	reactCompiler: true,
	transpilePackages: ["@dukkani/ui"],
	serverExternalPackages: ["@prisma/client"],
};

export default nextConfig;
