import type { auth } from "@dukkani/auth";
import {
  inferAdditionalFields,
  lastLoginMethodClient,
} from "better-auth/client/plugins";
import { createAuthClient } from "better-auth/react";

// No baseURL: defaults to a same-origin relative "/api/auth", proxied to
// the real API by the rewrite in next.config.ts. This makes the session
// cookie first-party to the dashboard's own domain in every environment —
// see the rewrite comment for why that matters. Don't point this at the
// API's absolute URL again.
export const authClient = createAuthClient({
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
