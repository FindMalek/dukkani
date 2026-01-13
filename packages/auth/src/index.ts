import type { PrismaClient } from "@dukkani/db";
import { hashPassword } from "@dukkani/db/utils/generate-id";
import { apiAppEnv } from "@dukkani/env/apps/api";
import { type BetterAuthOptions, betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { nextCookies } from "better-auth/next-js";
import { lastLoginMethod, openAPI } from "better-auth/plugins";
import { buildTrustedOrigins, verifyPassword } from "./utils";

/**
 * Factory function to create a Better Auth instance
 * Uses dependency injection to avoid circular dependencies
 *
 * @param database - Prisma database client instance
 * @returns Better Auth instance
 */
export function createAuth(
	database: PrismaClient,
): ReturnType<typeof betterAuth<BetterAuthOptions>> {
	const originConfig = [
		apiAppEnv.CORS_ORIGIN,
		apiAppEnv.DASHBOARD_URL,
		apiAppEnv.VERCEL_BRANCH_URL,
		apiAppEnv.VERCEL_PROJECT_PRODUCTION_URL,
	].filter((origin) => origin !== undefined);

	const trustedOrigins = buildTrustedOrigins(
		originConfig,
		!!apiAppEnv.VERCEL,
		apiAppEnv.ALLOWED_ORIGIN,
	);

	// Determine if we need cross-origin cookie settings
	// In Vercel environments or when using HTTPS, we need SameSite=None and Secure
	const isVercel = !!apiAppEnv.VERCEL;
	const isProduction = isVercel || apiAppEnv.CORS_ORIGIN.startsWith("https://");

	return betterAuth<BetterAuthOptions>({
		database: prismaAdapter(database, {
			provider: "postgresql",
		}),
		secret: apiAppEnv.BETTER_AUTH_SECRET,
		baseURL: apiAppEnv.CORS_ORIGIN,
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
				clientId: apiAppEnv.FACEBOOK_CLIENT_ID,
				clientSecret: apiAppEnv.FACEBOOK_CLIENT_SECRET,
			},
			google: {
				clientId: apiAppEnv.GOOGLE_CLIENT_ID,
				clientSecret: apiAppEnv.GOOGLE_CLIENT_SECRET,
			},
			apple: {
				clientId: apiAppEnv.APPLE_CLIENT_ID,
				clientSecret: apiAppEnv.APPLE_CLIENT_SECRET,
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
export function initializeAuth(database: PrismaClient): void {
	auth = createAuth(database);
}
