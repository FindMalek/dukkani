"use client";

import type { ListProductOutput } from "@dukkani/common/schemas/product/output";
import { formatCurrency } from "@dukkani/common/utils";
import { Badge } from "@dukkani/ui/components/badge";
import { Icons } from "@dukkani/ui/components/icons";
import { cn } from "@dukkani/ui/lib/utils";
import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import { RoutePaths } from "@/lib/routes";
import { ProductCardDropdown } from "./product-card-dropdown";

interface ProductListCardProps {
	product: ListProductOutput;
	onDelete: (id: string) => void;
	onTogglePublish: (id: string, published: boolean) => void;
}

export function ProductListCard({
	product,
	onDelete,
	onTogglePublish,
}: ProductListCardProps) {
	const t = useTranslations("products.list");
	const locale = useLocale();

	const firstImageUrl = product.imageUrls[0];
	const isOutOfStock = product.stock === 0;
	const variantCount = product.variantCount;

	const stockText = isOutOfStock
		? variantCount > 0
			? t("outOfStockVariants", { variants: variantCount })
			: t("outOfStock")
		: variantCount > 0
			? t("stockInfo", { count: product.stock, variants: variantCount })
			: t("stockInfoNoVariants", { count: product.stock });

	return (
		<Link
			href={RoutePaths.PRODUCTS.DETAIL.url(product.id)}
			className={cn(
				"flex items-center gap-4 rounded-lg border bg-card p-4 transition-colors",
				"hover:bg-accent/50",
			)}
		>
			{/* Thumbnail */}
			<div className="size-14 shrink-0 overflow-hidden rounded-md bg-muted">
				{firstImageUrl ? (
					<img
						src={firstImageUrl}
						alt={product.name}
						className="size-full object-cover"
					/>
				) : (
					<div className="flex size-full items-center justify-center">
						<Icons.package className="size-6 text-muted-foreground" />
					</div>
				)}
			</div>

			{/* Content */}
			<div className="min-w-0 flex-1">
				<p className="truncate font-medium">{product.name}</p>
				<p className="mt-0.5 font-medium text-primary">
					{formatCurrency(product.price, "TND", locale)}
				</p>
				<p
					className={cn(
						"mt-0.5 text-muted-foreground text-sm",
						isOutOfStock && "font-medium text-destructive",
					)}
				>
					{stockText}
				</p>
			</div>

			{/* Status & Actions */}
			<div className="flex shrink-0 items-center gap-2">
				<Badge
					variant={product.published ? "default" : "secondary"}
					className="shrink-0"
				>
					{product.published ? t("status.published") : t("status.draft")}
				</Badge>
				<Icons.chevronRight className="size-4 text-muted-foreground" />
				<ProductCardDropdown
					product={product}
					onDelete={onDelete}
					onTogglePublish={onTogglePublish}
				/>
			</div>
		</Link>
	);
}
