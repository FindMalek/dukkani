import type { auth } from "@dukkani/auth";
import {
  inferAdditionalFields,
  lastLoginMethodClient,
} from "better-auth/client/plugins";
import { createAuthClient } from "better-auth/react";

// baseURL is the page's own origin, so requests go through the dashboard's
// own domain, proxied to the API by the rewrite in next.config.ts — keeps
// the session cookie first-party. See #572. Better Auth's underlying fetch
// does `new URL(url, baseURL)`, which requires baseURL to be an absolute
// URL (a relative one throws), so this can't just be omitted/relative.
// `window` is undefined during this module's server-side evaluation (this
// file is only ever imported from "use client" components, so the actual
// browser bundle re-evaluates it fresh with `window` defined before any
// request is made) — undefined here just falls back to Better Auth's own
// default resolution, which is never actually used to fetch anything.
export const authClient = createAuthClient({
  baseURL: typeof window === "undefined" ? undefined : window.location.origin,
  plugins: [inferAdditionalFields<typeof auth>(), lastLoginMethodClient()],
});

/**
 * Check if an error is an authentication/authorization error
 */
export function isAuthError(error: unknown): boolean {
  if (!error || typeof error !== "object") {
    return false;
  }

  const errorObj = error as { code?: string; status?: number };

  // Check for ORPC error codes
  if (errorObj.code === "UNAUTHORIZED" || errorObj.code === "FORBIDDEN") {
    return true;
  }

  // Check for HTTP status codes
  if (errorObj.status === 401 || errorObj.status === 403) {
    return true;
  }

  return false;
}
