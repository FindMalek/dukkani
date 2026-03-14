"use client";

import type {
	ConfigureStoreOnboardingInput,
	CreateStoreOnboardingInput,
} from "@dukkani/common/schemas/store/input";
import { Button } from "@dukkani/ui/components/button";
import { useAppForm } from "@dukkani/ui/hooks/use-app-form";
import { useMutation } from "@tanstack/react-query";
import { useRouter, useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";
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
import { authClient } from "@/lib/auth-client";
import { handleAPIError } from "@/lib/error";
import { client } from "@/lib/orpc";

export default function OnboardingPage() {
	const searchParams = useSearchParams();
	const emailFromQuery = searchParams.get("email") ?? "";
	const [step, setStep] = useState<OnboardingStep>("SIGNUP");
	const t = useTranslations();
	const router = useRouter();

	const signUpForm = useAppForm({
		...signUpOnboardingFormDefaultOptions(emailFromQuery ?? ""),
		onSubmit: async ({ value, formApi }) => {
			await authClient.signUp.email(
				{
					email: value.email,
					password: value.password,
					name: value.name,
				},
				{
					onSuccess: async () => {
						setStep("STORE_CREATION");
					},
					onError: async (error) => {
						if (error.error.code === "USER_ALREADY_EXISTS_USE_ANOTHER_EMAIL") {
							formApi.setFieldMeta("email", (fieldMeta) => ({
								...fieldMeta,
								errorMap: {
									onSubmit: {
										message: "Email already in use. Please use another email.",
									},
								},
							}));
						} else {
							throw error;
						}
					},
				},
			);
		},
	});

	const [storeId, setStoreId] = useState<string | null>(null);

	const createStoreMutation = useMutation({
		mutationFn: (input: CreateStoreOnboardingInput) =>
			client.store.create(input),
		onSuccess: (data) => {
			setStoreId(data.id);
			setStep("STORE_CONFIGURATION");
		},
		onError: (error) => {
			handleAPIError(error);
		},
	});

	const storeSetupForm = useAppForm({
		...storeSetupFormDefaultOptions,
		onSubmit: async ({ value }) => {
			await createStoreMutation.mutateAsync(value);
		},
	});

	const configureStoreMutation = useMutation({
		mutationFn: (input: ConfigureStoreOnboardingInput) =>
			client.store.configure(input),
		onSuccess: () => {
			setStep("COMPLETION");
		},
		onError: (error) => {
			handleAPIError(error);
		},
	});

	const storeConfigurationForm = useAppForm({
		...storeConfigurationFormDefaultOptions,
		onSubmit: async ({ value }) => {
			if (!storeId) {
				throw new Error(
					"Store ID is missing. Cannot configure store without it.",
				);
			}
			await configureStoreMutation.mutateAsync({ ...value, storeId });
		},
	});

	const handleBack = () => {
		if (step === "STORE_CREATION") {
			setStep("SIGNUP");
			return;
		}
		if (step === "STORE_CONFIGURATION") {
			setStep("STORE_CREATION");
			return;
		}
	};

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
			{step === "SIGNUP" && <SignUpOnboardingForm form={signUpForm} />}
			{step === "STORE_CREATION" && (
				<StoreSetupOnboardingForm form={storeSetupForm} />
			)}
			{step === "STORE_CONFIGURATION" && (
				<StoreConfigurationOnboardingForm form={storeConfigurationForm} />
			)}
			{step === "COMPLETION" && <OnboardingCompletion />}
			{step !== "SIGNUP" && step !== "COMPLETION" && (
				<Button variant="outline" onClick={handleBack}>
					{t("auth.emailSignIn.back")}
				</Button>
			)}
		</div>
	);
}
