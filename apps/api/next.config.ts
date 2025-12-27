import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	typedRoutes: true,
	redirects: async () => {
		return [
			{
				source: "/",
				destination: "/api",
				permanent: true,
			},
		];
	},
};

export default nextConfig;