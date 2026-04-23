"use client";

import type { ListProductOutput } from "@dukkani/common/schemas/product/output";
import { Badge } from "@dukkani/ui/components/badge";
import { Icons } from "@dukkani/ui/components/icons";
import { SwipeableCard } from "@dukkani/ui/components/swipeable-card";
import { cn } from "@dukkani/ui/lib/utils";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { useMemo } from "react";
import { RoutePaths } from "@/shared/config/routes";
import { useFormatPriceForActiveStore } from "@/shared/lib/store/format-price.hook";
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
  const router = useRouter();
  const t = useTranslations("products.list");
  const formatPrice = useFormatPriceForActiveStore();
  const priceLabel =
    product.priceDisplay.kind === "range"
      ? `${formatPrice(product.priceDisplay.min)} – ${formatPrice(product.priceDisplay.max)}`
      : formatPrice(product.priceDisplay.price);

  const firstImageUrl = product.imageUrls[0];
  const isOutOfStock = product.stock === 0;

  const stockStatusText = isOutOfStock
    ? t("outOfStock")
    : t("stockCount", { count: product.stock });

  const actions = useMemo(
    () => [
      {
        side: "right" as const,
        className: "bg-destructive",
        icon: <Icons.trash className="size-5" />,
        label: t("actions.delete"),
        onTrigger: () => onDelete(product.id),
      },
      {
        side: "left" as const,
        className: "bg-primary",
        icon: product.published ? (
          <Icons.eyeOff className="size-5" />
        ) : (
          <Icons.eye className="size-5" />
        ),
        label: product.published
          ? t("actions.unpublish")
          : t("actions.publish"),
        onTrigger: () => onTogglePublish(product.id, !product.published),
      },
    ],
    [product.id, product.published, onDelete, onTogglePublish, t],
  );

  return (
    <SwipeableCard
      actions={actions}
      onTap={() => router.push(RoutePaths.PRODUCTS.DETAIL.url(product.id))}
      aria-label={product.name}
      className="[&_button]:p-3"
    >
      <div className="flex items-start gap-4">
        {/* Image */}
        <div className="size-20 shrink-0 overflow-hidden rounded-lg border border-border/50 bg-muted/50">
          {firstImageUrl ? (
            <Image
              key={firstImageUrl}
              src={firstImageUrl}
              alt={product.name}
              width={80}
              height={80}
              unoptimized
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
            <h3 className="line-clamp-2 font-semibold text-foreground/90 text-sm leading-tight">
              {product.name}
            </h3>

            <div
              className="-mt-1 -mr-1 shrink-0"
              onPointerDown={(e) => e.stopPropagation()}
            >
              <ProductCardDropdown
                product={product}
                onDelete={onDelete}
                onTogglePublish={onTogglePublish}
              />
            </div>
          </div>

          {/* Price */}
          <p className="mt-1.5 font-medium text-foreground text-sm">
            {priceLabel}
          </p>

          {/* Status / Meta row */}
          <div className="mt-auto flex items-center gap-3 pt-2">
            <p
              className={cn(
                "m-0 min-w-0 flex-1 truncate font-medium text-xs leading-none",
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
      </div>
    </SwipeableCard>
  );
}
