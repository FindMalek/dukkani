import logger from "@dukkani/logger";
import {
  addSpanAttributes,
  enhanceLogWithTraceContext,
  traceStaticClass,
} from "@dukkani/tracing";
import { UserOnboardingStep } from "../schemas/enums";
import type { UserSimpleOutput } from "../schemas/user/output";

export interface OnboardingState {
  isAuthenticated: boolean;
  currentUser: UserSimpleOutput | null;
  onboardingStep: UserOnboardingStep | null;
  effectiveStep: UserOnboardingStep | null;
  needsStores: boolean;
  isComplete: boolean;
  canProceed: boolean;
}

export interface OnboardingStepConfig {
  title: string;
  description?: string;
  canProceed: boolean;
  requiresAuth: boolean;
  requiresStores: boolean;
}

/**
 * Onboarding service - Shared business logic for onboarding operations
 * All methods are automatically traced via traceStaticClass
 * This service can be used across all apps (dashboard, storefront, web, mobile)
 */
class OnboardingServiceBase {
  private static readonly ONBOARDING_STEPS: UserOnboardingStep[] = [
    UserOnboardingStep.STORE_SETUP,
    UserOnboardingStep.STORE_CREATED,
    UserOnboardingStep.STORE_CONFIGURED,
    UserOnboardingStep.STORE_LAUNCHED,
  ];

  /**
   * Calculate the effective onboarding step based on user state and guest step
   * This replaces the complex useMemo logic from components
   */
  static getEffectiveStep(
    currentUser: UserSimpleOutput | null,
    guestStep: UserOnboardingStep | null,
    isAuthenticated: boolean,
  ): UserOnboardingStep | null {
    addSpanAttributes({
      "onboarding.authenticated": isAuthenticated,
      "onboarding.has_user": !!currentUser,
    });

    if (!isAuthenticated) return guestStep;
    if (!currentUser) return null;

    const effectiveStep = OnboardingServiceBase.mapUserStepToEffectiveStep(
      currentUser.onboardingStep,
    );

    logger.info(
      enhanceLogWithTraceContext({
        user_step: currentUser.onboardingStep,
        effective_step: effectiveStep,
      }),
      "Calculated effective onboarding step",
    );

    return effectiveStep;
  }

  /**
   * Map user's onboarding step to the effective step for UI
   */
  private static mapUserStepToEffectiveStep(
    userStep: UserOnboardingStep,
  ): UserOnboardingStep | null {
    switch (userStep) {
      case UserOnboardingStep.STORE_LAUNCHED:
        return null; // Onboarding complete
      case UserOnboardingStep.STORE_SETUP:
        return UserOnboardingStep.STORE_SETUP;
      case UserOnboardingStep.STORE_CREATED:
        return UserOnboardingStep.STORE_CREATED;
      case UserOnboardingStep.STORE_CONFIGURED:
        return UserOnboardingStep.STORE_LAUNCHED; // Skip to launch
      default:
        return UserOnboardingStep.STORE_SETUP;
    }
  }

  /**
   * Determine if stores should be loaded for the current onboarding state
   */
  static shouldShowStores(
    currentUser: UserSimpleOutput | null,
    isAuthenticated: boolean,
  ): boolean {
    const shouldShow =
      isAuthenticated &&
      !!currentUser &&
      (currentUser.onboardingStep === UserOnboardingStep.STORE_CREATED ||
        currentUser.onboardingStep === UserOnboardingStep.STORE_CONFIGURED);

    addSpanAttributes({
      "onboarding.should_show_stores": shouldShow,
      "onboarding.user_step": currentUser?.onboardingStep ?? "null",
    });

    return shouldShow;
  }

  /**
   * Check if onboarding is complete
   */
  static isOnboardingComplete(currentUser: UserSimpleOutput | null): boolean {
    const isComplete =
      currentUser?.onboardingStep === UserOnboardingStep.STORE_LAUNCHED;

    addSpanAttributes({
      "onboarding.is_complete": isComplete,
      "onboarding.user_step": currentUser?.onboardingStep ?? "null",
    });

    return isComplete;
  }

  /**
   * Check if user can proceed to the next step
   */
  static canProceedToNextStep(currentStep: UserOnboardingStep | null): boolean {
    if (!currentStep) return false;
    return currentStep !== UserOnboardingStep.STORE_LAUNCHED;
  }

  /**
   * Get the next step in the onboarding flow
   */
  static getNextStep(
    currentStep: UserOnboardingStep | null,
  ): UserOnboardingStep | null {
    if (!currentStep) return OnboardingServiceBase.ONBOARDING_STEPS[0] ?? null;

    const currentIndex =
      OnboardingServiceBase.ONBOARDING_STEPS.indexOf(currentStep);
    const nextIndex = currentIndex + 1;

    return (
      (nextIndex < OnboardingServiceBase.ONBOARDING_STEPS.length
        ? OnboardingServiceBase.ONBOARDING_STEPS[nextIndex]
        : null) ?? null
    );
  }

  /**
   * Get the previous step in the onboarding flow
   */
  static getPreviousStep(
    currentStep: UserOnboardingStep | null,
  ): UserOnboardingStep | null {
    const steps = OnboardingServiceBase.ONBOARDING_STEPS;

    if (!currentStep) return null;
    const currentIndex = steps.indexOf(currentStep);
    const previousIndex = currentIndex - 1;

    return (previousIndex >= 0 ? steps[previousIndex] : null) ?? null;
  }

