import { customAlphabet } from "nanoid";

export { hashPassword } from "../seed/utils/password";

/**
 * Custom alphabet for ID generation (URL-safe, excludes confusing characters)
 * Uses lowercase letters and numbers, excluding: 0, O, I, l (to avoid confusion)
 */
const alphabet = "123456789abcdefghijkmnopqrstuvwxyz";
const generateRandom = customAlphabet(alphabet, 8);

/**
 * Extracts the first 3 uppercase letters from a store slug
 * Handles edge cases where slug might be shorter than 3 characters
 *
 * @param slug - The store slug (e.g., "ahmed-fashion")
 * @returns 3 uppercase letters (e.g., "AHM")
 */
function extractStorePrefix(slug: string): string {
	// Remove any non-alphabetic characters and get first 3 letters
	const letters = slug.replace(/[^a-zA-Z]/g, "").slice(0, 3);

	// Convert to uppercase and pad if necessary
	const prefix = letters.toUpperCase().padEnd(3, "X");

	return prefix;
}

/**
 * Generates a custom order ID with format: {STORE_PREFIX}-{RANDOM}
 * Example: "AHM-abc12345"
 *
 * @param storeSlug - The store slug to derive prefix from
 * @returns A custom order ID string
 */
export function generateOrderId(storeSlug: string): string {
	const prefix = extractStorePrefix(storeSlug);
	const random = generateRandom();
	return `${prefix}-${random}`;
}

/**
 * Generates a custom product ID with format: {STORE_PREFIX}-{RANDOM}
 * Example: "AHM-xyz98765"
 *
 * @param storeSlug - The store slug to derive prefix from
 * @returns A custom product ID string
 */
export function generateProductId(storeSlug: string): string {
	const prefix = extractStorePrefix(storeSlug);
	const random = generateRandom();
	return `${prefix}-${random}`;
}
