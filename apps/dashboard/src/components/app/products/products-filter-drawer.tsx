"use client";

import type { StockFilter } from "@/stores/product.store";
import { Button } from "@dukkani/ui/components/button";
import {
	Drawer,
	DrawerClose,
	DrawerContent,
	DrawerFooter,
	DrawerHeader,
	DrawerTitle,
} from "@dukkani/ui/components/drawer";
import { Field, FieldLabel } from "@dukkani/ui/components/field";
import { Input } from "@dukkani/ui/components/input";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";

type PublishedFilter = boolean | null;
type VariantsFilter = "all" | "with-variants" | "single-sku";

interface ProductsFilterDrawerProps {
	open: boolean;
	onOpenChange: (open: boolean) => void;
	published: PublishedFilter;
	stockFilter: StockFilter;
	variantsFilter: VariantsFilter;
	priceMin: number | null;
	priceMax: number | null;
	setPublished: (value: PublishedFilter) => void;
	setStockFilter: (value: StockFilter) => void;
	setVariantsFilter: (value: VariantsFilter) => void;
	setPriceMin: (value: number | null) => void;
	setPriceMax: (value: number | null) => void;
	resetFilters: () => void;
}

const STATUS_OPTIONS = [
	{ value: null as PublishedFilter, key: "allStatuses" as const },
	{ value: true as PublishedFilter, key: "published" as const },
	{ value: false as PublishedFilter, key: "draft" as const },
];

const INVENTORY_OPTIONS = [
	{ value: "all" as StockFilter, key: "allInventory" as const },
	{ value: "in-stock" as StockFilter, key: "inStock" as const },
	{ value: "low-stock" as StockFilter, key: "lowStock" as const },
	{ value: "out-of-stock" as StockFilter, key: "outOfStock" as const },
];

const VARIANTS_OPTIONS = [
	{ value: "all" as VariantsFilter, key: "allProducts" as const },
	{ value: "with-variants" as VariantsFilter, key: "withVariants" as const },
	{ value: "single-sku" as VariantsFilter, key: "singleSku" as const },
];

export function ProductsFilterDrawer({
	open,
	onOpenChange,
	published,
	stockFilter,
	variantsFilter,
	priceMin,
	priceMax,
	setPublished,
	setStockFilter,
	setVariantsFilter,
	setPriceMin,
	setPriceMax,
	resetFilters,
}: ProductsFilterDrawerProps) {
	const t = useTranslations("products.list.filterDrawer");

	const [draftPublished, setDraftPublished] =
		useState<PublishedFilter>(published);
	const [draftStockFilter, setDraftStockFilter] =
		useState<StockFilter>(stockFilter);
	const [draftVariantsFilter, setDraftVariantsFilter] =
		useState<VariantsFilter>(variantsFilter);
	const [draftPriceMin, setDraftPriceMin] = useState<string>(
		priceMin != null ? String(priceMin) : "",
	);
	const [draftPriceMax, setDraftPriceMax] = useState<string>(
		priceMax != null ? String(priceMax) : "",
	);

	useEffect(() => {
		if (open) {
			setDraftPublished(published);
			setDraftStockFilter(stockFilter);
			setDraftVariantsFilter(variantsFilter);
			setDraftPriceMin(priceMin != null ? String(priceMin) : "");
			setDraftPriceMax(priceMax != null ? String(priceMax) : "");
		}
	}, [open, published, stockFilter, variantsFilter, priceMin, priceMax]);

	const handleApply = () => {
		setPublished(draftPublished);
		setStockFilter(draftStockFilter);
		setVariantsFilter(draftVariantsFilter);
		const minVal = draftPriceMin.trim() ? parseFloat(draftPriceMin) : null;
		const maxVal = draftPriceMax.trim() ? parseFloat(draftPriceMax) : null;
		setPriceMin(minVal != null && !Number.isNaN(minVal) ? minVal : null);
		setPriceMax(maxVal != null && !Number.isNaN(maxVal) ? maxVal : null);
		onOpenChange(false);
	};

	const handleClearAll = () => {
		setDraftPublished(null);
		setDraftStockFilter("all");
		setDraftVariantsFilter("all");
		setDraftPriceMin("");
		setDraftPriceMax("");
		resetFilters();
	};

	const handleClose = () => {
		onOpenChange(false);
	};

	return (
		<Drawer open={open} onOpenChange={onOpenChange}>
			<DrawerContent className="max-h-[85vh]">
				<DrawerHeader className="flex flex-row items-center justify-between">
					<DrawerTitle>{t("title")}</DrawerTitle>
					<Button
						variant="ghost"
						size="sm"
						className="text-muted-foreground -me-2"
						onClick={handleClearAll}
					>
						{t("clearAll")}
					</Button>
				</DrawerHeader>

				<div className="flex flex-1 flex-col gap-6 overflow-y-auto px-4 pb-4">
					{/* Status */}
					<div className="space-y-2">
						<p className="font-medium text-sm">{t("status")}</p>
						<div className="flex flex-wrap gap-2">
							{STATUS_OPTIONS.map((opt) => {
								const isActive = draftPublished === opt.value;
								return (
									<Button
										key={opt.key}
										variant={isActive ? "default" : "outline"}
										size="sm"
										onClick={() => setDraftPublished(opt.value)}
									>
										{t(opt.key)}
									</Button>
								);
							})}
						</div>
					</div>

					{/* Inventory */}
					<div className="space-y-2">
						<p className="font-medium text-sm">{t("inventory")}</p>
						<div className="flex flex-wrap gap-2">
							{INVENTORY_OPTIONS.map((opt) => {
								const isActive = draftStockFilter === opt.value;
								return (
									<Button
										key={opt.key}
										variant={isActive ? "default" : "outline"}
										size="sm"
										onClick={() => setDraftStockFilter(opt.value)}
									>
										{t(opt.key)}
									</Button>
								);
							})}
						</div>
					</div>

					{/* Variants */}
					<div className="space-y-2">
						<p className="font-medium text-sm">{t("variants")}</p>
						<div className="flex flex-wrap gap-2">
							{VARIANTS_OPTIONS.map((opt) => {
								const isActive = draftVariantsFilter === opt.value;
								return (
									<Button
										key={opt.key}
										variant={isActive ? "default" : "outline"}
										size="sm"
										onClick={() => setDraftVariantsFilter(opt.value)}
									>
										{t(opt.key)}
									</Button>
								);
							})}
						</div>
					</div>

					{/* Price range */}
					<div className="space-y-2">
						<p className="font-medium text-sm">{t("priceRange")}</p>
						<div className="flex gap-3">
							<Field className="flex-1">
								<FieldLabel>{t("min")}</FieldLabel>
								<Input
									type="number"
									inputMode="decimal"
									min={0}
									step={0.01}
									placeholder="0"
									value={draftPriceMin}
									onChange={(e) => setDraftPriceMin(e.target.value)}
								/>
							</Field>
							<Field className="flex-1">
								<FieldLabel>{t("max")}</FieldLabel>
								<Input
									type="number"
									inputMode="decimal"
									min={0}
									step={0.01}
									placeholder="0"
									value={draftPriceMax}
									onChange={(e) => setDraftPriceMax(e.target.value)}
								/>
							</Field>
						</div>
					</div>
				</div>

				<DrawerFooter className="flex flex-row gap-2">
					<Button onClick={handleApply} className="w-full">
						{t("apply")}
					</Button>
				</DrawerFooter>
			</DrawerContent>
		</Drawer>
	);
}
