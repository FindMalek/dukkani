import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { RoutePaths } from "@/lib/routes";

export default async function OnboardingPage() {
	const session = await authClient.getSession({
		fetchOptions: {
			headers: await headers(),
		},
	});

	if (!session?.data?.user) {
		redirect(RoutePaths.AUTH.LOGIN.url);
	}

	const user = session.data.user;

	// Redirect based on onboarding step
	if (user.onboardingStep === "STORE_SETUP") {
		redirect(RoutePaths.AUTH.ONBOARDING.STORE_SETUP.url);
	}

	if (user.onboardingStep === "COMPLETE") {
		redirect(RoutePaths.DASHBOARD.url);
	}

	// Default fallback
	redirect(RoutePaths.AUTH.ONBOARDING.STORE_SETUP.url);
}
