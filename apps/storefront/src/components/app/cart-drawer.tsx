"use client";

import {
	Drawer,
	DrawerContent,
	DrawerHeader,
	DrawerTitle,
} from "@dukkani/ui/components/drawer";
import {
	Empty,
	EmptyDescription,
	EmptyHeader,
	EmptyMedia,
	EmptyTitle,
} from "@dukkani/ui/components/empty";
import { Icons } from "@dukkani/ui/components/icons";
import { useTranslations } from "next-intl";
import { useCartStore } from "@/stores/cart.store";
import { CartDrawerContent } from "./cart-drawer-content";

interface CartDrawerProps {
	open: boolean;
	onOpenChange: (open: boolean) => void;
}

export function CartDrawer({ open, onOpenChange }: CartDrawerProps) {
	const t = useTranslations("storefront.store.cart");
	const cartCount = useCartStore((state) => state.getTotalItems());

	return (
		<Drawer open={open} onOpenChange={onOpenChange} direction="right">
			<DrawerContent className="flex max-h-[85vh] flex-col p-0">
				<DrawerHeader className="p-4 pb-0">
					<DrawerTitle>{t("title")}</DrawerTitle>
				</DrawerHeader>
				<div className="flex min-h-0 flex-1 flex-col">
					{cartCount > 0 ? (
						<CartDrawerContent />
					) : (
						<Empty className="flex-1 py-12">
							<EmptyHeader>
								<EmptyMedia variant="icon">
									<Icons.shoppingCart className="size-6" />
								</EmptyMedia>
								<EmptyTitle>{t("empty.title")}</EmptyTitle>
								<EmptyDescription>{t("empty.description")}</EmptyDescription>
							</EmptyHeader>
						</Empty>
					)}
				</div>
			</DrawerContent>
		</Drawer>
	);
}
