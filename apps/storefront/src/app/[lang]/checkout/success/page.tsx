"use client";

import { Button } from "@dukkani/ui/components/button";
import { Icons } from "@dukkani/ui/components/icons";
import { useTranslations } from "next-intl";
import { useEffect } from "react";
import { RoutePaths, useRouter } from "@/lib/routes";
import { useCartStore } from "@/stores/cart.store";

export default function CheckoutSuccessPage() {
	const t = useTranslations("storefront.store.checkout.success");
	const router = useRouter();
	const clearCart = useCartStore((state) => state.clearCart);

	// Clear cart on mount
	useEffect(() => {
		clearCart();
	}, [clearCart]);

	return (
		<div className="container mx-auto max-w-2xl px-4 py-16">
			<div className="flex flex-col items-center justify-center text-center">
				{/* Success Icon */}
				<div className="mb-6 flex size-16 items-center justify-center rounded-full bg-primary/10">
					<Icons.check className="size-8 text-primary" />
				</div>

				{/* Title */}
				<h1 className="mb-4 font-bold text-3xl">{t("title")}</h1>

				{/* Message */}
				<p className="mb-8 text-lg text-muted-foreground">{t("message")}</p>

				{/* Continue Shopping Button */}
				<Button
					onClick={() => router.push(RoutePaths.HOME.url)}
					size="lg"
					className="bg-primary text-primary-foreground"
				>
					{t("continueShopping")}
				</Button>
			</div>
		</div>
	);
}
