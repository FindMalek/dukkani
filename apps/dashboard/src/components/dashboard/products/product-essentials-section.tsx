"use client";

import type { createProductInputSchema } from "@dukkani/common/schemas/product/input";
import { Button } from "@dukkani/ui/components/button";
import { ButtonGroup } from "@dukkani/ui/components/button-group";
import { Card, CardContent } from "@dukkani/ui/components/card";
import {
	Field,
	FieldDescription,
	FieldError,
	FieldLabel,
} from "@dukkani/ui/components/field";
import { Icons } from "@dukkani/ui/components/icons";
import { Input } from "@dukkani/ui/components/input";
import { Separator } from "@dukkani/ui/components/separator";
import type { useSchemaForm } from "@dukkani/ui/hooks/use-schema-form";
import { useTranslations } from "next-intl";

interface ProductEssentialsSectionProps {
	form: ReturnType<typeof useSchemaForm<typeof createProductInputSchema>>;
}

export function ProductEssentialsSection({
	form,
}: ProductEssentialsSectionProps) {
	const t = useTranslations("products.create");

	return (
		<Card className="bg-muted-foreground/5 py-2 shadow-none">
			<CardContent className="space-y-4 px-4">
				<h3 className="font-bold">{t("sections.essentials")}</h3>

				<form.Field name="name">
					{(field) => {
						const isInvalid =
							field.state.meta.isTouched && !field.state.meta.isValid;
						return (
							<Field data-invalid={isInvalid}>
								<FieldLabel
									htmlFor={field.name}
									className="font-semibold text-xs"
								>
									{t("form.name.label")}{" "}
									<span className="text-destructive">*</span>
								</FieldLabel>
								<Input
									id={field.name}
									name={field.name}
									value={field.state.value ?? ""}
									onBlur={field.handleBlur}
									onChange={(e) => field.handleChange(e.target.value)}
									aria-invalid={isInvalid}
								/>
								{isInvalid && <FieldError errors={field.state.meta.errors} />}
							</Field>
						);
					}}
				</form.Field>

				<form.Field name="price">
					{(field) => {
						const isInvalid =
							field.state.meta.isTouched && !field.state.meta.isValid;
						return (
							<Field data-invalid={isInvalid}>
								<FieldLabel
									htmlFor={field.name}
									className="font-semibold text-xs"
								>
									{t("form.price.label")}{" "}
									<span className="text-destructive">*</span>
								</FieldLabel>
								<div className="relative">
									<Input
										id={field.name}
										name={field.name}
										type="number"
										step="0.01"
										value={field.state.value ?? 0}
										onBlur={field.handleBlur}
										onChange={(e) => {
											const num = Number(e.target.value);
											field.handleChange(Number.isFinite(num) ? num : 0);
										}}
										aria-invalid={isInvalid}
									/>
									<span className="absolute top-1/2 right-4 -translate-y-1/2 text-muted-foreground/50 text-sm">
										TND
									</span>
								</div>
								<FieldDescription className="text-[10px]">
									{t("form.priceHelp")}
								</FieldDescription>
								{isInvalid && <FieldError errors={field.state.meta.errors} />}
							</Field>
						);
					}}
				</form.Field>

				<Separator />

				<form.Field name="stock">
					{(field) => {
						const isInvalid =
							field.state.meta.isTouched && !field.state.meta.isValid;
						// Helper to safely get a valid number
						const getValidStock = (value: unknown): number => {
							const num = Number(value);
							return Number.isFinite(num) && num >= 0 ? Math.floor(num) : 0;
						};

						const currentStock = getValidStock(field.state.value);

						return (
							<Field
								orientation="horizontal"
								data-invalid={isInvalid}
								className="flex items-center justify-between"
							>
								<FieldLabel className="font-semibold text-sm">
									{t("form.stock.label")}
								</FieldLabel>
								<ButtonGroup orientation="horizontal">
									<Button
										variant="outline"
										size="icon"
										className="bg-muted-foreground/5"
										type="button"
										onClick={() => {
											const newValue = Math.max(0, currentStock - 1);
											field.handleChange(newValue);
										}}
									>
										<Icons.minus className="size-4" />
									</Button>
									<Input
										id={field.name}
										name={field.name}
										type="number"
										className="w-16 rounded-none bg-muted-foreground/5 text-center"
										value={field.state.value ?? 0}
										onChange={(e) => {
											const value = e.target.value;
											if (value === "") {
												field.handleChange(0);
												return;
											}
											const num = Number(value);
											if (Number.isFinite(num)) {
												field.handleChange(Math.max(0, Math.floor(num)));
											}
										}}
										onBlur={field.handleBlur}
										aria-invalid={isInvalid}
									/>
									<Button
										variant="outline"
										size="icon"
										className="border-l-0 bg-muted-foreground/5"
										type="button"
										onClick={() => {
											const newValue = currentStock + 1;
											field.handleChange(newValue);
										}}
									>
										<Icons.plus className="size-4" />
									</Button>
								</ButtonGroup>
								{isInvalid && <FieldError errors={field.state.meta.errors} />}
							</Field>
						);
					}}
				</form.Field>
			</CardContent>
		</Card>
	);
}
