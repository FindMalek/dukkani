import path from "node:path";
import { config } from "dotenv";
import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

// Load root .env file before Next.js config
// This only runs in Node.js context (not Edge Runtime)
if (!process.env.VERCEL) {
	config({ path: path.resolve(__dirname, "../../.env") });
}

const withNextIntl = createNextIntlPlugin("./src/lib/i18n.ts");

const nextConfig: NextConfig = {
	reactCompiler: true,
	transpilePackages: ["@dukkani/ui"],
	serverExternalPackages: [
		"@prisma/client",
		"pino",
		"pino-pretty",
		"thread-stream",
	],
};

export default withNextIntl(nextConfig);
