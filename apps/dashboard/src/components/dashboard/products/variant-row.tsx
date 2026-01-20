"use client";

import type { CreateProductInput } from "@dukkani/common/schemas/product/input";
import { formatPrice } from "@dukkani/common/utils";
import { Button } from "@dukkani/ui/components/button";
import { FieldLabel } from "@dukkani/ui/components/field";
import { Icons } from "@dukkani/ui/components/icons";
import { useTranslations } from "next-intl";
import { useState } from "react";
import type { UseFormApi } from "@tanstack/react-form";
import { VariantEditDrawer } from "./variant-edit-drawer";

interface VariantRowProps {
	form: UseFormApi<CreateProductInput, unknown>;
	index: number;
}

export function VariantRow({ form, index }: VariantRowProps) {
	const t = useTranslations("products.create");
	const [drawerOpen, setDrawerOpen] = useState(false);

	const variant = form.state.values.variants?.[index];
	const basePrice = form.state.values.price ?? 0;

	return (
		<div className="space-y-4">
			<div className="space-y-2">
				<div className="flex flex-wrap gap-2">
					{Object.entries(variant?.selections || {}).map(([key, value]) => (
						<span
							key={key}
							className="rounded-md bg-muted px-2 py-1 font-medium text-xs"
						>
							{key}: {value}
						</span>
					))}
				</div>
			</div>

			<div className="grid grid-cols-2 gap-4">
				<div>
					<FieldLabel className="text-muted-foreground text-xs">
						{t("form.variants.list.price")}
					</FieldLabel>
					<p className="font-semibold text-sm">
						{formatPrice(variant?.price, basePrice)} TND
					</p>
				</div>
				<div>
					<FieldLabel className="text-muted-foreground text-xs">
						{t("form.variants.list.stock")}
					</FieldLabel>
					<p className="font-semibold text-sm">{variant?.stock || 0}</p>
				</div>
			</div>

			<Button
				type="button"
				variant="outline"
				className="w-full"
				onClick={() => setDrawerOpen(true)}
			>
				<Icons.edit className="mr-2 h-4 w-4" />
				{t("form.variants.list.edit")}
			</Button>

			<VariantEditDrawer
				form={form}
				index={index}
				open={drawerOpen}
				onOpenChange={setDrawerOpen}
			/>
		</div>
	);
}
