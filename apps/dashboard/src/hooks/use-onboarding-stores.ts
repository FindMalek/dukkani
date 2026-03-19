import type { UserOnboardingStep } from "@dukkani/common/schemas";
import { useEffect, useState } from "react";
import { useStoresQuery } from "@/hooks/api/use-stores.hook";
import type { OnboardingState } from "@/lib/onboarding";
import { onboardingService } from "@/lib/onboarding";

/**
 * Hook for managing store-related onboarding logic
 * Handles store loading, auto-selection, and state management
 */
export function useOnboardingStores(onboardingState: OnboardingState) {
	const [storeId, setStoreId] = useState<string | null>(null);
	const { data: stores, isLoading: isStoresLoading } = useStoresQuery(
		onboardingState.needsStores,
	);

	useEffect(() => {
		if (!stores?.length) return;

		if (
			onboardingService.shouldAutoSelectStore(
				onboardingState.onboardingStep,
				storeId,
			)
		) {
			setStoreId(stores[0].id);
		}
	}, [stores, onboardingState.onboardingStep, storeId]);

	return {
		stores,
		isLoading: isStoresLoading,
		storeId,
		setStoreId,
		hasStores: !!stores?.length,
		firstStoreId: stores?.[0]?.id ?? null,
	};
}
