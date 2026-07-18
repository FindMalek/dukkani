import type { StoreSimpleOutput } from "@dukkani/common/schemas/store/output";
import { getStorefrontBaseUrl } from "@dukkani/env/get-storefront-base-url";
import { env } from "@/env";

/**
 * Store origin with no path/query — subdomain in production, shared
 * storefront host in preview/dev (selector mode routes by ?store= instead).
 */
function getStoreOrigin(store: StoreSimpleOutput): string {
  const baseHost = getStorefrontBaseUrl(env.NEXT_PUBLIC_STORE_DOMAIN);

  // env.NEXT_PUBLIC_NODE_ENV is "development" in both preview and local dev
  if (env.NEXT_PUBLIC_NODE_ENV === "development") {
    return baseHost.startsWith("http") ? baseHost : `https://${baseHost}`;
  }

  return `https://${store.slug}.${baseHost}`;
}

/**
 * Extract store URL from store data.
 * In preview/dev (selector mode): returns storefront origin with ?store=<slug>
 * so the storefront middleware cookie-based selector flow kicks in.
 * In production: returns the standard subdomain URL.
 */
export function getStoreUrl(store: StoreSimpleOutput): string {
  const origin = getStoreOrigin(store);

  if (env.NEXT_PUBLIC_NODE_ENV === "development") {
    return `${origin}/?store=${store.slug}`;
  }

  return origin;
}

/**
 * Storefront URL for a specific product's live page, for the dashboard's
 * "Preview in storefront" link. Same origin resolution as {@link getStoreUrl}
 * — selector mode (preview/dev) keeps the `?store=` param alongside the path.
 */
export function getProductPreviewUrl(
  store: StoreSimpleOutput,
  productId: string,
  locale: string,
): string {
  const origin = getStoreOrigin(store);
  const path = `${origin}/${locale}/products/${productId}`;

  if (env.NEXT_PUBLIC_NODE_ENV === "development") {
    return `${path}?store=${store.slug}`;
  }

  return path;
}
