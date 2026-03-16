"use client";

import type {
	ConfigureStoreOnboardingInput,
	CreateStoreOnboardingInput,
} from "@dukkani/common/schemas/store/input";
import { useAppForm } from "@dukkani/ui/hooks/use-app-form";
import { useMutation } from "@tanstack/react-query";
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
import { authClient } from "@/lib/auth-client";
import { handleAPIError } from "@/lib/error";
import { client } from "@/lib/orpc";

export default function OnboardingPage() {
	const searchParams = useSearchParams();
	const emailFromQuery = searchParams.get("email");
	const stepFromQuery = searchParams.get("step");
	const allowedSteps: ReadonlyArray<OnboardingStep> = [
		"SIGNUP",
		"STORE_CREATION",
		"STORE_CONFIGURATION",
		"COMPLETION",
	];
	const initialStep: OnboardingStep = allowedSteps.includes(
		stepFromQuery as OnboardingStep,
	)
		? (stepFromQuery as OnboardingStep)
		: "SIGNUP";
	const [step, setStep] = useState<OnboardingStep>(initialStep);

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
			{step === "COMPLETION" && storeId && (
				<OnboardingCompletion storeId={storeId} />
			)}
		</div>
	);
}
