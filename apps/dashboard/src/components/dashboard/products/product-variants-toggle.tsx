"use client";

import type { CreateProductInput } from "@dukkani/common/schemas/product/input";
import { Card, CardContent } from "@dukkani/ui/components/card";
import { FormControl, FormField } from "@dukkani/ui/components/form";
import { Switch } from "@dukkani/ui/components/switch";
import { useTranslations } from "next-intl";
import type { UseFormReturn } from "react-hook-form";

interface ProductVariantsToggleProps {
	form: UseFormReturn<CreateProductInput>;
}

export function ProductVariantsToggle({ form }: ProductVariantsToggleProps) {
	const t = useTranslations("products.create");

	return (
		<Card className="bg-muted-foreground/5 py-2 shadow-none">
			<CardContent className="flex items-center justify-between px-4">
				<div className="space-y-1">
					<h3 className="font-bold text-sm">{t("form.options.label")}</h3>
					<p className="text-muted-foreground/60 text-xs">
						{t("form.options.description")}
					</p>
				</div>
				<FormField
					control={form.control}
					name="hasVariants"
					render={({ field }) => (
						<FormControl>
							<Switch checked={field.value} onCheckedChange={field.onChange} />
						</FormControl>
					)}
				/>
			</CardContent>
		</Card>
	);
}
