"use client";

import { useEffect, useState } from "react";
import { useCartStore } from "@/stores/cart.store";

/**
 * Hook to handle cart store hydration from localStorage
 * Should be called once at the app level (in a layout or provider)
 */
export function useCartHydration() {
	const [isHydrated, setIsHydrated] = useState(false);

	useEffect(() => {
		useCartStore.persist.rehydrate();
		setIsHydrated(true);
	}, []);

	return isHydrated;
}
