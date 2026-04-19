import { isReservedStoreSlug } from "@dukkani/common/schemas/store/constants";
import { loadStoreParams } from "@dukkani/common/utils/server-query-parsers";
import { isStoreSelectorEnabled } from "@dukkani/env";
import { I18nextStorefrontConfig } from "@dukkani/i18n/storefront";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { createProxy } from "next-i18next/middleware";

const STORE_SLUG_COOKIE = "storefront_store_slug";
const COOKIE_MAX_AGE = 60 * 60 * 24 * 7; // 7 days

const localizedProxy = createProxy(I18nextStorefrontConfig);

export function proxy(request: NextRequest) {
  const hostname = request.headers.get("host");

  // Exclude api/dashboard subdomains (shouldn't reach here, but safety check)
  if (hostname?.startsWith("api.") || hostname?.startsWith("dashboard.")) {
    return NextResponse.next();
  }

  const response = localizedProxy(request);

  // Store selector env: when URL has ?store=slug, set cookie and redirect to same path without param
  if (isStoreSelectorEnabled(process.env)) {
    const { store: storeParam } = loadStoreParams(request.nextUrl.searchParams);
    if (storeParam && !isReservedStoreSlug(storeParam)) {
      const isSecure = request.url.startsWith("https:");
      const response = localizedProxy(request);
      response.cookies.set(STORE_SLUG_COOKIE, storeParam, {
        path: "/",
        maxAge: COOKIE_MAX_AGE,
        sameSite: "lax",
        secure: isSecure,
      });
    }
  }

  return response;
}
export const config = {
  matcher: [
    // Skip all internal paths (_next)
    "/((?!_next|api|favicon|manifest|.*\\..*).*)",
  ],
};
