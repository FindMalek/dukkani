import { UserOnboardingStep } from "@dukkani/common/schemas/enums";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { client } from "@/lib/orpc";
import { RoutePaths } from "@/lib/routes";

export default async function OnboardingPage() {
	const headersList = await headers();

	try {
		// Try to get current user (if authenticated)
		const user = await client.account.getCurrentUser({
			headers: headersList,
		});

		// User is authenticated - redirect based on onboarding step
		if (user.onboardingStep === UserOnboardingStep.STORE_SETUP) {
			redirect(RoutePaths.AUTH.ONBOARDING.STORE_SETUP.url);
		}

		if (user.onboardingStep === UserOnboardingStep.COMPLETE) {
			redirect(RoutePaths.DASHBOARD.url);
		}

		// Default fallback for authenticated users
		redirect(RoutePaths.AUTH.ONBOARDING.STORE_SETUP.url);
	} catch {
		// User is NOT authenticated - this is a new signup
		// Redirect to store setup page (they'll sign up there)
		// Or you could create a signup page first
		redirect(RoutePaths.AUTH.ONBOARDING.STORE_SETUP.url);
	}
}
