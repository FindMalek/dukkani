import { UserOnboardingStep } from "@dukkani/common/schemas/enums";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { AuthGuard } from "@/components/auth/auth-guard";
import { getServerSession } from "@/lib/get-server-session";
import { client } from "@/lib/orpc";
import { RoutePaths } from "@/lib/routes";

export default async function AuthLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	const session = await getServerSession();

	if (session?.user) {
		try {
			// Check user's onboarding status
			const headersList = await headers();
			const user = await client.account.getCurrentUser({
				headers: headersList,
			});

			// If user has completed onboarding, redirect to dashboard
			if (user.onboardingStep === UserOnboardingStep.COMPLETE) {
				redirect(RoutePaths.DASHBOARD.url);
			}

			// If user is still in onboarding, allow access to onboarding pages
			// But redirect them away from login page
			return (
				<AuthGuard redirectTo={RoutePaths.DASHBOARD.url} requireAuth={false}>
					{children}
				</AuthGuard>
			);
		} catch {
			// If we can't get user data, fall back to allowing access
			// (onboarding pages will handle their own auth checks)
			return (
				<AuthGuard redirectTo={RoutePaths.DASHBOARD.url} requireAuth={false}>
					{children}
				</AuthGuard>
			);
		}
	}

	// Unauthenticated users can access all auth pages
	return <>{children}</>;
}
