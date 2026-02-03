"use client";

import { Button } from "@dukkani/ui/components/button";
import {
	Drawer,
	DrawerClose,
	DrawerContent,
	DrawerFooter,
	DrawerHeader,
	DrawerTitle,
} from "@dukkani/ui/components/drawer";
import { Icons } from "@dukkani/ui/components/icons";
import { Spinner } from "@dukkani/ui/components/spinner";
import { useQuery } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import { useMemo } from "react";
import { getCartKey, getItemKey } from "@/lib/cart-utils";
import { orpc } from "@/lib/orpc";
import { RoutePaths, useRouter } from "@/lib/routes";
import { useCartStore } from "@/stores/cart.store";
import { CartItem as CartItemComponent } from "./cart-item";

interface CartDrawerProps {
	open: boolean;
	onOpenChange: (open: boolean) => void;
}

export function CartDrawer({ open, onOpenChange }: CartDrawerProps) {
	const router = useRouter();
	const t = useTranslations("storefront.store.cart");

	// Select data directly instead of calling a function
	const carts = useCartStore((state) => state.carts);
	const currentStoreSlug = useCartStore((state) => state.currentStoreSlug);

	// Compute cart items from state
	const cartItems = useMemo(() => {
		if (!currentStoreSlug) return [];
		const cartKey = getCartKey(currentStoreSlug);
		return carts[cartKey] || [];
	}, [carts, currentStoreSlug]);

	// Create stable query input - only changes when items are added/removed (by item keys), not quantities
	// This prevents refetching when only quantities change
	const itemKeysString = useMemo(() => {
		return cartItems.map(getItemKey).sort().join(",");
	}, [cartItems]);

	const queryInput = useMemo(() => {
		return {
			items: cartItems.map((item) => ({
				productId: item.productId,
				variantId: item.variantId,
				quantity: item.quantity,
			})),
		};
		// Only depend on which items exist, not their quantities
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [itemKeysString]);

	const enrichedCartItems = useQuery({
		...orpc.cart.getCartItems.queryOptions({
			input: queryInput,
		}),
		enabled: open && cartItems.length > 0,
		staleTime: 30 * 1000,
		// Keep previous data to prevent flicker
		placeholderData: (previousData) => previousData,
	});

	/**
	 * Merge server data with current cart state (optimistic updates)
	 * Strategy:
	 * 1. Filter: Only include items that exist in cartItems (removes deleted items immediately)
	 * 2. Merge: Update quantities from store (optimistic update for quantity changes)
	 */
	const enrichedData = useMemo(() => {
		if (!enrichedCartItems.data) return undefined;
		if (cartItems.length === 0) return [];

		// Step 1: Filter - only include items that exist in cartItems
		// This ensures deleted items disappear immediately
		const filteredData = enrichedCartItems.data.filter((enrichedItem) => {
			return cartItems.some(
				(item) =>
					item.productId === enrichedItem.productId &&
					item.variantId === enrichedItem.variantId,
			);
		});

		// Step 2: Merge - update quantities from store (optimistic update)
		return filteredData.map((enrichedItem) => {
			const currentItem = cartItems.find(
				(item) =>
					item.productId === enrichedItem.productId &&
					item.variantId === enrichedItem.variantId,
			);

			// Use current quantity from store (optimistic)
			// currentItem should always exist due to filter above, but check for safety
			return {
				...enrichedItem,
				quantity: currentItem?.quantity ?? enrichedItem.quantity,
			};
		});
	}, [enrichedCartItems.data, cartItems]);

	const totalPrice =
		enrichedData?.reduce((total, item) => {
			return total + item.price * item.quantity;
		}, 0) ?? 0;

	const formattedTotal = totalPrice.toFixed(3);
	const hasItems = enrichedData && enrichedData.length > 0;

	const handleCheckout = () => {
		onOpenChange(false);
		router.push(RoutePaths.CHECKOUT.url);
	};

	return (
		<Drawer open={open} onOpenChange={onOpenChange}>
			<DrawerContent className="max-h-[85vh]">
				<div className="flex-1 overflow-y-auto px-4">
					{enrichedCartItems.isLoading && !enrichedData ? (
						<div className="flex items-center justify-center py-8">
							<Spinner className="size-6 animate-spin text-muted-foreground" />
						</div>
					) : !hasItems ? (
						<div className="flex flex-col items-center justify-center gap-4 py-12">
							<Icons.shoppingCart className="size-12 text-muted-foreground" />
							<p className="text-center text-muted-foreground">{t("empty")}</p>
						</div>
					) : (
						<div className="py-2">
							{enrichedData.map((item) => (
								<CartItemComponent
									key={`${item.productId}-${item.variantId ?? "no-variant"}`}
									item={{
										productId: item.productId,
										variantId: item.variantId,
										quantity: item.quantity,
									}}
									productName={item.productName}
									productImage={item.productImage}
									productDescription={item.productDescription}
									price={item.price}
									stock={item.stock}
								/>
							))}
						</div>
					)}
				</div>

				{hasItems && (
					<DrawerFooter className="border-border border-t">
						<Button
							className="w-full bg-primary text-primary-foreground"
							size="lg"
							onClick={handleCheckout}
							disabled={enrichedCartItems.isLoading}
						>
							<div className="flex w-full items-center justify-between">
								<div className="flex items-center gap-2">
									<Icons.shoppingCart className="size-4" />
									<span>{t("checkout")}</span>
								</div>
								<div className="flex items-center gap-2">
									<span className="font-semibold text-sm">
										{formattedTotal} TND
									</span>
									<Icons.arrowRight className="size-4" />
								</div>
							</div>
						</Button>
					</DrawerFooter>
				)}
			</DrawerContent>
		</Drawer>
	);
}
