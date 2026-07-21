import type { PrismaClient } from "@dukkani/db";
import { hashPassword } from "@dukkani/db/utils/generate-id";
import { type BetterAuthOptions, betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { nextCookies } from "better-auth/next-js";
import { lastLoginMethod, openAPI } from "better-auth/plugins";
import type { env } from "./env";
import { buildTrustedOrigins, verifyPassword } from "./utils";

/**
 * Factory function to create a Better Auth instance
 * Uses dependency injection to avoid circular dependencies
 *
 * @param database - Prisma database client instance
 * @param envConfig - Partial environment config (can omit NEXT_PUBLIC_DASHBOARD_URL)
 * @returns Better Auth instance
 */
export function createAuth(
  database: PrismaClient,
  envConfig: typeof env,
): ReturnType<typeof betterAuth<BetterAuthOptions>> {
  const originConfig = [
    envConfig.NEXT_PUBLIC_API_URL,
    envConfig.NEXT_PUBLIC_DASHBOARD_URL,
    envConfig.VERCEL_BRANCH_URL,
    envConfig.VERCEL_PROJECT_PRODUCTION_URL,
  ].filter((origin) => origin !== undefined);

  const trustedOrigins = buildTrustedOrigins(
    originConfig,
    !!envConfig.VERCEL,
    envConfig.NEXT_PUBLIC_ALLOWED_ORIGIN,
    envConfig.CORS_PREVIEW_ORIGIN_PATTERN,
  );

  // Determine if we need production-grade cookie settings (secure cookies).
  const isVercel = !!envConfig.VERCEL;
  const isProduction =
    isVercel || envConfig.NEXT_PUBLIC_API_URL.startsWith("https://");

  // We don't attempt to share the session cookie across the dashboard/API
  // via a cookie `Domain` (crossSubDomainCookies) — dashboard and API are
  // separate Vercel projects, so their preview URLs are sibling
  // *.vercel.app aliases with no shared apex to set a Domain on (and it's
  // not just preview: this app's own NEXT_PUBLIC_API_URL is a static env
  // var, not resolved per-deployment, so a computed Domain can silently be
  // wrong in any environment — see #572/#574). Cookies are host-only
  // instead: apps/dashboard proxies its whole /api/* surface through its
  // own origin (next.config.ts rewrite), so the browser only ever talks to
  // one domain and the cookie is naturally first-party there. This is the
  // pattern Better Auth's own docs/community recommend for split
  // frontend/backend deployments. See github.com/FindMalek/dukkani/issues/517.
  return betterAuth<BetterAuthOptions>({
    database: prismaAdapter(database, {
      provider: "postgresql",
    }),
    secret: envConfig.BETTER_AUTH_SECRET,
    baseURL: envConfig.NEXT_PUBLIC_API_URL,
    trustedOrigins,
    advanced: {
      useSecureCookies: isProduction,
      cookies: {
        session_token: {
          attributes: {
            sameSite: "lax",
            httpOnly: true,
          },
        },
      },
    },
    session: {
      // Avoids a DB round trip on every session read (every oRPC request) by
      // trusting a short-lived signed cookie between checks. Safe here: no
      // impersonation/ban/role flow in this codebase depends on sub-5-minute
      // session freshness.
      cookieCache: {
        enabled: true,
        maxAge: 5 * 60,
      },
    },
    emailAndPassword: {
      enabled: true,
      password: {
        hash: hashPassword,
        verify: verifyPassword,
      },
    },
    socialProviders: {
      facebook: {
        clientId: envConfig.FACEBOOK_CLIENT_ID,
        clientSecret: envConfig.FACEBOOK_CLIENT_SECRET,
      },
      google: {
        clientId: envConfig.GOOGLE_CLIENT_ID,
        clientSecret: envConfig.GOOGLE_CLIENT_SECRET,
      },
      apple: {
        clientId: envConfig.APPLE_CLIENT_ID,
        clientSecret: envConfig.APPLE_CLIENT_SECRET,
      },
    },
    // nextCookies() must be last: it forwards pending Set-Cookie headers to
    // Next's cookie store, so any plugin after it whose hooks also set
    // cookies (e.g. lastLoginMethod) would have theirs silently dropped.
    plugins: [openAPI(), lastLoginMethod(), nextCookies()],
  });
}

/**
 * Singleton auth instance
 * Must be initialized by calling initializeAuth() before use
 * This is initialized by the server package at app startup
 */
export let auth: ReturnType<typeof betterAuth<BetterAuthOptions>>;

/**
 * Initialize the auth singleton
 * Called by core initialization module
 * @internal
 */
export function initializeAuth(
  database: PrismaClient,
  envConfig: Parameters<typeof createAuth>[1],
): void {
  auth = createAuth(database, envConfig);
}
