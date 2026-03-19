"use client";

import {
	UserOnboardingStep,
	userOnboardingStepSchema,
} from "@dukkani/common/schemas";
import { Spinner } from "@dukkani/ui/components/spinner";
import { useAppForm } from "@dukkani/ui/hooks/use-app-form";
import { RedirectType, redirect, useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { OnboardingStepper } from "@/components/app/onboarding/onboarding-stepper";
import { OnboardingCompletion } from "@/components/auth/onboarding-completion";
import {
	SignUpOnboardingForm,
	signUpOnboardingFormDefaultValues as signUpOnboardingFormDefaultOptions,
} from "@/components/auth/onboarding-sign-up-form";
import {
	StoreConfigurationOnboardingForm,
	storeConfigurationFormDefaultValues as storeConfigurationFormDefaultOptions,
} from "@/components/auth/onboarding-store-configuration-form";
import {
	StoreSetupOnboardingForm,
	storeSetupFormDefaultOptions,
} from "@/components/auth/onboarding-store-setup-form";
import { useOnboardingController } from "@/hooks/controllers/use-onboarding-controller";
import { authClient } from "@/lib/auth-client";
import { RoutePaths } from "@/lib/routes";

export default function OnboardingPage() {
	const searchParams = useSearchParams();
	const t = useTranslations("onboarding");

	const stepFromQuery = searchParams.get("step");
	const emailFromQuery = searchParams.get("email");

	const initialStep = userOnboardingStepSchema
		.nullable()
		.catch(null)
		.parse(stepFromQuery);

	const [guestStep, setGuestStep] = useState<UserOnboardingStep | null>(
		initialStep,
	);

	// Use new onboarding controller - orchestrates everything
	const onboarding = useOnboardingController(t, guestStep);

	// Handle sign up form submission with auth client
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
						setGuestStep(UserOnboardingStep.STORE_SETUP);
					},
					onError: async (error) => {
						if (error.error.code === "USER_ALREADY_EXISTS_USE_ANOTHER_EMAIL") {
							formApi.setFieldMeta("email", (fieldMeta) => ({
								...fieldMeta,
								errorMap: {
									onSubmit: {
										message: t("errors.emailAlreadyInUse"),
									},
								},
							}));
						}
					},
				},
			);
		},
	});

	if (onboarding.isSessionPending) {
		return null;
	}

	if (onboarding.isAuthenticated && onboarding.isCurrentUserLoading) {
		return (
			<div className="flex min-h-[40vh] items-center justify-center">
				<Spinner className="h-8 w-8 text-primary" />
			</div>
		);
	}

	if (onboarding.isComplete) {
		redirect(RoutePaths.DASHBOARD.url, RedirectType.replace);
	}

	const waitingForStoreHydration =
		onboarding.isAuthenticated &&
		onboarding.effectiveStep === UserOnboardingStep.STORE_CREATED &&
		(onboarding.isStoresLoading || !onboarding.storeId);

	if (waitingForStoreHydration) {
		return (
			<div className="flex min-h-[40vh] items-center justify-center">
				<Spinner className="h-8 w-8 text-primary" />
			</div>
		);
	}

	if (
		onboarding.isAuthenticated &&
		onboarding.effectiveStep === UserOnboardingStep.STORE_CREATED &&
		onboarding.stores?.length === 0
	) {
		return (
			<div className="flex w-full max-w-md flex-col gap-4 text-center">
				<p className="text-muted-foreground text-sm">
					{t("errors.storeLoadFailed")}
				</p>
			</div>
		);
	}

	const stepperStep =
		onboarding.effectiveStep === UserOnboardingStep.STORE_LAUNCHED
			? UserOnboardingStep.STORE_LAUNCHED
			: onboarding.effectiveStep;

	return (
		<div className="flex w-full max-w-md flex-col gap-10">
			<OnboardingStepper currentStep={stepperStep} />
			{!onboarding.isAuthenticated && onboarding.effectiveStep === null && (
				<SignUpOnboardingForm form={signUpForm} />
			)}
			{onboarding.effectiveStep === UserOnboardingStep.STORE_SETUP && (
				<StoreSetupOnboardingForm form={onboarding.forms.storeSetupForm} />
			)}
			{onboarding.effectiveStep === UserOnboardingStep.STORE_CREATED && (
				<StoreConfigurationOnboardingForm
					form={onboarding.forms.storeConfigurationForm}
				/>
			)}
			{onboarding.effectiveStep === UserOnboardingStep.STORE_LAUNCHED &&
				onboarding.storeId && (
					<OnboardingCompletion storeId={onboarding.storeId} />
				)}
		</div>
	);
}
