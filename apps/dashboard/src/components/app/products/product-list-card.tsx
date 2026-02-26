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

	const stockStatusText = isOutOfStock
		? t("outOfStock")
		: t("stockCount", { count: product.stock });

	const variantText =
		variantCount > 0
			? t("variantCount", { variants: variantCount })
			: isOutOfStock
				? null
				: t("noVariants");

	return (
		<Link
			href={RoutePaths.PRODUCTS.DETAIL.url(product.id)}
			className={cn(
				"group relative flex items-start gap-4 rounded-xl border bg-card p-3 transition-all hover:shadow-sm",
			)}
		>
			{/* Image */}
			<div className="size-20 shrink-0 overflow-hidden rounded-lg bg-muted/50 border border-border/50">
				{firstImageUrl ? (
					<img
						src={firstImageUrl}
						alt={product.name}
						className="size-full object-cover"
					/>
				) : (
					<div className="flex size-full items-center justify-center">
						<Icons.package className="size-6 text-muted-foreground/50" />
					</div>
				)}
			</div>

			{/* Content Stack */}
			<div className="flex flex-1 flex-col py-0.5">
				{/* Title row */}
				<div className="flex items-start justify-between gap-2">
					<h3 className="line-clamp-2 text-sm font-semibold leading-tight text-foreground/90">
						{product.name}
					</h3>

					{/* Isolate actions entirely */}
					<div className="-mt-1 -mr-1 shrink-0">
						<ProductCardDropdown
							product={product}
							onDelete={onDelete}
							onTogglePublish={onTogglePublish}
						/>
					</div>
				</div>

				{/* Price */}
				<p className="mt-1.5 text-sm font-medium text-foreground">
					{formatCurrency(product.price, "TND", locale)}
				</p>

				{/* Status / Meta row */}
				<div className="mt-auto pt-2 flex items-center gap-3">
					{/* Stock */}
					<p
						className={cn(
							"m-0 flex-1 min-w-0 truncate text-xs font-medium leading-none",
							isOutOfStock ? "text-destructive" : "text-muted-foreground",
						)}
					>
						{stockStatusText}
					</p>
					<Badge
						variant={product.published ? "statusSuccess" : "statusMuted"}
						size="sm"
						className="ml-auto shrink-0"
					>
						{product.published ? t("status.published") : t("status.draft")}
					</Badge>
				</div>
			</div>
		</Link>
	);
}
