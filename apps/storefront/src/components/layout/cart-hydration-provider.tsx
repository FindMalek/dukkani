"use client";

import { useCartHydration } from "@/hooks/use-cart-hydration";

interface CartHydrationProviderProps {
	children: React.ReactNode;
}

/**
 * Provider component that handles cart store hydration
 * Wrap your app with this to ensure cart is hydrated before rendering
 */
export function CartHydrationProvider({
	children,
}: CartHydrationProviderProps) {
	useCartHydration();
	return <>{children}</>;
}
