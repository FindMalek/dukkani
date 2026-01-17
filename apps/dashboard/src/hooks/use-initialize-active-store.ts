"use client";

import { useEffect } from "react";
import { useStoresQuery } from "@/hooks/api/use-stores.hook";
import { useActiveStoreStore } from "@/stores/active-store.store";

/**
 * Hook that initializes the active store by auto-selecting the first store
 * if no store is currently selected. Should be used in dashboard layouts.
 */
export function useInitializeActiveStore() {
	const { selectedStoreId, setSelectedStoreId } = useActiveStoreStore();
	const { data: stores, isLoading } = useStoresQuery(!selectedStoreId);

	useEffect(() => {
		// Auto-select first store if none is selected and stores are loaded
		if (!selectedStoreId && stores && stores.length > 0) {
			setSelectedStoreId(stores[0].id);
		}
	}, [selectedStoreId, stores, setSelectedStoreId]);

	return { isLoading: isLoading && !selectedStoreId };
}
