import { UserOnboardingStep } from "@dukkani/common/schemas";
import type { UserSimpleOutput } from "@dukkani/common/schemas/user/output";

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
 * Centralized service for onboarding business logic
 * Extracted from OnboardingPage component for better maintainability and reusability
 */
export const onboardingService = {
	/**
	 * Calculate the effective onboarding step based on user state and guest step
	 * This replaces the complex useMemo logic from the component
	 */
	getEffectiveStep(
		currentUser: UserSimpleOutput | null,
		guestStep: UserOnboardingStep | null,
		isAuthenticated: boolean,
	): UserOnboardingStep | null {
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
	},

	/**
	 * Determine if stores should be loaded for the current onboarding state
	 */
	shouldShowStores(
		currentUser: UserSimpleOutput | null,
		isAuthenticated: boolean,
	): boolean {
		return (
			isAuthenticated &&
			!!currentUser &&
			(currentUser.onboardingStep === UserOnboardingStep.STORE_CREATED ||
				currentUser.onboardingStep === UserOnboardingStep.STORE_CONFIGURED)
		);
	},

	/**
	 * Check if onboarding is complete
	 */
	isOnboardingComplete(currentUser: UserSimpleOutput | null): boolean {
		return currentUser?.onboardingStep === UserOnboardingStep.STORE_LAUNCHED;
	},

	/**
	 * Check if user can proceed to the next step
	 */
	canProceedToNextStep(currentStep: UserOnboardingStep | null): boolean {
		if (!currentStep) return false;
		return currentStep !== UserOnboardingStep.STORE_LAUNCHED;
	},

	/**
	 * Get the next step in the onboarding flow
	 */
	getNextStep(
		currentStep: UserOnboardingStep | null,
	): UserOnboardingStep | null {
		const steps = [
			UserOnboardingStep.STORE_SETUP,
			UserOnboardingStep.STORE_CREATED,
			UserOnboardingStep.STORE_CONFIGURED,
			UserOnboardingStep.STORE_LAUNCHED,
		];

		if (!currentStep) return steps[0];

		const currentIndex = steps.indexOf(currentStep);
		return currentIndex < steps.length - 1 ? steps[currentIndex + 1] : null;
	},

	/**
	 * Get the previous step in the onboarding flow
	 */
	getPreviousStep(
		currentStep: UserOnboardingStep | null,
	): UserOnboardingStep | null {
		const steps = [
			UserOnboardingStep.STORE_SETUP,
			UserOnboardingStep.STORE_CREATED,
			UserOnboardingStep.STORE_CONFIGURED,
			UserOnboardingStep.STORE_LAUNCHED,
		];

		if (!currentStep) return null;

		const currentIndex = steps.indexOf(currentStep);
		return currentIndex > 0 ? steps[currentIndex - 1] : null;
	},

	/**
	 * Determine if store should be auto-selected based on onboarding step
	 */
	shouldAutoSelectStore(
		onboardingStep: UserOnboardingStep | null,
		storeId: string | null,
	): boolean {
		if (!onboardingStep) return false;

		return (
			(onboardingStep === UserOnboardingStep.STORE_CREATED ||
				onboardingStep === UserOnboardingStep.STORE_CONFIGURED) &&
			storeId == null
		);
	},

	/**
	 * Get complete onboarding state
	 */
	getState(
		currentUser: UserSimpleOutput | null,
		guestStep: UserOnboardingStep | null,
		isAuthenticated: boolean,
	): OnboardingState {
		const onboardingStep = currentUser?.onboardingStep ?? null;
		const effectiveStep = this.getEffectiveStep(
			currentUser,
			guestStep,
			isAuthenticated,
		);
		const needsStores = this.shouldShowStores(currentUser, isAuthenticated);
		const isComplete = this.isOnboardingComplete(currentUser);
		const canProceed = this.canProceedToNextStep(effectiveStep);

		return {
			isAuthenticated,
			currentUser,
			onboardingStep,
			effectiveStep,
			needsStores,
			isComplete,
			canProceed,
		};
	},

	/**
	 * Validate if a step transition is allowed
	 */
	isValidStepTransition(
		fromStep: UserOnboardingStep | null,
		toStep: UserOnboardingStep | null,
	): boolean {
		if (!fromStep || !toStep) return true;

		const steps = [
			UserOnboardingStep.STORE_SETUP,
			UserOnboardingStep.STORE_CREATED,
			UserOnboardingStep.STORE_CONFIGURED,
			UserOnboardingStep.STORE_LAUNCHED,
		];

		const fromIndex = steps.indexOf(fromStep);
		const toIndex = steps.indexOf(toStep);

		// Allow forward movement and staying on the same step
		// Don't allow backward movement in onboarding
		return toIndex >= fromIndex;
	},

	/**
	 * Get step configuration for UI purposes
	 */
	getStepConfig(step: UserOnboardingStep | null): OnboardingStepConfig {
		const configs: Record<UserOnboardingStep, OnboardingStepConfig> = {
			[UserOnboardingStep.STORE_SETUP]: {
				title: "Store Setup",
				description: "Create your store",
				canProceed: true,
				requiresAuth: true,
				requiresStores: false,
			},
			[UserOnboardingStep.STORE_CREATED]: {
				title: "Store Created",
				description: "Configure your store",
				canProceed: true,
				requiresAuth: true,
				requiresStores: true,
			},
			[UserOnboardingStep.STORE_CONFIGURED]: {
				title: "Store Configured",
				description: "Launch your store",
				canProceed: true,
				requiresAuth: true,
				requiresStores: true,
			},
			[UserOnboardingStep.STORE_LAUNCHED]: {
				title: "Store Launched",
				description: "Onboarding complete",
				canProceed: false,
				requiresAuth: true,
				requiresStores: false,
			},
		};

		return step
			? configs[step]
			: {
					title: "Welcome",
					canProceed: true,
					requiresAuth: false,
					requiresStores: false,
				};
	},
};
