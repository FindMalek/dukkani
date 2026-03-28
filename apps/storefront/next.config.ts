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

const withNextIntl = createNextIntlPlugin("./src/lib/i18n.ts");

const nextConfig: NextConfig = {
  reactCompiler: true,
  transpilePackages: ["@dukkani/ui", "@dukkani/env"],
  serverExternalPackages: [
    "@prisma/client",
    "pino",
    "pino-pretty",
    "thread-stream",
  ],
  env: {
    NEXT_PUBLIC_API_URL: apiUrl,
  },
  images: {
    dangerouslyAllowLocalIP: true,
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
    ],
  },
};

export default withNextIntl(nextConfig);
