import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	reactCompiler: true,
	transpilePackages: ["@dukkani/ui"],
	serverExternalPackages: ["@prisma/client"],
};

export default nextConfig;
