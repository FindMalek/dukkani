"use client";

import { Badge } from "@dukkani/ui/components/badge";
import { Button } from "@dukkani/ui/components/button";
import { Icons } from "@dukkani/ui/components/icons";
import { Skeleton } from "@dukkani/ui/components/skeleton";
import { useCartHydration } from "@/hooks/use-cart-hydration";
import { useCartStore } from "@/stores/cart.store";

interface StoreHeaderProps {
	storeName: string;
}

export function StoreHeader({ storeName }: StoreHeaderProps) {
	const cartCount = useCartStore((state) => state.getTotalItems());
	const isHydrated = useCartHydration();

	return (
		<header className="container mx-auto px-4 py-4">
			<div className="flex items-center justify-between">
				<h1 className="font-bold text-lg">{storeName}</h1>
				<Button variant="ghost" size="icon" className="relative">
					<Icons.shoppingCart className="size-5" />
					{!isHydrated ? (
						// Show skeleton during hydration
						<Skeleton className="absolute -top-1 -right-1 size-5 rounded-full" />
					) : cartCount > 0 ? (
						// Show actual badge after hydration if cart has items
						<Badge
							variant="default"
							className="absolute -top-1 -right-1 size-5 p-0 text-xs"
						>
							{cartCount}
						</Badge>
					) : null}
				</Button>
			</div>
		</header>
	);
}
