import { UserOnboardingStep } from "@dukkani/common/schemas/enums";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { client } from "@/lib/orpc";
import { RoutePaths } from "@/lib/routes";

export default async function OnboardingPage() {
	const headersList = await headers();

	try {
		const user = await client.account.getCurrentUser({
			headers: headersList,
		});

		// Redirect based on onboarding step
		if (user.onboardingStep === UserOnboardingStep.STORE_SETUP) {
			redirect(RoutePaths.AUTH.ONBOARDING.STORE_SETUP.url);
		}

		if (user.onboardingStep === UserOnboardingStep.COMPLETE) {
			redirect(RoutePaths.DASHBOARD.url);
		}

		// Default fallback
		redirect(RoutePaths.AUTH.ONBOARDING.STORE_SETUP.url);
	} catch {
		// Not authenticated or error
		redirect(RoutePaths.AUTH.LOGIN.url);
	}
}
