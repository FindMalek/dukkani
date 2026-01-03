import { UserOnboardingStep } from "@dukkani/common/schemas/enums";
import { logger } from "@dukkani/logger";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { isAuthError } from "@/lib/auth-client";
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
		const user = await client.account.getCurrentUser({
			headers: headersList,
		});

		// User is authenticated - redirect based on onboarding step
		if (user.onboardingStep === UserOnboardingStep.STORE_SETUP) {
			redirect(RoutePaths.AUTH.ONBOARDING.STORE_SETUP.url);
		}

		if (
			user.onboardingStep === UserOnboardingStep.STORE_CREATED ||
			user.onboardingStep === UserOnboardingStep.STORE_CONFIGURED ||
			user.onboardingStep === UserOnboardingStep.STORE_LAUNCHED
		) {
			redirect(RoutePaths.DASHBOARD.url);
		}

		// Default fallback for authenticated users
		redirect(RoutePaths.AUTH.ONBOARDING.STORE_SETUP.url);
	} catch (error) {
		// Only redirect to signup if this is an authentication error
		if (isAuthError(error)) {
			// User is NOT authenticated - redirect to signup page
			if (email) {
				redirect(
					getRouteWithQuery(RoutePaths.AUTH.ONBOARDING.SIGNUP.url, { email }),
				);
			} else {
				redirect(RoutePaths.AUTH.ONBOARDING.SIGNUP.url);
			}
		}

		// For non-auth errors, log and rethrow so Next.js error boundary can handle it
		logger.error(
			{
				error,
				code: (error as { code?: string })?.code,
				status: (error as { status?: number })?.status,
			},
			"Error fetching user data in onboarding page",
		);

		// Rethrow the error so Next.js can handle it with error boundary
		throw error;
	}
}
