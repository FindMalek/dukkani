"use client";

import { useEffect } from "react";
import { useStoresQuery } from "@/hooks/api/use-stores.hook";
import { useActiveStoreStore } from "@/stores/active-store.store";

/**
 * Hook that initializes the active store by auto-selecting the first store
 * if no store is currently selected. Should be used in dashboard layouts.
 */
export function useInitializeActiveStore() {
	const { selectedStoreId, setSelectedStoreId, setIsLoading } =
		useActiveStoreStore();
	const { data: stores, isLoading } = useStoresQuery(!selectedStoreId);

	// Update loading state whenever query loading state changes
	useEffect(() => {
		if (!selectedStoreId) {
			// Only update loading state if we don't have a store selected
			setIsLoading(isLoading);
		} else {
			// If we have a store, we're not loading
			setIsLoading(false);
		}
	}, [isLoading, selectedStoreId, setIsLoading]);

	useEffect(() => {
		// Auto-select first store if none is selected and stores are loaded
		if (!selectedStoreId && stores && stores.length > 0) {
			setSelectedStoreId(stores[0].id);
			setIsLoading(false);
		}
	}, [selectedStoreId, stores, setSelectedStoreId, setIsLoading]);

	return { isLoading: isLoading && !selectedStoreId };
}
