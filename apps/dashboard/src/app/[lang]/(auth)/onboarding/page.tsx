import { UserOnboardingStep } from "@dukkani/common/schemas/enums";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { client } from "@/lib/orpc";
import { getRouteWithQuery, RoutePaths } from "@/lib/routes";

export default async function OnboardingPage({
	searchParams,
}: {
	searchParams: Promise<{ email?: string }>;
}) {
	const headersList = await headers();
	const params = await searchParams;
	const email = params.email;

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
		// User is NOT authenticated - redirect to signup page
		if (email) {
			redirect(
				getRouteWithQuery(RoutePaths.AUTH.ONBOARDING.SIGNUP.url, { email }),
			);
		} else {
			redirect(RoutePaths.AUTH.ONBOARDING.SIGNUP.url);
		}
	}
}
