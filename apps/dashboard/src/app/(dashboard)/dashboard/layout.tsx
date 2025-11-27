import { SessionGuard } from "@/components/auth/session-guard";
import { BottomNavigation } from "@/components/layout/bottom-navigation";
import { getServerSession } from "@/lib/get-server-session";

export default async function DashboardLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	// Try to get session server-side (works in localhost, may fail in Vercel due to cross-origin cookies)
	const session = await getServerSession();

	// If we have a session server-side, we can trust it
	// Otherwise, SessionGuard will handle client-side check and redirect
	if (!session?.user) {
		// Server-side check failed - let client-side handle it
		return (
			<SessionGuard>
				<div className="grid h-svh grid-rows-[auto_1fr]">
					<main className="overflow-auto">{children}</main>
					<BottomNavigation />
				</div>
			</SessionGuard>
		);
	}

	return (
		<div className="grid h-svh grid-rows-[auto_1fr]">
			<main className="overflow-auto">{children}</main>
			<BottomNavigation />
		</div>
	);
}
