"use client";

import { Badge } from "@dukkani/ui/components/badge";
import { Button } from "@dukkani/ui/components/button";
import { Icons } from "@dukkani/ui/components/icons";
import { useCartStore } from "@/stores/cart.store";

interface StoreHeaderProps {
	storeName: string;
}

export function StoreHeader({ storeName }: StoreHeaderProps) {
	const cartCount = useCartStore((state) => state.getTotalItems());

	return (
		<header className="container mx-auto px-4 py-4">
			<div className="flex items-center justify-between">
				<h1 className="font-bold text-lg">{storeName}</h1>
				<Button variant="ghost" size="icon" className="relative">
					<Icons.shoppingCart className="size-5" />
					{cartCount > 0 && (
						<Badge
							variant="default"
							className="absolute -top-1 -right-1 size-5 p-0 text-xs"
						>
							{cartCount}
						</Badge>
					)}
				</Button>
			</div>
		</header>
	);
}
