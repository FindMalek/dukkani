"use client";

import type { VariantOutput } from "@dukkani/common/schemas/variant/output";
import { useEffect, useState } from "react";

interface UseProductVariantSelectionProps {
	hasVariants: boolean;
	variants?: VariantOutput[];
	productStock: number;
	productPrice: number;
}

interface UseProductVariantSelectionReturn {
	selectedVariantId: string | undefined;
	setSelectedVariantId: (id: string | undefined) => void;
	selectedVariant: VariantOutput | undefined;
	stock: number;
	price: number;
	isOutOfStock: boolean;
}

/**
 * Shared hook for product variant selection logic
 * Extracts the variant selection logic from ProductVariantManager for reuse
 *
 * Features:
 * - Auto-selects first available variant (with stock > 0)
 * - Calculates stock based on variant selection
 * - Calculates price based on variant selection
 * - Handles products with/without variants
 */
export function useProductVariantSelection({
	hasVariants,
	variants,
	productStock,
	productPrice,
}: UseProductVariantSelectionProps): UseProductVariantSelectionReturn {
	const [selectedVariantId, setSelectedVariantId] = useState<
		string | undefined
	>();

	// Auto-select first available variant when product has variants
	useEffect(() => {
		if (hasVariants && variants && variants.length > 0) {
			// Find first variant with stock > 0, or just first variant if all are out of stock
			const firstAvailable = variants.find((v) => v.stock > 0) || variants[0];
			if (firstAvailable) {
				setSelectedVariantId(firstAvailable.id);
			}
		}
	}, [hasVariants, variants]);

	// Get selected variant data
	const selectedVariant = variants?.find((v) => v.id === selectedVariantId);

	// Determine stock and price to use
	// For products with variants: use variant stock/price, or 0 if no variant selected yet
	// For products without variants: use product stock/price
	const stock = hasVariants ? (selectedVariant?.stock ?? 0) : productStock;
	const price = hasVariants
		? (selectedVariant?.price ?? productPrice)
		: productPrice;
	const isOutOfStock = stock === 0;

	return {
		selectedVariantId,
		setSelectedVariantId,
		selectedVariant,
		stock,
		price,
		isOutOfStock,
	};
}
