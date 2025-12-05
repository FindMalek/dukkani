import type { auth } from "@dukkani/auth";
import {
	inferAdditionalFields,
	lastLoginMethodClient,
} from "better-auth/client/plugins";
import { createAuthClient } from "better-auth/react";
import { dashboardEnv } from "@/env";

export const authClient = createAuthClient({
	baseURL: dashboardEnv.NEXT_PUBLIC_CORS_ORIGIN,
	plugins: [inferAdditionalFields<typeof auth>(), lastLoginMethodClient()],
});
