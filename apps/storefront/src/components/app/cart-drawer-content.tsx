"use client";

import { Button } from "@dukkani/ui/components/button";
import { Icons } from "@dukkani/ui/components/icons";
import { useTranslations } from "next-intl";
import { CartDrawerItem } from "@/components/app/cart-drawer-item";
import { useCartStore } from "@/stores/cart.store";

export function CartDrawerContent() {
	const t = useTranslations("storefront.store.cart");
	const items = useCartStore((state) => state.getItems());
	const removeItem = useCartStore((state) => state.removeItem);
	const updateQuantity = useCartStore((state) => state.updateQuantity);

	const subtotal = items.reduce(
		(sum, item) => sum + item.product.price * item.quantity,
		0,
	);

	const handleCheckout = () => {
		// Placeholder: link to checkout when implemented
	};

	return (
		<div className="flex flex-1 flex-col overflow-hidden">
			<div className="flex-1 overflow-y-auto px-4 py-2">
				<div className="space-y-4">
					{items.map((item) => (
						<CartDrawerItem
							key={item.productId}
							item={item}
							onRemove={() => removeItem(item.productId)}
							onQuantityChange={(quantity: number) =>
								updateQuantity(item.productId, quantity)
							}
						/>
					))}
				</div>
			</div>
			<div className="border-border border-t bg-background p-4">
				<div className="mb-4 flex items-center justify-between">
					<span className="text-muted-foreground">{t("subtotal")}</span>
					<span className="font-semibold text-lg">
						{subtotal.toFixed(3)} TND
					</span>
				</div>
				<Button
					className="w-full bg-primary text-primary-foreground"
					onClick={handleCheckout}
					size="lg"
				>
					<Icons.shoppingCart className="mr-2 size-4" />
					{t("checkout")}
				</Button>
			</div>
		</div>
	);
}
