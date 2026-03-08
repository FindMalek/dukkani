import type { StoreSimpleOutput } from "@dukkani/common/schemas/store/output";
import { getStorefrontBaseUrl } from "@dukkani/env/get-storefront-base-url";
import { env } from "@/env";

/**
 * Extract store URL from store data
 * Returns the latest custom domain if available, otherwise the default URL
 * In preview: uses storefront deployment URL via @vercel/related-projects
 */
export function getStoreUrl(store: StoreSimpleOutput): string {
	// For now, we only have the default URL
	// In the future, when custom domains are added:
	// const domains = {
	//   default: `https://${store.slug}.${env.NEXT_PUBLIC_STORE_DOMAIN}`,
	//   custom: store.customDomains || [],
	// };
	//
	// if (domains.custom && domains.custom.length > 0) {
	//   // Return the latest (most recently added) custom domain
	//   return `https://${domains.custom[domains.custom.length - 1]}`;
	// }
	//
	// return domains.default;

	const baseHost = getStorefrontBaseUrl(env.NEXT_PUBLIC_STORE_DOMAIN);
	return `https://${store.slug}.${baseHost}`;
}
