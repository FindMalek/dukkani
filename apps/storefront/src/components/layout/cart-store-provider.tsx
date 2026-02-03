"use client";

import { useEffect } from "react";
import { useCartStore } from "@/stores/cart.store";

interface CartStoreProviderProps {
	children: React.ReactNode;
	storeSlug: string;
}

/**
 * Provider that sets the current store in the cart store
 * This ensures cart items are scoped to the current store
 */
export function CartStoreProvider({
	children,
	storeSlug,
}: CartStoreProviderProps) {
	const setCurrentStore = useCartStore((state) => state.setCurrentStore);

	useEffect(() => {
		setCurrentStore(storeSlug);
	}, [storeSlug, setCurrentStore]);

	return <>{children}</>;
}
