/**
 * Extracts a clean product ID from a route param.
 * Strips query params and hash fragments that may be incorrectly included
 * when links are shared (e.g. Facebook bio, UTM/ref params).
 */
export function parseProductIdFromParam(
	param: string | undefined,
): string | null {
	if (!param || typeof param !== "string") return null;
	const clean = param.split(/[?#]/)[0]?.trim() ?? "";
	return clean || null;
}
