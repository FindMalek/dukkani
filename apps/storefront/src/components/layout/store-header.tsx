"use client";

import type { StorePublicOutput } from "@dukkani/common/schemas/store/output";
import { Badge } from "@dukkani/ui/components/badge";
import { Button } from "@dukkani/ui/components/button";
import { Icons } from "@dukkani/ui/components/icons";
import { Skeleton } from "@dukkani/ui/components/skeleton";
import { useQuery } from "@tanstack/react-query";
import { usePathname, useRouter } from "next/navigation";
import { useMemo } from "react";
import { CartDrawer } from "@/components/app/cart-drawer";
import { useCartHydration } from "@/hooks/use-cart-hydration";
import { isCheckoutPage, isDetailPage } from "@/lib/routes";
import { orpc } from "@/lib/orpc";
import { useCartStore } from "@/stores/cart.store";
import { useCheckoutStore } from "@/stores/checkout.store";
import { OrderSummary } from "@/components/app/order-summary";

interface StoreHeaderProps {
	store: StorePublicOutput;
}

export function StoreHeader({ store }: StoreHeaderProps) {
	const router = useRouter();
	const pathname = usePathname();

	const isCartDrawerOpen = useCartStore((state) => state.isCartDrawerOpen);
	const setCartDrawerOpen = useCartStore((state) => state.setCartDrawerOpen);
	const carts = useCartStore((state) => state.carts);
	const currentStoreSlug = useCartStore((state) => state.currentStoreSlug);

	const isSummaryMinimal = useCheckoutStore((state) => state.isSummaryMinimal);

	const isHydrated = useCartHydration();
	const isDetail = isDetailPage(pathname);
	const isCheckout = isCheckoutPage(pathname);
	const cartCount = useCartStore((state) => state.getTotalItems());

	const cartItems = useMemo(() => {
		if (!currentStoreSlug) return [];
		return carts[currentStoreSlug] || [];
	}, [carts, currentStoreSlug]);

	const queryInput = useMemo(
		() => ({
			items: cartItems.map((item) => ({
				productId: item.productId,
				variantId: item.variantId,
				quantity: item.quantity,
			})),
		}),
		[cartItems],
	);

	const enrichedCartItems = useQuery({
		...orpc.cart.getCartItems.queryOptions({ input: queryInput }),
		enabled: isCheckout && cartItems.length > 0,
		staleTime: 30 * 1000,
	});

	const enrichedData = useMemo(() => {
		if (!enrichedCartItems.data) return undefined;
		if (cartItems.length === 0) return [];

		const filteredData = enrichedCartItems.data.filter((enrichedItem) =>
			cartItems.some(
				(item) =>
					item.productId === enrichedItem.productId &&
					item.variantId === enrichedItem.variantId,
			),
		);

		return filteredData.map((enrichedItem) => {
			const currentItem = cartItems.find(
				(item) =>
					item.productId === enrichedItem.productId &&
					item.variantId === enrichedItem.variantId,
			);
			return {
				...enrichedItem,
				quantity: currentItem?.quantity ?? enrichedItem.quantity,
			};
		});
	}, [enrichedCartItems.data, cartItems]);

	const showSummaryBlock = isCheckout && cartItems.length > 0;
	const summaryLoading = showSummaryBlock && enrichedCartItems.isLoading;
	const summaryReady =
		showSummaryBlock && enrichedData && enrichedData.length > 0;

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
								<h1 className="font-semibold text-base">{store.name}</h1>
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

				{showSummaryBlock && (
					<div className="border-border/30 border-t px-4 py-2">
						{summaryLoading && (
							<div className="flex items-center gap-2 py-1">
								<Skeleton className="h-4 w-24" />
								<Skeleton className="h-4 w-32" />
							</div>
						)}
						{summaryReady && (
							<OrderSummary
								items={enrichedData}
								shippingCost={store.shippingCost}
								variant={isSummaryMinimal ? "minimal" : "expanded"}
							/>
						)}
					</div>
				)}
			</header>
			<CartDrawer open={isCartDrawerOpen} onOpenChange={setCartDrawerOpen} />
		</>
	);
}
