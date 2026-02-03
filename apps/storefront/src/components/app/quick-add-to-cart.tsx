"use client";

import type { ProductPublicOutput } from "@dukkani/common/schemas/product/output";
import { Button } from "@dukkani/ui/components/button";
import {
	Drawer,
	DrawerClose,
	DrawerContent,
	DrawerDescription,
	DrawerFooter,
	DrawerHeader,
	DrawerTitle,
} from "@dukkani/ui/components/drawer";
import { Icons } from "@dukkani/ui/components/icons";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { ProductAttributes } from "@/components/app/product-attributes";
import { ProductImageCarousel } from "@/components/app/product-image-carousel";
import { ProductVariantManager } from "@/components/app/product-variant-manager";
import { RoutePaths } from "@/lib/routes";

interface QuickAddToCartProps {
	product: ProductPublicOutput;
	open: boolean;
	onOpenChange: (open: boolean) => void;
}

export function QuickAddToCart({
	product,
	open,
	onOpenChange,
}: QuickAddToCartProps) {
	const t = useTranslations("storefront.store.product.quickAdd");

	const router = useRouter();
	const hasVariants = (product.variants?.length ?? 0) > 0;

	const handleViewDetails = () => {
		onOpenChange(false);
		router.push(RoutePaths.PRODUCTS.DETAIL.url(product.id));
	};

	return (
		<Drawer open={open} onOpenChange={onOpenChange}>
			<DrawerContent className="max-h-[90vh]">
				<DrawerHeader className="sr-only">
					<DrawerTitle>{product.name}</DrawerTitle>
					{product.description && (
						<DrawerDescription>{product.description}</DrawerDescription>
					)}
				</DrawerHeader>

				<div className="flex-1 overflow-y-auto px-4">
					{/* Product Image Carousel - Same as detail page */}
					<div className="w-full">
						<ProductImageCarousel
							images={product.imagesUrls || []}
							productName={product.name}
						/>
					</div>

					{/* Product Info - Exact same layout as detail page */}
					<div className="mt-4 space-y-4">
						<h2 className="font-bold text-foreground text-xl">
							{product.name}
						</h2>

						<ProductAttributes tags={product.tags} />

						{/* Product Variant Manager - Reused exactly as-is */}
						<ProductVariantManager
							productId={product.id}
							productStock={product.stock}
							productPrice={product.price}
							hasVariants={hasVariants}
							variantOptions={product.variantOptions}
							variants={product.variants}
							variant="inline"
							onAddToCart={() => onOpenChange(false)}
						/>
					</div>
				</div>

				{/* View Full Details Link */}
				<DrawerFooter className="border-border border-t pt-4">
					<Button
						variant="outline"
						className="w-full"
						onClick={handleViewDetails}
						asChild
					>
						<Link href={RoutePaths.PRODUCTS.DETAIL.url(product.id)}>
							{t("viewDetails")}
							<Icons.arrowRight className="ml-2 size-4" />
						</Link>
					</Button>
				</DrawerFooter>
			</DrawerContent>
		</Drawer>
	);
}
