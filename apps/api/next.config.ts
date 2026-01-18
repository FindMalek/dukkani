import path from "node:path";
import { config } from "dotenv";
import type { NextConfig } from "next";

// Load root .env file before Next.js config
// This only runs in Node.js context (not Edge Runtime)
if (!process.env.VERCEL) {
	config({ path: path.resolve(__dirname, "../../.env") });
}

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
