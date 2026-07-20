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
    "@dukkani/db",
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
    // Vercel doesn't auto-expose VERCEL_ENV to the client, and vercel.json's
    // `env` block can't do shell-style `$VERCEL_ENV` expansion — this is the
    // documented way to bridge a server-only var to the client bundle.
    NEXT_PUBLIC_VERCEL_ENV: process.env.VERCEL_ENV,
  },
  // Proxy the whole API surface through the dashboard's own origin so the
  // browser only ever talks to one domain. Without this, the session cookie
  // the API sets is only shareable with the dashboard via a cookie `Domain`
  // spanning both hosts' shared apex — which doesn't exist on preview
  // (each app gets its own sibling *.vercel.app alias, not a subdomain of a
  // common apex), so the cookie never reaches the dashboard's own requests
  // and every load bounces back to /login. Proxying makes the cookie
  // first-party to the dashboard in every environment. See #572.
  rewrites: async () => [
    {
      source: "/api/:path*",
      destination: `${apiUrl}/api/:path*`,
    },
  ],
  images: {
    dangerouslyAllowLocalIP: true,
    remotePatterns: [
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
      {
        hostname: "images.unsplash.com",
        pathname: "/**",
      },
    ],
  },
};

export default withNextIntl(nextConfig);
