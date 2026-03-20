import type { UserOnboardingStep } from "@dukkani/common/schemas";
import type {
	ConfigureStoreOnboardingInput,
	CreateStoreOnboardingInput,
} from "@dukkani/common/schemas/store/input";
import {
	OnboardingService,
	type OnboardingStepConfig,
} from "@dukkani/common/services/onboarding.service";
import { useAppForm } from "@dukkani/ui/hooks/use-app-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { createTranslator, Messages } from "next-intl";
import { storeConfigurationFormDefaultValues as storeConfigurationFormDefaultOptions } from "@/components/auth/onboarding-store-configuration-form";
import { storeSetupFormDefaultOptions } from "@/components/auth/onboarding-store-setup-form";
import { useCurrentUserQuery } from "@/hooks/api/use-current-user.hook";
import { useStoresQuery } from "@/hooks/api/use-stores.hook";
import { authClient } from "@/lib/auth-client";
import { handleAPIError } from "@/lib/error";
import { client } from "@/lib/orpc";
import { queryKeys } from "@/lib/query-keys";
import { useActiveStoreStore } from "@/stores/active-store.store";

/**
 * Translation function type for i18n support
 * Compatible with next-intl's Translator type
 * Based on the solution from next-intl GitHub discussions
 */
export type TranslationFunction = ReturnType<
	typeof createTranslator<Messages, "onboarding">
>;

/**
 * Controller hook that orchestrates:
 * - OnboardingService business logic
 * - API hooks (stores, user)
 * - Global state (active store)
 * - Form handling and mutations
 * - i18n integration
 *
 * Provides a single interface for onboarding functionality
 */
export function useOnboardingController(
	t: TranslationFunction,
	guestStep?: UserOnboardingStep | null,
) {
	const queryClient = useQueryClient();
	const { setSelectedStoreId } = useActiveStoreStore();

	// API hooks
	const { data: sessionData, isPending: isSessionPending } =
		authClient.useSession();
	const { data: currentUser, isLoading: isCurrentUserLoading } =
		useCurrentUserQuery(!!sessionData?.user);
	const isAuthenticated = !!sessionData?.user;

	// Get onboarding state from service
	const onboardingState = OnboardingService.getState(
		currentUser ?? null,
		guestStep ?? null,
		isAuthenticated,
	);

	// Store management
	const { data: stores, isLoading: isStoresLoading } = useStoresQuery(
		onboardingState.needsStores,
	);

	// Mutations
	const createStoreMutation = useMutation({
		mutationFn: (input: CreateStoreOnboardingInput) =>
			client.store.create(input),
		onSuccess: async (data) => {
			setSelectedStoreId(data.id);
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

	// Forms
	const storeSetupForm = useAppForm({
		...storeSetupFormDefaultOptions,
		onSubmit: async ({ value }) => {
			await createStoreMutation.mutateAsync(value);
		},
	});

	const storeConfigurationForm = useAppForm({
		...storeConfigurationFormDefaultOptions,
		onSubmit: async ({ value }) => {
			if (!selectedStoreId) {
				throw new Error(
					"Store ID is missing. Cannot configure store without it.",
				);
			}
			await configureStoreMutation.mutateAsync({
				...value,
				storeId: selectedStoreId,
			});
		},
	});

	// Store selection logic
	const selectedStoreId = OnboardingService.shouldAutoSelectStore(
		onboardingState.onboardingStep,
		null,
	)
		? (stores?.[0]?.id ?? null)
		: null;

	// Enhanced state with store information
	const enhancedState = {
		...onboardingState,
		stores,
		storeId: selectedStoreId,
		hasStores: !!stores?.length,
		firstStoreId: stores?.[0]?.id ?? null,
	};

	// Loading states
	const loadingStates = {
		isSessionPending,
		isCurrentUserLoading,
		isStoresLoading,
		isCreatingStore: createStoreMutation.isPending,
		isConfiguringStore: configureStoreMutation.isPending,
		isLoading: isSessionPending || isCurrentUserLoading || isStoresLoading,
	};

	// Action methods
	const actions = {
		// Step navigation
		getNextStep: () =>
			OnboardingService.getNextStep(enhancedState.effectiveStep),
		getPreviousStep: () =>
			OnboardingService.getPreviousStep(enhancedState.effectiveStep),
		canProceedToNext: () =>
			OnboardingService.canProceedToNextStep(enhancedState.effectiveStep),
		isValidTransition: (toStep: UserOnboardingStep | null) =>
			OnboardingService.isValidStepTransition(
				enhancedState.effectiveStep,
				toStep,
			),

		// Step configuration with i18n
		getStepConfig: (): OnboardingStepConfig => {
			const baseConfig = OnboardingService.getStepConfig(
				enhancedState.effectiveStep,
			);

			// Add i18n translations
			const stepKey = enhancedState.effectiveStep
				? enhancedState.effectiveStep.toLowerCase().replace("_", "")
				: "welcome";

			return {
				...baseConfig,
				title: t(`onboarding.steps.${stepKey}`),
				description: t(`onboarding.steps.${stepKey}Description`),
			};
		},

		// Validation
		validateState: () =>
			OnboardingService.validateOnboardingState(enhancedState),
	};

	// Forms
	const forms = {
		storeSetupForm,
		storeConfigurationForm,
	};

	// Mutations
	const mutations = {
		createStoreMutation,
		configureStoreMutation,
	};

	return {
		// State
		...enhancedState,
		...loadingStates,

		// Actions
		...actions,

		// Forms
		forms,

		// Mutations
		mutations,

		// Raw data for advanced usage
		sessionData,
		currentUser,
	};
}

/**
 * Hook type for TypeScript support
 */
export type UseOnboardingControllerReturn = ReturnType<
	typeof useOnboardingController
>;
