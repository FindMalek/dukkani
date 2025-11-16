/**
 * Password hashing utility for seeders
 * Uses bcrypt to hash passwords compatible with Better Auth
 * TODO: Move to `@dukkani/common` package in the future
 */

import bcrypt from "bcryptjs";

/**
 * Hash a password for use in seeders
 * @param password - Plain text password
 * @returns Hashed password
 */
export async function hashPassword(password: string): Promise<string> {
	return await bcrypt.hash(password, 10);
}