  /**
   * Determine if store should be auto-selected based on onboarding step
   */
  static shouldAutoSelectStore(
    onboardingStep: UserOnboardingStep | null,
    storeId: string | null,
  ): boolean {
    const shouldAuto =
      !!onboardingStep &&
      (onboardingStep === UserOnboardingStep.STORE_CREATED ||
        onboardingStep === UserOnboardingStep.STORE_CONFIGURED) &&
      storeId == null;

    addSpanAttributes({
      "onboarding.should_auto_select_store": shouldAuto,
      "onboarding.step": onboardingStep ?? "null",
      "onboarding.has_store_id": !!storeId,
    });

    return shouldAuto;
  }

  /**
   * Validate if a step transition is allowed
   * Prevents backward movement in onboarding flow
   */
  static isValidStepTransition(
    fromStep: UserOnboardingStep | null,
    toStep: UserOnboardingStep | null,
  ): boolean {
    if (!fromStep || !toStep) return true;

    const steps = OnboardingServiceBase.ONBOARDING_STEPS;

    const fromIndex = steps.indexOf(fromStep);
    const toIndex = steps.indexOf(toStep);

    // If either step is not found, allow the transition
    if (fromIndex === -1 || toIndex === -1) return true;

    // Allow forward movement and staying on the same step
    // Don't allow backward movement in onboarding
    const isValid = toIndex >= fromIndex;

    addSpanAttributes({
      "onboarding.from_step": fromStep ?? "null",
      "onboarding.to_step": toStep ?? "null",
      "onboarding.transition_valid": isValid,
    });

    return isValid;
  }

  /**
   * Get step configuration for UI purposes
   * Pure configuration without i18n - i18n should be handled at controller level
   */
  static getStepConfig(step: UserOnboardingStep | null): OnboardingStepConfig {
    const configs: Record<UserOnboardingStep, OnboardingStepConfig> = {
      [UserOnboardingStep.STORE_SETUP]: {
        title: "onboarding.steps.storeSetup",
        description: "onboarding.steps.storeSetupDescription",
        canProceed: true,
        requiresAuth: true,
        requiresStores: false,
      },
      [UserOnboardingStep.STORE_CREATED]: {
        title: "onboarding.steps.storeCreated",
        description: "onboarding.steps.storeCreatedDescription",
        canProceed: true,
        requiresAuth: true,
        requiresStores: true,
      },
      [UserOnboardingStep.STORE_CONFIGURED]: {
        title: "onboarding.steps.storeConfigured",
        description: "onboarding.steps.storeConfiguredDescription",
        canProceed: true,
        requiresAuth: true,
        requiresStores: true,
      },
      [UserOnboardingStep.STORE_LAUNCHED]: {
        title: "onboarding.steps.storeLaunched",
        description: "onboarding.steps.storeLaunchedDescription",
        canProceed: false,
        requiresAuth: true,
        requiresStores: false,
      },
    };

    return step
      ? configs[step]
      : {
          title: "onboarding.steps.welcome",
          description: "onboarding.steps.welcomeDescription",
          canProceed: true,
          requiresAuth: false,
          requiresStores: false,
        };
  }

  /**
   * Get complete onboarding state
   */
  static getState(
    currentUser: UserSimpleOutput | null,
    guestStep: UserOnboardingStep | null,
    isAuthenticated: boolean,
  ): OnboardingState {
    const onboardingStep = currentUser?.onboardingStep ?? null;
    const effectiveStep = OnboardingServiceBase.getEffectiveStep(
      currentUser,
      guestStep,
      isAuthenticated,
    );
    const needsStores = OnboardingServiceBase.shouldShowStores(
      currentUser,
      isAuthenticated,
    );
    const isComplete = OnboardingServiceBase.isOnboardingComplete(currentUser);
    const canProceed =
      OnboardingServiceBase.canProceedToNextStep(effectiveStep);

    const state: OnboardingState = {
      isAuthenticated,
      currentUser,
      onboardingStep,
      effectiveStep,
      needsStores,
      isComplete,
      canProceed,
    };

    addSpanAttributes({
      "onboarding.state.needs_stores": needsStores ? "true" : "false",
      "onboarding.state.is_complete": isComplete ? "true" : "false",
      "onboarding.state.can_proceed": canProceed ? "true" : "false",
    });

    return state;
  }

  /**
   * Validate onboarding state for errors
   */
  static validateOnboardingState(state: OnboardingState): {
    isValid: boolean;
    errors: string[];
  } {
    const errors: string[] = [];

    // Check for invalid state combinations
    if (state.isAuthenticated && !state.currentUser) {
      errors.push("Authenticated user not found");
    }

    if (
      state.needsStores &&
      state.effectiveStep !== UserOnboardingStep.STORE_CREATED
    ) {
      errors.push("Stores needed but not in store creation step");
    }

    if (state.isComplete && state.effectiveStep !== null) {
      errors.push("Onboarding complete but still showing step");
    }

    const isValid = errors.length === 0;

    if (!isValid) {
      logger.error(
        enhanceLogWithTraceContext({
          errors,
          state,
        }),
        "Onboarding state validation failed",
      );
    }

    return { isValid, errors };
  }
}

export const OnboardingService = traceStaticClass(OnboardingServiceBase);
