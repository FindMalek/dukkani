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
  serverExternalPackages: [
    "pino",
    "pino-pretty",
    "thread-stream",
    "sharp",
  ],
  // Force-include sharp's native libvips binary, dropped by output tracing
  // otherwise — same fix as apps/dashboard and apps/storefront. See #561/#570.
  outputFileTracingIncludes: {
    "/**/*": [
      "./node_modules/.pnpm/@img+sharp-linux-x64@*/node_modules/@img/sharp-linux-x64/**/*",
      "./node_modules/.pnpm/@img+sharp-libvips-linux-x64@*/node_modules/@img/sharp-libvips-linux-x64/**/*",
    ],
  },
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
