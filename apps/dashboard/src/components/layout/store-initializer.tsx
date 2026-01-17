"use client";

import { useInitializeActiveStore } from "@/hooks/use-initialize-active-store";

/**
 * Client component that initializes the active store.
 * Should be used in dashboard layouts to ensure store is initialized.
 */
export function StoreInitializer({ children }: { children: React.ReactNode }) {
	useInitializeActiveStore();
	return <>{children}</>;
}
