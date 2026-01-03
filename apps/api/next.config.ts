import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	typedRoutes: true,
	serverExternalPackages: ["pino", "pino-pretty", "thread-stream"],
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
