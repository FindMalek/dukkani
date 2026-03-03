import { isReservedStoreSlug } from "@dukkani/common/schemas/store/constants";
import { getStoreSlugFromHost } from "./utils";

/**
 * Resolve the store slug for the current request.
 * Production: uses subdomain only (getStoreSlugFromHost).
 * Preview: uses cookie only (never host) - cookies are checked strictly when isPreviewDeployment.
 */
export function getStoreSlug(
	host: string | null,
	cookies: { get: (name: string) => { value?: string } | undefined },
): string | null {
	if (!process.env.VERCEL_ENV || process.env.VERCEL_ENV !== "preview") {
		return getStoreSlugFromHost(host);
	}

	const slug = cookies.get("storefront_store_slug")?.value ?? null;
	if (!slug || isReservedStoreSlug(slug)) {
		return null;
	}
	return slug;
}
