import { getApiUrl } from "@dukkani/env/get-api-url";
import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const apiUrl = getApiUrl(process.env.NEXT_PUBLIC_API_URL ?? "");

if (!apiUrl) {
  throw new Error(
    "NEXT_PUBLIC_API_URL could not be resolved. Set it explicitly or ensure Vercel related-projects is configured.",
  );
}

process.env.NEXT_PUBLIC_API_URL = apiUrl;

const withNextIntl = createNextIntlPlugin("./src/shared/config/i18n.ts");

const nextConfig: NextConfig = {
  reactCompiler: true,
  transpilePackages: ["@dukkani/ui", "@dukkani/env"],
  serverExternalPackages: [
    "@prisma/client",
    "pino",
    "pino-pretty",
    "thread-stream",
    "sharp",
  ],
  // Next's built-in image optimizer dlopen's sharp's native libvips binary
  // lazily, from a chunk shared across routes — output file tracing has a
  // known gap with pnpm's content-addressable store where that binary gets
  // dropped from the deployed serverless function, crashing unrelated
  // routes with ERR_DLOPEN_FAILED on first touch. Force-include it. See #561.
  outputFileTracingIncludes: {
    "/**/*": [
      "./node_modules/.pnpm/@img+sharp-linux-x64@*/node_modules/@img/sharp-linux-x64/**/*",
      "./node_modules/.pnpm/@img+sharp-libvips-linux-x64@*/node_modules/@img/sharp-libvips-linux-x64/**/*",
    ],
  },
  env: {
    NEXT_PUBLIC_API_URL: apiUrl,
  },
  images: {
    dangerouslyAllowLocalIP: true,
    // Scoped to what the storefront actually renders (cart thumb, product
    // grid at 50vw, full-bleed hero/carousel at 100vw) instead of Next's
    // full default range, so the optimizer isn't decoding/encoding variants
    // no layout ever requests. Keeps 2048/3840 so full-width (sizes="100vw")
    // hero/carousel images still get crisp 2x candidates on wide retina
    // screens instead of upscaling a capped 1920px source.
    deviceSizes: [384, 640, 828, 1080, 1440, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 80, 96, 128, 256],
    remotePatterns: [
      {
        hostname: "images.unsplash.com",
        pathname: "/**",
      },
      {
        protocol: "http",
        hostname: "localhost",
        port: "9000",
        pathname: "/**",
      },
      {
        hostname: "assets.dukkani.co",
        pathname: "/**",
      },
      {
        hostname: "assets.preview.dukkani.co",
        pathname: "/**",
      },
      {
        hostname: "flagcdn.com",
        pathname: "/**",
      },
    ],
  },
};

export default withNextIntl(nextConfig);
