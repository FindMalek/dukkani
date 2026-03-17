"use client";

import { UserOnboardingStep } from "@dukkani/common/schemas";
import type {
	ConfigureStoreOnboardingInput,
	CreateStoreOnboardingInput,
} from "@dukkani/common/schemas/store/input";
import { useAppForm } from "@dukkani/ui/hooks/use-app-form";
import { useMutation } from "@tanstack/react-query";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import * as z from "zod";
import { OnboardingStepper } from "@/components/app/onboarding/onboarding-stepper";
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
import { RoutePaths } from "@/lib/routes";

export default function OnboardingPage() {
	const router = useRouter();
	const searchParams = useSearchParams();
	const emailFromQuery = searchParams.get("email");
	const stepFromQuery = searchParams.get("step");
	const initialStep = z
		.enum(Object.values(UserOnboardingStep))
		.nullable()
		.catch(null)
		.parse(stepFromQuery);

	const { data: sessionData, isPending } = authClient.useSession();

	const [step, setStep] = useState(initialStep);

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
						setStep(UserOnboardingStep.STORE_SETUP);
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
			setStep(UserOnboardingStep.STORE_CREATED);
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
			setStep(UserOnboardingStep.STORE_LAUNCHED);
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

	if (isPending) {
		return;
	}

	if (sessionData?.user) {
		router.replace(RoutePaths.DASHBOARD.url);
		return;
	}

	return (
		<div className="flex w-full max-w-md flex-col gap-10">
			<OnboardingStepper currentStep={step} />
			{step === null && <SignUpOnboardingForm form={signUpForm} />}
			{step === UserOnboardingStep.STORE_SETUP && (
				<StoreSetupOnboardingForm form={storeSetupForm} />
			)}
			{step === UserOnboardingStep.STORE_CREATED && (
				<StoreConfigurationOnboardingForm form={storeConfigurationForm} />
			)}
			{step === UserOnboardingStep.STORE_LAUNCHED && storeId && (
				<OnboardingCompletion storeId={storeId} />
			)}
		</div>
	);
}
