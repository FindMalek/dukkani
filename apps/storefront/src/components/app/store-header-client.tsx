"use client";

import { useCartStore } from "@/stores/cart.store";
import { StoreHeader } from "./store-header";

interface StoreHeaderClientProps {
	storeName: string;
}

export function StoreHeaderClient({ storeName }: StoreHeaderClientProps) {
	const cartCount = useCartStore((state) => state.getTotalItems());

	return <StoreHeader storeName={storeName} cartCount={cartCount} />;
}
