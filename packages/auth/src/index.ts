import { scrypt } from "node:crypto";
import type { PrismaClient } from "@dukkani/db";
import { hashPassword } from "@dukkani/db/utils/generate-id";
import { apiEnv } from "@dukkani/env/presets/api";
import { type BetterAuthOptions, betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { nextCookies } from "better-auth/next-js";
import { openAPI } from "better-auth/plugins";
import type { env } from "./env";

/**
 * Custom password verifier to match seeder format
 * Format: salt:hash (both base64 encoded)
 * BetterAuth expects: verify({ hash, password })
 */
async function verifyPassword({
	hash: hashedPassword,
	password,
}: {
	hash: string;
	password: string;
}): Promise<boolean> {
	const [saltBase64, hashBase64] = hashedPassword.split(":");
	if (!saltBase64 || !hashBase64) {
		return false;
	}

	const salt = Buffer.from(saltBase64, "base64");
	const hash = await new Promise<Buffer>((resolve, reject) => {
		scrypt(
			password,
			salt,
			64,
			{
				N: 16384,
				r: 8,
				p: 1,
			},
			(err, derivedKey) => {
				if (err) reject(err);
				else resolve(derivedKey);
			},
		);
	});

	return hash.toString("base64") === hashBase64;
}

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
	envConfig: Pick<
		typeof env,
		| "BETTER_AUTH_SECRET"
		| "NEXT_PUBLIC_CORS_ORIGIN"
		| "GOOGLE_CLIENT_ID"
		| "GOOGLE_CLIENT_SECRET"
		| "FACEBOOK_CLIENT_ID"
		| "FACEBOOK_CLIENT_SECRET"
	> & {
		NEXT_PUBLIC_DASHBOARD_URL?: string; // Optional - if not provided, only CORS_ORIGIN is used
	},
): ReturnType<typeof betterAuth<BetterAuthOptions>> {
	// Build trusted origins array with Vercel support
	// Better Auth will automatically handle cookie configuration based on baseURL and trustedOrigins
	const trustedOrigins = [
		envConfig.NEXT_PUBLIC_CORS_ORIGIN,
		envConfig.NEXT_PUBLIC_DASHBOARD_URL,
		// Add Vercel URLs if available
		...(process.env.VERCEL_URL ? [`https://${process.env.VERCEL_URL}`] : []),
		...(process.env.VERCEL_BRANCH_URL
			? [`https://${process.env.VERCEL_BRANCH_URL}`]
			: []),
		...(process.env.VERCEL_PROJECT_PRODUCTION_URL
			? [`https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`]
			: []),
	].filter((url): url is string => url !== null);

	return betterAuth<BetterAuthOptions>({
		database: prismaAdapter(database, {
			provider: "postgresql",
		}),
		secret: envConfig.BETTER_AUTH_SECRET,
		baseURL: envConfig.NEXT_PUBLIC_CORS_ORIGIN,
		trustedOrigins,
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
		},
		plugins: [nextCookies(), openAPI()],
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
