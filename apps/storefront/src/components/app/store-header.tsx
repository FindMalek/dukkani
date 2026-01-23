"use client";

import { Badge } from "@dukkani/ui/components/badge";
import { Button } from "@dukkani/ui/components/button";
import { Icons } from "@dukkani/ui/components/icons";

interface StoreHeaderProps {
	storeName: string;
	cartCount?: number;
}

export function StoreHeader({ storeName, cartCount = 0 }: StoreHeaderProps) {
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
