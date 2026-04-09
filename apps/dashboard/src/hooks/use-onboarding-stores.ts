import type { OnboardingState } from "@dukkani/common/services";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { shouldAutoSelectStore } from "@/lib/onboarding.utils";
import { appQueries } from "@/shared/api/queries";

/**
 * Hook for managing store-related onboarding logic
 * Handles store loading, auto-selection, and state management
 */
export function useOnboardingStores(onboardingState: OnboardingState) {
  const [storeId, setStoreId] = useState<string | null>(null);
  const { data: stores, isLoading: isStoresLoading } = useQuery(
    appQueries.store.all({ enabled: onboardingState.needsStores }),
  );

  useEffect(() => {
    if (!stores?.length) return;

    if (shouldAutoSelectStore(onboardingState.onboardingStep, storeId)) {
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
