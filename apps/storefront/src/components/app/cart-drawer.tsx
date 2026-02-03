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
import { orpc } from "@/lib/orpc";
import { RoutePaths, useRouter } from "@/lib/routes";
import { useCartStore } from "@/stores/cart.store";
import { CartItem } from "./cart-item";

interface CartDrawerProps {
	open: boolean;
	onOpenChange: (open: boolean) => void;
}

export function CartDrawer({ open, onOpenChange }: CartDrawerProps) {
	const router = useRouter();
	const t = useTranslations("storefront.store.cart");

	const cartItems = useCartStore((state) => state.getCartItems());
	const enrichedCartItems = useQuery({
		...orpc.cart.getCartItems.queryOptions({
			input: {
				items: cartItems.map((item) => ({
					productId: item.productId,
					variantId: item.variantId,
					quantity: item.quantity,
				})),
			},
		}),
		enabled: open && cartItems.length > 0,
		staleTime: 30 * 1000,
	});

	// Fix: enrichedCartItems.data is an array, so reduce works
	const totalPrice =
		enrichedCartItems.data?.reduce((total, item) => {
			return total + item.price * item.quantity;
		}, 0) ?? 0;

	const formattedTotal = totalPrice.toFixed(3);

	const handleCheckout = () => {
		onOpenChange(false);
		router.push(RoutePaths.CHECKOUT.url);
	};

	return (
		<Drawer open={open} onOpenChange={onOpenChange}>
			<DrawerContent className="max-h-[85vh]">
				<DrawerHeader>
					<div className="flex items-center justify-between">
						<DrawerTitle>{t("title")}</DrawerTitle>
						<DrawerClose asChild>
							<Button variant="ghost" size="icon" className="size-8">
								<Icons.x className="size-4" />
							</Button>
						</DrawerClose>
					</div>
				</DrawerHeader>

				<div className="flex-1 overflow-y-auto px-4">
					{productQueries.isLoading ? (
						<div className="flex items-center justify-center py-8">
							<Spinner className="size-6 animate-spin text-muted-foreground" />
						</div>
					) : itemsWithProduct.length === 0 ? (
						<div className="flex flex-col items-center justify-center gap-4 py-12">
							<Icons.shoppingCart className="size-12 text-muted-foreground" />
							<p className="text-center text-muted-foreground">{t("empty")}</p>
						</div>
					) : (
						<div className="py-2">
							{itemsWithProduct.map((item) => (
								<CartItem
									key={`${item.productId}-${item.variantId ?? "no-variant"}`}
									item={item}
									productName={item.productName ?? "Unknown Product"}
									productImage={item.productImage}
									productDescription={item.productDescription}
									price={item.price ?? 0}
									stock={item.stock ?? 0}
								/>
							))}
						</div>
					)}
				</div>

				{itemsWithProduct.length > 0 && (
					<DrawerFooter className="border-border border-t">
						<Button
							className="w-full bg-primary text-primary-foreground"
							size="lg"
							onClick={handleCheckout}
							disabled={productQueries.isLoading}
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
