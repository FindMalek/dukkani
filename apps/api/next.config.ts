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
  // @dukkani/storage's ImageProcessor does a top-level `import sharp from
  // "sharp"`, and it's pulled in by the oRPC routers this app serves
  // (dashboard.storage/product/bundle, storefront/dashboard health checks).
  // Because it's one shared serverless function bundle, ANY request routed
  // through here needs sharp's native libvips binary at runtime, even ones
  // that never touch image code. Output file tracing has a known gap with
  // pnpm's content-addressable store where that binary gets dropped from
  // the deployed function, crashing with ERR_DLOPEN_FAILED. Force-include
  // it — same fix as apps/dashboard and apps/storefront. See #561/#570.
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
