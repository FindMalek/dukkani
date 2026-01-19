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
	);

	// Determine if we need cross-origin cookie settings
	// In Vercel environments or when using HTTPS, we need SameSite=None and Secure
	const isVercel = !!envConfig.VERCEL;
	const isProduction =
		isVercel || envConfig.NEXT_PUBLIC_API_URL.startsWith("https://");

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
						sameSite: isProduction ? "none" : "lax",
						httpOnly: true,
					},
				},
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
		plugins: [nextCookies(), openAPI(), lastLoginMethod()],
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
