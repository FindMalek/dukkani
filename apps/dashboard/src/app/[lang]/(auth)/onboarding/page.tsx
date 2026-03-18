"use client";

import {
	UserOnboardingStep,
	userOnboardingStepSchema,
} from "@dukkani/common/schemas";
import type {
	ConfigureStoreOnboardingInput,
	CreateStoreOnboardingInput,
} from "@dukkani/common/schemas/store/input";
import { Spinner } from "@dukkani/ui/components/spinner";
import { useAppForm } from "@dukkani/ui/hooks/use-app-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { RedirectType, redirect, useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
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
import { useCurrentUserQuery } from "@/hooks/api/use-current-user.hook";
import { useStoresQuery } from "@/hooks/api/use-stores.hook";
import { authClient } from "@/lib/auth-client";
import { handleAPIError } from "@/lib/error";
import { client } from "@/lib/orpc";
import { queryKeys } from "@/lib/query-keys";
import { RoutePaths } from "@/lib/routes";
import { useActiveStoreStore } from "@/stores/active-store.store";

export default function OnboardingPage() {
	const queryClient = useQueryClient();
	const { setSelectedStoreId } = useActiveStoreStore();
	const { data: sessionData, isPending: isSessionPending } =
		authClient.useSession();
	const searchParams = useSearchParams();
	const emailFromQuery = searchParams.get("email");
	const stepFromQuery = searchParams.get("step");
	const initialStep = userOnboardingStepSchema
		.nullable()
		.catch(null)
		.parse(stepFromQuery);

	const [guestStep, setGuestStep] = useState<UserOnboardingStep | null>(
		initialStep,
	);

	const isAuthenticated = !!sessionData?.user;
	const { data: currentUser, isLoading: isCurrentUserLoading } =
		useCurrentUserQuery(isAuthenticated);

	const onboardingStep = currentUser?.onboardingStep;
	const needsOnboardingStores =
		isAuthenticated &&
		!!currentUser &&
		(onboardingStep === UserOnboardingStep.STORE_CREATED ||
			onboardingStep === UserOnboardingStep.STORE_CONFIGURED);

	const { data: stores, isLoading: isStoresLoading } = useStoresQuery(
		needsOnboardingStores,
	);

	const [storeId, setStoreId] = useState<string | null>(null);

	useEffect(() => {
		if (!stores?.length) return;
		if (onboardingStep === UserOnboardingStep.STORE_CREATED) {
			setStoreId(stores[0].id);
		}
		if (
			onboardingStep === UserOnboardingStep.STORE_CONFIGURED &&
			storeId == null
		) {
			setStoreId(stores[0].id);
		}
	}, [stores, onboardingStep, storeId]);

	const effectiveStep = useMemo(() => {
		if (!isAuthenticated) return guestStep;
		if (!currentUser) return null;
		switch (currentUser.onboardingStep) {
			case UserOnboardingStep.STORE_LAUNCHED:
				return null;
			case UserOnboardingStep.STORE_SETUP:
				return UserOnboardingStep.STORE_SETUP;
			case UserOnboardingStep.STORE_CREATED:
				return UserOnboardingStep.STORE_CREATED;
			case UserOnboardingStep.STORE_CONFIGURED:
				return UserOnboardingStep.STORE_LAUNCHED;
			default:
				return UserOnboardingStep.STORE_SETUP;
		}
	}, [isAuthenticated, guestStep, currentUser]);

	const createStoreMutation = useMutation({
		mutationFn: (input: CreateStoreOnboardingInput) =>
			client.store.create(input),
		onSuccess: async (data) => {
			setSelectedStoreId(data.id);
			setStoreId(data.id);
			queryClient.invalidateQueries({ queryKey: queryKeys.stores.all() });
			queryClient.invalidateQueries({ queryKey: queryKeys.account.current() });
			await queryClient.refetchQueries({
				queryKey: queryKeys.account.current(),
			});
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
		onSuccess: async (_data, variables) => {
			setSelectedStoreId(variables.storeId);
			queryClient.invalidateQueries({ queryKey: queryKeys.stores.all() });
			queryClient.invalidateQueries({ queryKey: queryKeys.account.current() });
			await queryClient.refetchQueries({
				queryKey: queryKeys.account.current(),
			});
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

	if (isSessionPending) {
		return null;
	}

	if (isAuthenticated && isCurrentUserLoading) {
		return (
			<div className="flex min-h-[40vh] items-center justify-center">
				<Spinner className="h-8 w-8 text-primary" />
			</div>
		);
	}

	if (
		isAuthenticated &&
		currentUser?.onboardingStep === UserOnboardingStep.STORE_LAUNCHED
	) {
		redirect(RoutePaths.DASHBOARD.url, RedirectType.replace);
	}

	const waitingForStoreHydration =
		isAuthenticated &&
		effectiveStep === UserOnboardingStep.STORE_CREATED &&
		(isStoresLoading || !storeId);

	if (waitingForStoreHydration) {
		return (
			<div className="flex min-h-[40vh] items-center justify-center">
				<Spinner className="h-8 w-8 text-primary" />
			</div>
		);
	}

	if (
		isAuthenticated &&
		effectiveStep === UserOnboardingStep.STORE_CREATED &&
		stores?.length === 0
	) {
		return (
			<div className="flex w-full max-w-md flex-col gap-4 text-center">
				<p className="text-muted-foreground text-sm">
					We couldn&apos;t load your store. Refresh the page or contact support.
				</p>
			</div>
		);
	}

	const stepperStep =
		effectiveStep === UserOnboardingStep.STORE_LAUNCHED
			? UserOnboardingStep.STORE_LAUNCHED
			: effectiveStep;

	return (
		<div className="flex w-full max-w-md flex-col gap-10">
			<OnboardingStepper currentStep={stepperStep} />
			{!isAuthenticated && effectiveStep === null && (
				<SignUpOnboardingForm form={signUpForm} />
			)}
			{effectiveStep === UserOnboardingStep.STORE_SETUP && (
				<StoreSetupOnboardingForm form={storeSetupForm} />
			)}
			{effectiveStep === UserOnboardingStep.STORE_CREATED && (
				<StoreConfigurationOnboardingForm form={storeConfigurationForm} />
			)}
			{effectiveStep === UserOnboardingStep.STORE_LAUNCHED && storeId && (
				<OnboardingCompletion storeId={storeId} />
			)}
		</div>
	);
}
