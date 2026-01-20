"use client";

import type { createProductInputSchema } from "@dukkani/common/schemas/product/input";
import { Button } from "@dukkani/ui/components/button";
import { Card, CardContent } from "@dukkani/ui/components/card";
import { Field, FieldError } from "@dukkani/ui/components/field";
import { Icons } from "@dukkani/ui/components/icons";
import { Switch } from "@dukkani/ui/components/switch";
import type { useSchemaForm } from "@dukkani/ui/hooks/use-schema-form";
import { cn } from "@dukkani/ui/lib/utils";
import { useTranslations } from "next-intl";
import { VariantOptionCard } from "./variant-option-card";

interface ProductVariantsSectionProps {
	form: ReturnType<typeof useSchemaForm<typeof createProductInputSchema>>;
}

export function ProductVariantsSection({ form }: ProductVariantsSectionProps) {
	const t = useTranslations("products.create");
	const hasVariants = form.state.values.hasVariants;

	return (
		<Card className="overflow-hidden bg-muted-foreground/5 shadow-none transition-all">
			<CardContent className="p-0">
				{/* Header with Toggle */}
				<div className="flex items-center justify-between px-4">
					<div className="space-y-1">
						<h3 className="font-bold text-sm">{t("form.options.label")}</h3>
						<p className="max-w-[280px] text-muted-foreground/60 text-xs">
							{t("form.options.description")}
						</p>
					</div>
					<form.Field name="hasVariants">
						{(field) => {
							return (
								<Field>
									<Switch
										id={field.name}
										name={field.name}
										checked={field.state.value ?? false}
										onCheckedChange={(val) => {
											field.handleChange(val);
											if (val) {
												const currentOptions =
													form.state.values.variantOptions || [];
												if (currentOptions.length === 0) {
													form.setFieldValue("variantOptions", [
														{ name: "", values: [] },
													]);
												}
											} else {
												form.setFieldValue("variantOptions", []);
												form.setFieldValue("variants", []);
											}
										}}
									/>
								</Field>
							);
						}}
					</form.Field>
				</div>

				{/* Expanded Content with Animation */}
				<div
					className={cn(
						"overflow-hidden transition-all duration-300 ease-in-out",
						hasVariants ? "max-h-[2000px] opacity-100" : "max-h-0 opacity-0",
					)}
				>
					<form.Field name="variantOptions" mode="array">
						{(field) => {
							const isInvalid =
								field.state.meta.isTouched && !field.state.meta.isValid;
							return (
								<div className="space-y-4 bg-muted/5 p-4">
									{(field.state.value ?? []).map((_, index: number) => (
										<VariantOptionCard
											key={index}
											form={form}
											index={index}
											onRemove={() => field.removeValue(index)}
										/>
									))}

									<Button
										type="button"
										variant="ghost"
										size="sm"
										onClick={() => field.pushValue({ name: "", values: [] })}
										className="h-auto p-0 font-bold text-primary hover:bg-transparent"
									>
										<Icons.plus className="mr-2 h-4 w-4" />
										{t("form.variants.options.addAnother")}
									</Button>
									{isInvalid && <FieldError errors={field.state.meta.errors} />}
								</div>
							);
						}}
					</form.Field>
				</div>
			</CardContent>
		</Card>
	);
}
