import { StoreEntity } from "@dukkani/common/entities/store/entity";
import { UserOnboardingStep } from "@dukkani/common/schemas/enums";
import type {
  ConfigureStoreOnboardingInput,
  CreateStoreOnboardingInput,
} from "@dukkani/common/schemas/store/input";
import type { OnboardingStepConfig } from "@dukkani/common/services/onboarding.service";
import { useAppForm } from "@dukkani/ui/hooks/use-app-form";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { createTranslator, Messages } from "next-intl";
import { useMemo } from "react";
import { storeConfigurationFormDefaultValues as storeConfigurationFormDefaultOptions } from "@/components/app/auth/onboarding-store-configuration-form";
import { storeSetupFormDefaultOptions } from "@/components/app/auth/onboarding-store-setup-form";
import { authClient } from "@/shared/api/auth-client";
import { handleAPIError } from "@/shared/api/error-handler";
import { api, client } from "@/shared/api/orpc";
import { appQueries } from "@/shared/api/queries";
import { useActiveStoreStore } from "../store/active.store";
import {
  canProceedToNextStep,
  getNextStep,
  getPreviousStep,
  isValidStepTransition,
  shouldAutoSelectStore,
} from "./stepper.util";

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
  onStepChange?: (step: UserOnboardingStep) => void,
) {
  const queryClient = useQueryClient();
  const { setSelectedStoreId, selectedStoreId: globalSelectedStoreId } =
    useActiveStoreStore();

  // API hooks
  const { data: sessionData, isPending: isSessionPending } =
    authClient.useSession();
  const { isLoading: isCurrentUserLoading } = useQuery({
    ...appQueries.account.currentUser(),
    enabled: !!sessionData?.user,
  });
  const isAuthenticated = !!sessionData?.user;

  const { data: onboardingState } = useQuery({
    queryKey: ["onboarding", "state", guestStep],
    queryFn: () => client.onboarding.getState({ guestStep }),
    enabled: isAuthenticated,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  const { data: shouldShowStores } = useQuery({
    queryKey: ["onboarding", "shouldShowStores"],
    queryFn: () => client.onboarding.shouldShowStores(),
    enabled: isAuthenticated,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  const fallbackState = useMemo(
    () => ({
      isAuthenticated: false,
      currentUser: null,
      onboardingStep: null as UserOnboardingStep | null,
      effectiveStep: guestStep ?? null,
      needsStores: false,
      isComplete: false,
      canProceed: false,
    }),
    [guestStep],
  );

  const state = isAuthenticated
    ? (onboardingState ?? fallbackState)
    : fallbackState;

  // Store management - use ORPC result
  const { data: stores, isLoading: isStoresLoading } = useQuery({
    ...appQueries.store.all(),
    enabled: shouldShowStores ?? false,
  });

  // Mutations
  const createStoreMutation = useMutation({
    mutationFn: (input: CreateStoreOnboardingInput) =>
      client.store.create(input),
    onSuccess: async (data) => {
      // Set global state immediately
      setSelectedStoreId(data.id);

      // Optimistically update stores cache to prevent race condition
      queryClient.setQueryData(api.store.getAll.queryKey(), (old: any) => {
        const existing = Array.isArray(old) ? old : [];
        // Avoid duplicates if store already exists in cache
        if (!existing.find((store: any) => store.id === data.id)) {
          return [...existing, data];
        }
        return existing;
      });

      // Then invalidate for fresh data
      await queryClient.invalidateQueries(api.store.getAll.queryOptions());
      await queryClient.invalidateQueries(
        api.account.getCurrentUser.queryOptions(),
      );

      // Wait for stores to be available before changing step
      await queryClient.refetchQueries(api.store.getAll.queryOptions());
      await queryClient.refetchQueries(
        api.account.getCurrentUser.queryOptions(),
      );

      if (onStepChange) {
        onStepChange(UserOnboardingStep.STORE_CREATED);
      }
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
      await queryClient.invalidateQueries(api.store.getAll.queryOptions());
      await queryClient.invalidateQueries(
        api.account.getCurrentUser.queryOptions(),
      );
      await queryClient.refetchQueries(
        api.account.getCurrentUser.queryOptions(),
      );

      if (onStepChange) {
        onStepChange(UserOnboardingStep.STORE_LAUNCHED);
      }
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

  // Store selection logic using client utility
  const selectedStoreId = shouldAutoSelectStore(state.onboardingStep, null)
    ? (globalSelectedStoreId ?? stores?.[0]?.id ?? null)
    : null;

  // Enhanced state with store information
  const enhancedState = {
    ...state,
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
    // Step navigation using client utilities
    getNextStep: () => getNextStep(enhancedState.effectiveStep),
    getPreviousStep: () => getPreviousStep(enhancedState.effectiveStep),
    canProceedToNext: () => canProceedToNextStep(enhancedState.effectiveStep),
    isValidTransition: (toStep: UserOnboardingStep | null) =>
      isValidStepTransition(enhancedState.effectiveStep, toStep),

    // Step configuration with i18n - get base config from ORPC
    getStepConfig: async (): Promise<OnboardingStepConfig> => {
      const baseConfig = await client.onboarding.getStepConfig({
        step: enhancedState.effectiveStep,
      });

      // Use type-safe mapping from StoreEntity to get the correct translation key
      const stepKey = enhancedState.effectiveStep
        ? StoreEntity.ONBOARDING_STEP_KEY_MAP[enhancedState.effectiveStep]
        : StoreEntity.ONBOARDING_STEP_KEY_MAP.null;

      return {
        ...baseConfig,
        title: t(`steps.${stepKey}`),
        description: t(`steps.${stepKey}Description`),
      };
    },
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
    currentUser: enhancedState.currentUser,
  };
}

/**
 * Hook type for TypeScript support
 */
export type UseOnboardingControllerReturn = ReturnType<
  typeof useOnboardingController
>;
