"use client";

import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { appQueries } from "@/shared/api/queries";
import { useActiveStoreStore } from "@/shared/lib/store/active.store";

/**
 * Client component that initializes the active store.
 * Should be used in dashboard layouts to ensure store is initialized.
 */
export function StoreInitializer({ children }: { children: React.ReactNode }) {
  const { selectedStoreId, setSelectedStoreId, setIsLoading } =
    useActiveStoreStore();
  const { data: stores, isLoading } = useQuery(
    appQueries.store.all({ enabled: !selectedStoreId }),
  );

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
  return <>{children}</>;
}
