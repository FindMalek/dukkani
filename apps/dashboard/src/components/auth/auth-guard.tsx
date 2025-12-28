"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
import { authClient } from "@/lib/auth-client";
import { RoutePaths } from "@/lib/routes";

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
	const pathname = usePathname();
	const { data: session, isPending } = authClient.useSession();

	useEffect(() => {
		if (!isPending) {
			const hasSession = !!session?.user;
			const isLoginPage = pathname === RoutePaths.AUTH.LOGIN.url;

			// If requireAuth=false (redirect authenticated users):
			// - Only redirect from LOGIN page
			// - Allow authenticated users on onboarding pages
			if (!requireAuth && hasSession) {
				if (isLoginPage) {
					router.push(redirectTo);
				}
				// Don't redirect from onboarding pages - let them handle their own logic
				return;
			}

			// If requireAuth=true (redirect unauthenticated users):
			// - Redirect to login
			if (requireAuth && !hasSession) {
				router.push(redirectTo);
			}
		}
	}, [session, isPending, router, redirectTo, requireAuth, pathname]);

	// If requireAuth and no session, don't render (redirect will happen)
	// If !requireAuth and has session on login page, don't render (redirect will happen)
	const hasSession = !!session?.user;
	const isLoginPage = pathname === RoutePaths.AUTH.LOGIN.url;
	const shouldRender = requireAuth ? hasSession : !hasSession || !isLoginPage; // Allow authenticated users on non-login pages

	if (!shouldRender) {
		return null;
	}

	return <>{children}</>;
}
