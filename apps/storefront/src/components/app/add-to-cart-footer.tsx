"use client";

import type { store } from "@dukkani/common/schemas";
import { Button } from "@dukkani/ui/components/button";
import { Icons } from "@dukkani/ui/components/icons";
import { QuantitySelector } from "@dukkani/ui/components/quantity-selector";
import { useFormatPriceCurrentStore } from "@dukkani/ui/hooks/use-format-price";
import { cn } from "@dukkani/ui/lib/utils";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { useCartStore } from "@/shared/lib/cart/store";

interface AddToCartFooterProps {
  productId: string;
  stock: number;
  price: number;
  currency: store.SupportedCurrencyInfer;
  selectedVariantId?: string;
  variant?: "fixed" | "inline";
  onAddToCart?: (args: { quantity: number }) => boolean | void;
}

function AddToCartFooterInner({
  productId,
  stock,
  price,
  currency,
  selectedVariantId,
  variant = "fixed",
  onAddToCart,
}: AddToCartFooterProps) {
  const t = useTranslations("storefront.store.product.addToCart");

  const [quantity, setQuantity] = useState(1);
  const formatPrice = useFormatPriceCurrentStore(currency);
  const addItem = useCartStore((state) => state.addItem);
  const setCartDrawerOpen = useCartStore((state) => state.setCartDrawerOpen);

  const isOutOfStock = stock === 0;
  const maxQuantity = Math.min(stock, 99);

  const handleDecrease = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleIncrease = () => {
    if (quantity < maxQuantity) {
      setQuantity(quantity + 1);
    }
  };

  const handleAddToCart = () => {
    if (isOutOfStock) return;
    if (onAddToCart) {
      const ok = onAddToCart({ quantity });
      if (ok === false) return;
    } else {
      addItem(productId, quantity, selectedVariantId);
    }
    setCartDrawerOpen(true);
  };

  return (
    <div
      className={cn(
        "border-border border-t",
        variant === "fixed"
          ? "fixed inset-x-0 bottom-0 z-40 mb-0 bg-background/95 backdrop-blur-sm"
          : "bg-background pt-3",
      )}
    >
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center gap-3">
          <QuantitySelector
            quantity={quantity}
            onDecrease={handleDecrease}
            onIncrease={handleIncrease}
            min={1}
            max={maxQuantity}
            disabled={isOutOfStock}
            size="md"
          />

          <Button
            className="flex-1 bg-primary text-primary-foreground"
            onClick={handleAddToCart}
            disabled={isOutOfStock}
          >
            <div className="flex flex-1 items-center justify-between">
              <div className="flex items-center gap-2">
                <Icons.shoppingCart className="size-4" />
                <span>{isOutOfStock ? t("outOfStock") : t("button")}</span>
              </div>
              <span className="text-sm">-</span>
              <span className="font-semibold tabular-nums" dir="ltr">
                {formatPrice(price)}
              </span>
            </div>
          </Button>
        </div>
      </div>
    </div>
  );
}

/**
 * Remounts quantity state when the selected variant changes (`key` on inner component).
 */
export function AddToCartFooter(props: AddToCartFooterProps) {
  return (
    <AddToCartFooterInner
      key={props.selectedVariantId ?? "__base__"}
      {...props}
    />
  );
}
