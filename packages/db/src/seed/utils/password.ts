/**
 * Password hashing utility for seeders
 * Uses bcrypt to hash passwords compatible with Better Auth
 * TODO: Move to common package in the future
 */

import { hash } from "bcryptjs";

/**
 * Hash a password for use in seeders
 * @param password - Plain text password
 * @returns Hashed password
 */
export async function hashPassword(password: string): Promise<string> {
	return await hash(password, 10);
}

