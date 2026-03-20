import type { UserOnboardingStep } from "@dukkani/common/schemas/enums";
import type { OnboardingState } from "@dukkani/common/services";
import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";
import { authClient } from "@/lib/auth-client";
import {
	canProceedToNextStep,
	getNextStep,
	getPreviousStep,
	isValidStepTransition,
} from "@/lib/onboarding.utils";
import { client } from "@/lib/orpc";

/**
 * Main hook for onboarding state management
 * Uses ORPC for server data and client utilities for pure logic
 */
export function useOnboarding(guestStep?: UserOnboardingStep | null) {
	const { data: sessionData, isPending: isSessionPending } =
		authClient.useSession();
	const { isLoading: isCurrentUserLoading } = useCurrentUserQuery(
		!!sessionData?.user,
	);

	const isAuthenticated = !!sessionData?.user;

	// Get onboarding state from ORPC
	const {
		data: onboardingState,
		isLoading: isStateLoading,
		error: stateError,
	} = useQuery({
		queryKey: ["onboarding", "state", guestStep],
		queryFn: () => client.onboarding.getState({ guestStep }),
		enabled: isAuthenticated,
		staleTime: 1000 * 60 * 5, // 5 minutes
	});

	// Fallback for unauthenticated users
	const fallbackState = useMemo((): OnboardingState => {
		return {
			isAuthenticated: false,
			currentUser: null,
			onboardingStep: null,
			effectiveStep: guestStep ?? null,
			needsStores: false,
			isComplete: false,
			canProceed: false,
		};
	}, [guestStep]);

	const state = isAuthenticated
		? (onboardingState ?? fallbackState)
		: fallbackState;

	return {
		...state,
		isLoading: isSessionPending || isCurrentUserLoading || isStateLoading,
		error: stateError,
		// Actions using client utilities
		getNextStep: () => getNextStep(state.effectiveStep),
		getPreviousStep: () => getPreviousStep(state.effectiveStep),
		canProceedToNext: () => canProceedToNextStep(state.effectiveStep),
		isValidTransition: (toStep: UserOnboardingStep | null) =>
			isValidStepTransition(state.effectiveStep, toStep),
	};
}

/**
 * Helper hook to get current user data
 * Extracted for reuse across hooks
 */
function useCurrentUserQuery(enabled: boolean) {
	return useQuery({
		queryKey: ["account", "currentUser"],
		queryFn: () => client.account.getCurrentUser(),
		enabled,
		staleTime: 1000 * 60 * 5, // 5 minutes
	});
}

/**
 * Helper hook for useOnboardingController
 * Provides the same useCurrentUserQuery interface
 */
export function useCurrentUserQueryForController(enabled: boolean) {
	return useQuery({
		queryKey: ["account", "currentUser"],
		queryFn: () => client.account.getCurrentUser(),
		enabled,
		staleTime: 1000 * 60 * 5, // 5 minutes
	});
}
