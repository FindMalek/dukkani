import type { NextConfig } from "next";
import "./src/env";

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
