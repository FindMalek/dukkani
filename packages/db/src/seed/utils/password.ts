/**
 * Password hashing utility for seeders
 * Uses scrypt to hash passwords compatible with Better Auth
 * Better Auth uses scrypt by default, so we must match that format
 * TODO: Move to `@dukkani/common` package in the future
 */

import { scrypt, randomBytes } from "node:crypto";

/**
 * Hash a password for use in seeders
 * Uses scrypt to match Better Auth's password hashing algorithm
 * @param password - Plain text password
 * @returns Hashed password in format: salt:hash (base64 encoded)
 */
export async function hashPassword(password: string): Promise<string> {
	// Generate a random salt (16 bytes)
	const salt = randomBytes(16);

	// Hash the password with scrypt
	// Better Auth uses: keylen: 64, N: 16384, r: 8, p: 1
	// Note: scrypt options are passed as the 4th argument
	const hash = (await new Promise<Buffer>((resolve, reject) => {
		scrypt(
			password,
			salt,
			64,
			{
				N: 16384, // CPU/memory cost parameter
				r: 8, // Block size parameter
				p: 1, // Parallelization parameter
			},
			(err, derivedKey) => {
				if (err) reject(err);
				else resolve(derivedKey);
			},
		);
	})) as Buffer;

	// Return in format: salt:hash (both base64 encoded)
	// This matches Better Auth's scrypt format
	return `${salt.toString("base64")}:${hash.toString("base64")}`;
}
