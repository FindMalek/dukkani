"use client";

import type { createProductInputSchema } from "@dukkani/common/schemas/product/input";
import { Button } from "@dukkani/ui/components/button";
import {
	Drawer,
	DrawerClose,
	DrawerContent,
	DrawerDescription,
	DrawerFooter,
	DrawerHeader,
	DrawerTitle,
} from "@dukkani/ui/components/drawer";
import { Field, FieldError, FieldLabel } from "@dukkani/ui/components/field";
import { Input } from "@dukkani/ui/components/input";
import type { useSchemaForm } from "@dukkani/ui/hooks/use-schema-form";
import { useTranslations } from "next-intl";

interface VariantEditDrawerProps {
	form: ReturnType<typeof useSchemaForm<typeof createProductInputSchema>>;
	index: number;
	open: boolean;
	onOpenChange: (open: boolean) => void;
}

export function VariantEditDrawer({
	form,
	index,
	open,
	onOpenChange,
}: VariantEditDrawerProps) {
	const t = useTranslations("products.create");
	const variant = form.state.values.variants?.[index];

	return (
		<Drawer open={open} onOpenChange={onOpenChange}>
			<DrawerContent>
				<DrawerHeader>
					<DrawerTitle>{t("form.variants.edit.title")}</DrawerTitle>
					<DrawerDescription>
						{Object.entries(variant?.selections || {})
							.map(([key, value]) => `${key}: ${value}`)
							.join(", ")}
					</DrawerDescription>
				</DrawerHeader>

				<div className="space-y-4 px-4">
					<form.Field name={`variants[${index}].sku`}>
						{(field) => {
							const isInvalid =
								field.state.meta.isTouched && !field.state.meta.isValid;
							return (
								<Field data-invalid={isInvalid}>
									<FieldLabel htmlFor={field.name}>
										{t("form.variants.edit.sku")}
									</FieldLabel>
									<Input
										id={field.name}
										name={field.name}
										placeholder={t("form.variants.edit.skuPlaceholder")}
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

					<form.Field name={`variants[${index}].price`}>
						{(field) => {
							const isInvalid =
								field.state.meta.isTouched && !field.state.meta.isValid;
							return (
								<Field data-invalid={isInvalid}>
									<FieldLabel htmlFor={field.name}>
										{t("form.variants.edit.price")}
									</FieldLabel>
									<div className="relative">
										<Input
											id={field.name}
											name={field.name}
											type="number"
											step="0.01"
											value={field.state.value ?? ""}
											onBlur={field.handleBlur}
											onChange={(e) =>
												field.handleChange(
													e.target.value ? Number(e.target.value) : undefined,
												)
											}
											aria-invalid={isInvalid}
										/>
										<span className="absolute top-1/2 right-4 -translate-y-1/2 text-muted-foreground/50 text-sm">
											TND
										</span>
									</div>
									<p className="text-muted-foreground text-xs">
										{t("form.variants.edit.priceHelp")}
									</p>
									{isInvalid && <FieldError errors={field.state.meta.errors} />}
								</Field>
							);
						}}
					</form.Field>

					<form.Field name={`variants[${index}].stock`}>
						{(field) => {
							const isInvalid =
								field.state.meta.isTouched && !field.state.meta.isValid;
							return (
								<Field data-invalid={isInvalid}>
									<FieldLabel htmlFor={field.name}>
										{t("form.variants.edit.stock")}
									</FieldLabel>
									<Input
										id={field.name}
										name={field.name}
										type="number"
										value={field.state.value ?? 0}
										onBlur={field.handleBlur}
										onChange={(e) => field.handleChange(Number(e.target.value))}
										aria-invalid={isInvalid}
									/>
									{isInvalid && <FieldError errors={field.state.meta.errors} />}
								</Field>
							);
						}}
					</form.Field>
				</div>

				<DrawerFooter>
					<DrawerClose asChild>
						<Button variant="outline">{t("form.cancel")}</Button>
					</DrawerClose>
				</DrawerFooter>
			</DrawerContent>
		</Drawer>
	);
}
