import type { UserOnboardingStep } from "@dukkani/common/schemas";
import { useMemo } from "react";
import { useCurrentUserQuery } from "@/hooks/api/use-current-user.hook";
import { authClient } from "@/lib/auth-client";
import { type OnboardingState, onboardingService } from "@/lib/onboarding";

/**
 * Main hook for onboarding state management
 * Replaces complex logic from OnboardingPage component
 */
export function useOnboarding(guestStep?: UserOnboardingStep | null) {
	const { data: sessionData, isPending: isSessionPending } =
		authClient.useSession();
	const { data: currentUser, isLoading: isCurrentUserLoading } =
		useCurrentUserQuery(!!sessionData?.user);

	const isAuthenticated = !!sessionData?.user;

	const onboardingState = useMemo((): OnboardingState => {
		return onboardingService.getState(
			currentUser ?? null,
			guestStep ?? null,
			isAuthenticated,
		);
	}, [currentUser, guestStep, isAuthenticated]);

	return {
		isAuthenticated,
		isSessionPending,
		isCurrentUserLoading,
		currentUser: currentUser ?? null,
		onboardingStep: onboardingState.onboardingStep,
		effectiveStep: onboardingState.effectiveStep,
		needsStores: onboardingState.needsStores,
		isComplete: onboardingState.isComplete,
		canProceed: onboardingState.canProceed,
		// Actions
		getNextStep: () =>
			onboardingService.getNextStep(onboardingState.effectiveStep),
		getPreviousStep: () =>
			onboardingService.getPreviousStep(onboardingState.effectiveStep),
		canProceedToNext: () =>
			onboardingService.canProceedToNextStep(onboardingState.effectiveStep),
		isValidTransition: (toStep: UserOnboardingStep | null) =>
			onboardingService.isValidStepTransition(
				onboardingState.effectiveStep,
				toStep,
			),
		getStepConfig: () =>
			onboardingService.getStepConfig(onboardingState.effectiveStep),
	};
}
