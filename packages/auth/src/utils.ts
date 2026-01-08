import { scrypt } from "node:crypto";
import { isOriginAllowedForRequest } from "@dukkani/common/utils/origin";

/**
 * Custom password verifier to match seeder format
 * Format: salt:hash (both base64 encoded)
 * BetterAuth expects: verify({ hash, password })
 */
export async function verifyPassword({
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
 * Build trusted origins configuration for Better Auth
 * Returns either a static array or a dynamic function that validates origins
 */
export function buildTrustedOrigins(
	baseOrigins: string[],
	isVercel: boolean,
	allowedOriginPattern?: string,
): string[] | ((request?: Request) => string[] | Promise<string[]>) {
	if (isVercel && allowedOriginPattern) {
		return (request?: Request) => {
			if (!request) {
				return baseOrigins;
			}
			const origin = request.headers.get("origin");
			if (
				origin &&
				isOriginAllowedForRequest(origin, baseOrigins, allowedOriginPattern)
			) {
				return [...baseOrigins, origin];
			}
			return baseOrigins;
		};
	}

	return baseOrigins;
}
