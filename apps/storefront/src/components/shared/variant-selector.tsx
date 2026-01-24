"use client";

import type {
	VariantOptionOutput,
	VariantOutput,
} from "@dukkani/common/schemas/variant/output";
import { Button } from "@dukkani/ui/components/button";
import { cn } from "@dukkani/ui/lib/utils";
import { useTranslations } from "next-intl";
import { useMemo } from "react";

interface VariantSelectorProps {
	variantOptions?: VariantOptionOutput[];
	variants?: VariantOutput[];
	selectedVariantId?: string;
	onVariantSelect?: (variantId: string) => void;
}

export function VariantSelector({
	variantOptions,
	variants,
	selectedVariantId,
	onVariantSelect,
}: VariantSelectorProps) {
	const t = useTranslations("storefront.store.product.variantSelector");

	if (!variantOptions || variantOptions.length === 0 || !variants) {
		return null;
	}

	// Get the selected variant to know which option values are selected
	const selectedVariant = variants.find((v) => v.id === selectedVariantId);

	// Create a map of selected option values from the selected variant
	const selectedValues = useMemo(() => {
		const map = new Map<string, string>(); // optionId -> valueId
		selectedVariant?.selections.forEach((sel) => {
			map.set(sel.optionId, sel.valueId);
		});
		return map;
	}, [selectedVariant]);

	// Helper to find a variant that matches selected option values
	const findMatchingVariant = (
		optionId: string,
		valueId: string,
	): VariantOutput | null => {
		// Create a map of what we're looking for
		const targetSelections = new Map(selectedValues);
		targetSelections.set(optionId, valueId);

		// Find variant that matches all selections
		return (
			variants.find((variant) => {
				if (variant.selections.length !== targetSelections.size) {
					return false;
				}
				return variant.selections.every((sel) => {
					return targetSelections.get(sel.optionId) === sel.valueId;
				});
			}) || null
		);
	};

	// Helper to check if a value is available (has a matching variant with stock)
	const isValueAvailable = (optionId: string, valueId: string): boolean => {
		const variant = findMatchingVariant(optionId, valueId);
		return variant ? variant.stock > 0 : false;
	};

	return (
		<div className="space-y-4">
			{variantOptions.map((option) => {
				const selectedValueId = selectedValues.get(option.id);

				return (
					<div key={option.id} className="space-y-2">
						<h3 className="font-medium text-muted-foreground text-sm">
							{option.name}
						</h3>
						<div className="flex flex-wrap gap-2">
							{option.values.map((value) => {
								const isSelected = value.id === selectedValueId;
								const isAvailable = isValueAvailable(option.id, value.id);
								const matchingVariant = findMatchingVariant(
									option.id,
									value.id,
								);

								return (
									<Button
										key={value.id}
										variant={isSelected ? "default" : "outline"}
										size="sm"
										disabled={!isAvailable}
										onClick={() => {
											if (matchingVariant) {
												onVariantSelect?.(matchingVariant.id);
											}
										}}
										className={cn(
											"rounded-lg",
											isSelected && "bg-primary text-primary-foreground",
											!isAvailable && "cursor-not-allowed opacity-50",
										)}
									>
										{value.value}
									</Button>
								);
							})}
						</div>
					</div>
				);
			})}
		</div>
	);
}
