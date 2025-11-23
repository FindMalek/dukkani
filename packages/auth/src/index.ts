import { scrypt } from "node:crypto";
import { database } from "@dukkani/db";
import { hashPassword } from "@dukkani/db/utils/generate-id";
import { type BetterAuthOptions, betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { nextCookies } from "better-auth/next-js";
import { env } from "./env";

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

export const auth = betterAuth<BetterAuthOptions>({
	database: prismaAdapter(database, {
		provider: "postgresql",
	}),
	secret: env.BETTER_AUTH_SECRET,
	trustedOrigins: [env.NEXT_PUBLIC_CORS_ORIGIN, env.NEXT_PUBLIC_DASHBOARD_URL],
	emailAndPassword: {
		enabled: true,
		password: {
			hash: hashPassword,
			verify: verifyPassword,
		},
	},
	socialProviders: {
		facebook: {
			clientId: env.FACEBOOK_CLIENT_ID,
			clientSecret: env.FACEBOOK_CLIENT_SECRET,
		},
		google: {
			clientId: env.GOOGLE_CLIENT_ID,
			clientSecret: env.GOOGLE_CLIENT_SECRET,
		},
	},
	plugins: [nextCookies()],
});
