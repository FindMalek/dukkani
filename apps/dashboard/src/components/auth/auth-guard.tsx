"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { authClient } from "@/lib/auth-client";
import type { RoutePaths } from "@/lib/routes";

interface AuthGuardProps {
	children: React.ReactNode;
	redirectTo:
		| typeof RoutePaths.AUTH.LOGIN.url
		| typeof RoutePaths.DASHBOARD.url;
	requireAuth: boolean;
}

/**
 * Unified auth guard component for client-side session checks
 * Used as fallback when server-side session check fails (e.g., Vercel cross-origin scenarios)
 *
 * @param redirectTo - Where to redirect if condition is met
 * @param requireAuth - If true, redirect when NO session; if false, redirect when HAS session
 */
export function AuthGuard({
	children,
	redirectTo,
	requireAuth,
}: AuthGuardProps) {
	const router = useRouter();
	const { data: session, isPending } = authClient.useSession();

	useEffect(() => {
		if (!isPending) {
			const hasSession = !!session?.user;
			const shouldRedirect = requireAuth ? !hasSession : hasSession;

			if (shouldRedirect) {
				router.push(redirectTo);
			}
		}
	}, [session, isPending, router, redirectTo, requireAuth]);

	// If requireAuth and no session, don't render (redirect will happen)
	// If !requireAuth and has session, don't render (redirect will happen)
	const hasSession = !!session?.user;
	const shouldRender = requireAuth ? hasSession : !hasSession;

	if (!shouldRender) {
		return null;
	}

	return <>{children}</>;
}
