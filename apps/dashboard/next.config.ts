import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	typedRoutes: true,
	reactCompiler: true,
	transpilePackages: ["@dukkani/ui"],
	serverExternalPackages: ["@prisma/client"],
	redirects: async () => {
		return [
			{
				source: "/",
				destination: "/dashboard",
				permanent: true,
			},
		];
	},
};

export default nextConfig;
