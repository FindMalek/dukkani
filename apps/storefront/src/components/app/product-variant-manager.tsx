"use client";

import type { store } from "@dukkani/common/schemas";
import type {
  VariantOptionOutput,
  VariantOutput,
} from "@dukkani/common/schemas/variant/output";
import { useCallback, useEffect } from "react";
import { VariantSelector } from "@/components/shared/variant-selector";
import { useCartStore } from "@/shared/lib/cart/store";
import { useProductVariantSelection } from "@/shared/lib/product/variant-selector.hook";
import { AddToCartFooter } from "./add-to-cart-footer";

export type VariantSelectionResolved = {
  variantId: string | undefined;
  imageUrl: string | null;
};

interface ProductVariantManagerProps {
  productId: string;
  storeCurrency: store.SupportedCurrencyInfer;
  productStock: number;
  productPrice: number;
  hasVariants: boolean;
  variantOptions?: VariantOptionOutput[];
  variants?: VariantOutput[];
  variant?: "fixed" | "inline";
  onAddToCart?: () => void;
  onVariantSelectionResolved?: (ctx: VariantSelectionResolved) => void;
}

type CartPanelProps = {
  productId: string;
  storeCurrency: store.SupportedCurrencyInfer;
  stock: number;
  price: number;
  selectedVariantId: string | undefined;
  variant: "fixed" | "inline";
  onAddToCart?: () => void;
};

/**
 * Isolated state remounts when product or variant identity changes (`key` on parent).
 */
function ProductVariantCartPanel({
  productId,
  storeCurrency,
  stock,
  price,
  selectedVariantId,
  variant,
  onAddToCart,
}: CartPanelProps) {
  const addItem = useCartStore((state) => state.addItem);

  const handleFooterAdd = useCallback(
    ({ quantity }: { quantity: number }) => {
      addItem(productId, quantity, selectedVariantId);
      onAddToCart?.();
    },
    [addItem, onAddToCart, productId, selectedVariantId],
  );

  return (
    <AddToCartFooter
      productId={productId}
      stock={stock}
      price={price}
      selectedVariantId={selectedVariantId}
      variant={variant}
      onAddToCart={handleFooterAdd}
      currency={storeCurrency}
    />
  );
}

export function ProductVariantManager({
  productId,
  storeCurrency,
  productStock,
  productPrice,
  hasVariants,
  variantOptions,
  variants,
  variant = "fixed",
  onAddToCart,
  onVariantSelectionResolved,
}: ProductVariantManagerProps) {
  const {
    selectedVariantId,
    setSelectedVariantId,
    selectedVariant,
    stock,
    price,
  } = useProductVariantSelection({
    hasVariants,
    variants,
    productStock,
    productPrice,
  });

  useEffect(() => {
    onVariantSelectionResolved?.({
      variantId: selectedVariantId,
      imageUrl: selectedVariant?.imageUrl ?? null,
    });
  }, [onVariantSelectionResolved, selectedVariant, selectedVariantId]);

  return (
    <>
      <VariantSelector
        variantOptions={variantOptions}
        variants={variants}
        selectedVariantId={selectedVariantId}
        onVariantSelect={setSelectedVariantId}
      />

      <ProductVariantCartPanel
        key={`${productId}:${selectedVariantId ?? ""}`}
        productId={productId}
        storeCurrency={storeCurrency}
        stock={stock}
        price={price}
        selectedVariantId={selectedVariantId}
        variant={variant}
        onAddToCart={onAddToCart}
      />
    </>
  );
}
