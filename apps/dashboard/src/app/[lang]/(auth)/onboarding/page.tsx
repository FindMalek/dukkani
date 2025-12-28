import { UserOnboardingStep } from "@dukkani/common/schemas/enums";
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
		console.error("Error fetching user data in onboarding page:", {
			error,
			code: (error as { code?: string })?.code,
			status: (error as { status?: number })?.status,
			message: error instanceof Error ? error.message : String(error),
		});

		// Rethrow the error so Next.js can handle it with error boundary
		throw error;
	}
}
