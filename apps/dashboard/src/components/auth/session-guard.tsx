"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { authClient } from "@/lib/auth-client";

/**
 * Client-side session guard component
 * This handles redirects when server-side session check fails (e.g., in Vercel cross-origin scenarios)
 * It checks the session client-side and redirects if needed
 */
export function SessionGuard({ children }: { children: React.ReactNode }) {
	const router = useRouter();
	const { data: session, isPending } = authClient.useSession();

	useEffect(() => {
		if (!isPending && !session?.user) {
			router.push("/login");
		}
	}, [session, isPending, router]);

	// Show loading state while checking session
	if (isPending) {
		return (
			<div className="flex h-screen items-center justify-center">
				<div className="text-muted-foreground">Loading...</div>
			</div>
		);
	}

	// If no session, don't render children (redirect will happen)
	if (!session?.user) {
		return null;
	}

	return <>{children}</>;
}
