import {
  getLocale,
  loadStoreParams,
  setLocaleCookie,
} from "@dukkani/common/lib";
import { LOCALES } from "@dukkani/common/schemas/constants";
import { isReservedStoreSlug } from "@dukkani/common/schemas/store/constants";
import { isStoreSelectorEnabled } from "@dukkani/env";
import { getApiUrl } from "@dukkani/env/get-api-url";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { getStoreSlugFromHost } from "@/shared/lib/store/slug-retrieval.util";

const STORE_SLUG_COOKIE = "storefront_store_slug";
const COOKIE_MAX_AGE = 60 * 60 * 24 * 7; // 7 days

// Cached list of real store slugs, used to reject unknown subdomains before
// paying for a full render + cross-service API call + DB miss (this is what
// bots guessing subdomains like "help"/"blog" hit on every request today).
//
// Deliberately a plain module-scope variable with a manual TTL, not Edge
// Config or unstable_cache: Edge Middleware can't run unstable_cache/"use
// cache" (Node-only), and there's no Edge Config provisioned for ~3 stores —
// see the plan doc. This cache is warm only within a given edge isolate,
// which is fine: the goal is "don't hit the DB on every request," not
// perfect global consistency.
const VALID_SLUGS_CACHE_TTL_MS = 5 * 60 * 1000;
const VALID_SLUGS_FETCH_TIMEOUT_MS = 2000;

let validSlugsCache: { slugs: Set<string>; fetchedAt: number } | null = null;
let inFlightFetch: Promise<Set<string> | null> | null = null;

async function fetchValidSlugs(): Promise<Set<string> | null> {
  try {
    const apiUrl = getApiUrl(process.env.NEXT_PUBLIC_API_URL ?? "");
    const response = await fetch(`${apiUrl}/api/internal/store-slugs`, {
      signal: AbortSignal.timeout(VALID_SLUGS_FETCH_TIMEOUT_MS),
    });
    if (!response.ok) return null;
    const { slugs } = (await response.json()) as { slugs: string[] };
    return new Set(slugs);
  } catch {
    return null;
  }
}

// Fail OPEN by design. "Unknown" (fetch failed, timed out, nothing cached
// yet) must never be treated as "invalid" — that would take a real
// merchant's storefront down. Worst case on failure is today's existing
// behavior: one more render + DB miss, not an outage.
async function getValidSlugs(): Promise<Set<string> | null> {
  const now = Date.now();
  if (
    validSlugsCache &&
    now - validSlugsCache.fetchedAt < VALID_SLUGS_CACHE_TTL_MS
  ) {
    return validSlugsCache.slugs;
  }

  if (!inFlightFetch) {
    inFlightFetch = fetchValidSlugs().finally(() => {
      inFlightFetch = null;
    });
  }

  const fresh = await inFlightFetch;
  if (fresh) {
    validSlugsCache = { slugs: fresh, fetchedAt: now };
    return fresh;
  }

  // Fetch failed - serve stale cache if we have one, otherwise "unknown".
  return validSlugsCache?.slugs ?? null;
}

export async function proxy(request: NextRequest) {
  const hostname = request.headers.get("host");

  // Exclude api/dashboard subdomains (shouldn't reach here, but safety check)
  if (hostname?.startsWith("api.") || hostname?.startsWith("dashboard.")) {
    return NextResponse.next();
  }

  const { pathname } = request.nextUrl;

  // Skip API routes, static files, and Next.js internals
  if (
    pathname.startsWith("/api") ||
    pathname.startsWith("/_next") ||
    pathname.startsWith("/favicon") ||
    pathname.startsWith("/manifest") ||
    pathname.includes(".")
  ) {
    return NextResponse.next();
  }

  // Production only: this is the only environment where the host is what
  // resolves the store (see getStoreSlug in slug-retrieval.util.ts) - preview
  // and local dev use the cookie-based selector below instead, where the
  // hostname isn't a real store subdomain to begin with.
  if (!isStoreSelectorEnabled(process.env)) {
    const candidateSlug = getStoreSlugFromHost(hostname);
    if (candidateSlug && !isReservedStoreSlug(candidateSlug)) {
      const validSlugs = await getValidSlugs();
      if (validSlugs && !validSlugs.has(candidateSlug)) {
        return new NextResponse("Not Found", { status: 404 });
      }
    }
  }

  // Store selector env: when URL has ?store=slug, set cookie and redirect to same path without param
  if (isStoreSelectorEnabled(process.env)) {
    const { store: storeParam } = loadStoreParams(request.nextUrl.searchParams);
    if (storeParam && !isReservedStoreSlug(storeParam)) {
      const redirectUrl = new URL(pathname + request.nextUrl.hash, request.url);
      const response = NextResponse.redirect(redirectUrl);
      const isSecure = request.url.startsWith("https:");
      response.cookies.set(STORE_SLUG_COOKIE, storeParam, {
        path: "/",
        maxAge: COOKIE_MAX_AGE,
        sameSite: "lax",
        secure: isSecure,
      });
      return response;
    }
  }

  // Check if pathname already has a locale
  const pathnameHasLocale = LOCALES.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`,
  );

  if (pathnameHasLocale) {
    // Update cookie if needed
    const locale = pathname.split("/")[1];
    const response = NextResponse.next();
    setLocaleCookie(response, locale);
    return response;
  }

  // Redirect to add locale
  const locale = getLocale(request);
  request.nextUrl.pathname = `/${locale}${pathname}`;

  const response = NextResponse.redirect(request.nextUrl);
  setLocaleCookie(response, locale);

  return response;
}

export const config = {
  matcher: [
    // Skip all internal paths (_next)
    "/((?!_next|api|favicon|manifest|.*\\..*).*)",
  ],
};
