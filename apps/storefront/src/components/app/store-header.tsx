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
		<header className="fixed top-0 right-0 left-0 z-50 border-border/30 border-b bg-background/80 backdrop-blur-md">
			<div className="container mx-auto px-4 py-2">
				<div className="flex items-center justify-between">
					<h1 className="font-semibold text-base">{storeName}</h1>
					<Button variant="ghost" size="icon" className="relative size-8">
						<Icons.shoppingCart className="size-4" />
						{!isHydrated ? (
							<Skeleton className="absolute -top-0.5 -right-0.5 size-4 rounded-full" />
						) : cartCount > 0 ? (
							<Badge
								variant="default"
								className="absolute -top-0.5 -right-0.5 size-4 p-0 text-[10px] leading-none"
							>
								{cartCount}
							</Badge>
						) : null}
					</Button>
				</div>
			</div>
		</header>
	);
}
