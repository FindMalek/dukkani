"use client";

import { Badge } from "@dukkani/ui/components/badge";
import { Button } from "@dukkani/ui/components/button";
import { Icons } from "@dukkani/ui/components/icons";
import { Skeleton } from "@dukkani/ui/components/skeleton";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { CartDrawer } from "@/components/app/cart-drawer";
import { useCartHydration } from "@/hooks/use-cart-hydration";
import { isDetailPage } from "@/lib/routes";
import { useCartStore } from "@/stores/cart.store";

interface StoreHeaderProps {
	storeName: string;
}

export function StoreHeader({ storeName }: StoreHeaderProps) {
	const router = useRouter();
	const pathname = usePathname();

	const isCartDrawerOpen = useCartStore((state) => state.isCartDrawerOpen);
	const setCartDrawerOpen = useCartStore((state) => state.setCartDrawerOpen);

	const isHydrated = useCartHydration();
	const isDetail = isDetailPage(pathname);
	const cartCount = useCartStore((state) => state.getTotalItems());

	return (
		<>
			<header className="fixed top-0 right-0 left-0 z-50 border-border/30 border-b bg-background/80 backdrop-blur-md">
				<div className="container mx-auto px-4 py-2">
					<div className="flex items-center justify-between">
						{isDetail ? (
							<Button
								variant="ghost"
								size="icon"
								className="size-8"
								onClick={() => router.back()}
							>
								<Icons.arrowLeft className="size-4" />
							</Button>
						) : (
							<div className="flex items-center gap-2">
								<h1 className="font-semibold text-base">{storeName}</h1>
							</div>
						)}
						<Button
							variant="ghost"
							size="icon"
							className="relative size-8"
							onClick={() => setCartDrawerOpen(true)}
						>
							<Icons.shoppingCart className="size-4" />
							{!isHydrated ? (
								<Skeleton className="-top-0.5 -right-0.5 absolute size-4 rounded-full" />
							) : cartCount > 0 ? (
								<Badge
									variant="default"
									className="-top-0.5 -right-0.5 absolute size-4 p-0 text-[10px] leading-none"
								>
									{cartCount}
								</Badge>
							) : null}
						</Button>
					</div>
				</div>
			</header>
			<CartDrawer open={isCartDrawerOpen} onOpenChange={setCartDrawerOpen} />
		</>
	);
}
