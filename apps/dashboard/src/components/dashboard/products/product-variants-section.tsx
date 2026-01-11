"use client";

import type { CreateProductInput } from "@dukkani/common/schemas/product/input";
import { Button } from "@dukkani/ui/components/button";
import { Card, CardContent } from "@dukkani/ui/components/card";
import { FormControl, FormField, FormItem } from "@dukkani/ui/components/form";
import { Icons } from "@dukkani/ui/components/icons";
import { Switch } from "@dukkani/ui/components/switch";
import { cn } from "@dukkani/ui/lib/utils";
import { useTranslations } from "next-intl";
import { type UseFormReturn, useFieldArray } from "react-hook-form";
import { VariantOptionCard } from "./variant-option-card";

interface ProductVariantsSectionProps {
	form: UseFormReturn<CreateProductInput>;
}

export function ProductVariantsSection({ form }: ProductVariantsSectionProps) {
	const t = useTranslations("products.create");
	const hasVariants = form.watch("hasVariants");

	const { fields, append, remove } = useFieldArray({
		control: form.control,
		name: "variantOptions",
	});

	const addOption = () => {
		append({
			name: "",
			values: [],
		});
	};

	return (
		<Card className="overflow-hidden bg-muted-foreground/5 shadow-none transition-all">
			<CardContent className="p-0">
				{/* Header with Toggle */}
				<div className="flex items-center justify-between p-4">
					<div className="space-y-1">
						<h3 className="font-bold text-sm">{t("form.options.label")}</h3>
						<p className="max-w-[280px] text-muted-foreground/60 text-xs">
							{t("form.options.description")}
						</p>
					</div>
					<FormField
						control={form.control}
						name="hasVariants"
						render={({ field }) => (
							<FormItem>
								<FormControl>
									<Switch
										checked={field.value}
										onCheckedChange={(val) => {
											field.onChange(val);
											if (val && fields.length === 0) addOption();
										}}
									/>
								</FormControl>
							</FormItem>
						)}
					/>
				</div>

				{/* Expanded Content with Animation */}
				<div
					className={cn(
						"overflow-hidden transition-all duration-300 ease-in-out",
						hasVariants ? "max-h-[2000px] opacity-100" : "max-h-0 opacity-0",
					)}
				>
					<div className="space-y-4 border-t bg-muted/5 p-4">
						{fields.map((field, index) => (
							<VariantOptionCard
								key={field.id}
								form={form}
								index={index}
								onRemove={() => remove(index)}
							/>
						))}

						<Button
							type="button"
							variant="ghost"
							size="sm"
							onClick={addOption}
							className="h-auto p-0 font-bold text-primary hover:bg-transparent"
						>
							<Icons.plus className="mr-2 h-4 w-4" />
							{t("form.variants.options.addAnother")}
						</Button>
					</div>
				</div>
			</CardContent>
		</Card>
	);
}
