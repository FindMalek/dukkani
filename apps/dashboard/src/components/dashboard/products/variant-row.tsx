"use client";

import type { CreateProductInput } from "@dukkani/common/schemas/product/input";
import { Button } from "@dukkani/ui/components/button";
import {
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@dukkani/ui/components/form";
import { Icons } from "@dukkani/ui/components/icons";
import { Input } from "@dukkani/ui/components/input";
import { useTranslations } from "next-intl";
import { useState } from "react";
import type { UseFormReturn } from "react-hook-form";
import { VariantEditDrawer } from "./variant-edit-drawer";

interface VariantRowProps {
	form: UseFormReturn<CreateProductInput>;
	index: number;
}

export function VariantRow({ form, index }: VariantRowProps) {
	const t = useTranslations("products.create");
	const [drawerOpen, setDrawerOpen] = useState(false);
	const variant = form.watch(`variants.${index}`);

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
					<FormLabel className="text-muted-foreground text-xs">
						{t("form.variants.list.price")}
					</FormLabel>
					<p className="font-semibold text-sm">
						{variant?.price?.toFixed(2) || form.watch("price").toFixed(2)} TND
					</p>
				</div>
				<div>
					<FormLabel className="text-muted-foreground text-xs">
						{t("form.variants.list.stock")}
					</FormLabel>
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
