import type { auth } from "@dukkani/auth";
import {
	inferAdditionalFields,
	lastLoginMethodClient,
} from "better-auth/client/plugins";
import { createAuthClient } from "better-auth/react";
import { env } from "@/env";

export const authClient = createAuthClient({
	baseURL: env.NEXT_PUBLIC_API_URL,
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
