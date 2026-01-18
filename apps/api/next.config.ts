import path from "node:path";
import { fileURLToPath } from "node:url";
import type { NextConfig } from "next";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const nextConfig: NextConfig = {
	envDir: path.resolve(__dirname, "../.."),
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
