"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { authClient } from "@/lib/auth-client";

/**
 * Client-side auth redirect guard
 * Redirects to dashboard if user is already logged in
 * Used as fallback when server-side session check fails (e.g., Vercel cross-origin)
 */
export function AuthRedirectGuard({ children }: { children: React.ReactNode }) {
	const router = useRouter();
	const { data: session, isPending } = authClient.useSession();

	useEffect(() => {
		if (!isPending && session?.user) {
			router.push("/dashboard");
		}
	}, [session, isPending, router]);

	return <>{children}</>;
}
