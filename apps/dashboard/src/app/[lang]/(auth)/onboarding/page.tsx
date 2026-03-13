"use client";

import {
	storeCategoryEnum,
	storeNotificationMethodEnum,
	storeThemeEnum,
	UserOnboardingStep,
} from "@dukkani/common/schemas/enums";
import {
	type ConfigureStoreOnboardingInput,
	type CreateStoreOnboardingInput,
	configureStoreOnboardingInputSchema,
	createStoreOnboardingInputSchema,
} from "@dukkani/common/schemas/store/input";
import { signupInputSchema } from "@dukkani/common/schemas/user/input";
import { useAppForm } from "@dukkani/ui/hooks/use-app-form";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import {
	type OnboardingStep,
	OnboardingStepper,
} from "@/components/app/onboarding/onboarding-stepper";
import { OnboardingCompletion } from "@/components/auth/onboarding/completion";
import {
	SignUpOnboardingForm,
	signUpOnboardingFormDefaultValues as signUpOnboardingFormDefaultOptions,
} from "@/components/auth/onboarding/sign-up-form";
import {
	StoreConfigurationOnboardingForm,
	storeConfigurationFormDefaultValues as storeConfigurationFormDefaultOptions,
} from "@/components/auth/onboarding/store-configuration-form";
import {
	StoreSetupOnboardingForm,
	storeSetupFormDefaultOptions,
} from "@/components/auth/onboarding/store-setup-form";

export default function OnboardingPage() {
	const searchParams = useSearchParams();
	const emailFromQuery = searchParams.get("email") ?? "";
	const [step, setStep] = useState<OnboardingStep>("SIGNUP");

	const signUpForm = useAppForm({
		...signUpOnboardingFormDefaultOptions(emailFromQuery ?? ""),
		onSubmit: async ({ value }) => {
			console.log(value);
			setStep("STORE_CREATION");
		},
	});

	const storeSetupForm = useAppForm({
		...storeSetupFormDefaultOptions,
		onSubmit: async ({ value }) => {
			console.log(value);
			setStep("STORE_CONFIGURATION");
		},
	});

	const storeConfigurationForm = useAppForm({
		...storeConfigurationFormDefaultOptions,
		onSubmit: async ({ value }) => {
			console.log(value);
			setStep("COMPLETION");
		},
	});
	// const headersList = await headers();
	// const params = await searchParams;
	// const email = params.email;

	// try {
	// 	const user = await client.account.getCurrentUser({
	// 		headers: headersList,
	// 	});

	// 	if (
	// 		user.onboardingStep === UserOnboardingStep.STORE_CREATED ||
	// 		user.onboardingStep === UserOnboardingStep.STORE_CONFIGURED ||
	// 		user.onboardingStep === UserOnboardingStep.STORE_LAUNCHED
	// 	) {
	// 		redirect(RoutePaths.DASHBOARD.url);
	// 	}

	// 	// Default fallback for authenticated users
	// 	redirect(RoutePaths.AUTH.ONBOARDING.STORE_SETUP.url);
	// } catch (error) {
	// 	// Only redirect to signup if this is an authentication error
	// 	if (isAuthError(error)) {
	// 		// User is NOT authenticated - redirect to signup page
	// 		if (email) {
	// 			redirect(
	// 				getRouteWithQuery(RoutePaths.AUTH.ONBOARDING.SIGNUP.url, { email }),
	// 			);
	// 		} else {
	// 			redirect(RoutePaths.AUTH.ONBOARDING.SIGNUP.url);
	// 		}
	// 	}

	// 	// For non-auth errors, log and rethrow so Next.js error boundary can handle it
	// 	logger.error(
	// 		{
	// 			error,
	// 			code: (error as { code?: string })?.code,
	// 			status: (error as { status?: number })?.status,
	// 		},
	// 		"Error fetching user data in onboarding page",
	// 	);

	// 	// Rethrow the error so Next.js can handle it with error boundary
	// 	throw error;
	// }
	return (
		<div className="flex w-full max-w-md flex-col gap-10">
			<OnboardingStepper currentStep={step} />
			{step === "SIGNUP" && (
				<SignUpOnboardingForm
					form={signUpForm}
					emailFromQuery={emailFromQuery}
				/>
			)}
			{step === "STORE_CREATION" && (
				<StoreSetupOnboardingForm form={storeSetupForm} />
			)}
			{step === "STORE_CONFIGURATION" && (
				<StoreConfigurationOnboardingForm form={storeConfigurationForm} />
			)}
			{step === "COMPLETION" && <OnboardingCompletion />}
		</div>
	);
}
