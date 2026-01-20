"use client";

import type { CreateProductInput } from "@dukkani/common/schemas/product/input";
import { Badge } from "@dukkani/ui/components/badge";
import { Button } from "@dukkani/ui/components/button";
import { Field, FieldError, FieldLabel } from "@dukkani/ui/components/field";
import { Icons } from "@dukkani/ui/components/icons";
import { Input } from "@dukkani/ui/components/input";
import {
	InputGroup,
	InputGroupButton,
	InputGroupInput,
} from "@dukkani/ui/components/input-group";
import { cn } from "@dukkani/ui/lib/utils";
import { useTranslations } from "next-intl";
import { useState } from "react";
import type { UseFormApi } from "@tanstack/react-form";

interface VariantOptionCardProps {
	form: UseFormApi<CreateProductInput, unknown>;
	index: number;
	onRemove: () => void;
}

export function VariantOptionCard({
	form,
	index,
	onRemove,
}: VariantOptionCardProps) {
	const t = useTranslations("products.create");
	const [newValue, setNewValue] = useState("");
	const [isAdding, setIsAdding] = useState(false);

	const variantOptions = form.state.values.variantOptions || [];
	const currentOptionName = form.state.values.variantOptions?.[index]?.name;
	const currentValues = form.state.values.variantOptions?.[index]?.values || [];

	// Check for duplicate option names (excluding current index)
	const isDuplicateOptionName = variantOptions.some(
		(opt, idx) =>
			idx !== index &&
			opt.name &&
			opt.name.toLowerCase().trim() ===
				currentOptionName?.toLowerCase().trim() &&
			currentOptionName?.trim().length > 0,
	);

	// Check for duplicate values within this option
	const isDuplicateValue = (value: string) => {
		if (!value.trim()) return false;
		const normalizedValue = value.toLowerCase().trim();
		return currentValues.some(
			(v) => v.value?.toLowerCase().trim() === normalizedValue,
		);
	};

	const handleAddValue = () => {
		const trimmedValue = newValue.trim();
		if (!trimmedValue) return;

		// Check for duplicate before adding
		if (isDuplicateValue(trimmedValue)) {
			// In TanStack Form, we can't set errors manually like in RHF
			// The validation will be handled by the Zod schema
			return;
		}

		const currentOptionValues =
			form.state.values.variantOptions?.[index]?.values || [];
		form.setFieldValue(`variantOptions[${index}].values`, [
			...currentOptionValues,
			{ value: trimmedValue },
		]);
		setNewValue("");
		setIsAdding(false);
	};

	return (
		<div className="relative space-y-4 rounded-xl border bg-background p-4 shadow-sm">
			<div className="flex items-start justify-between gap-4">
				<form.Field name={`variantOptions[${index}].name`}>
					{(field) => {
						const isInvalid =
							(field.state.meta.isTouched && !field.state.meta.isValid) ||
							isDuplicateOptionName;
						return (
							<Field data-invalid={isInvalid} className="flex-1 space-y-1.5">
								<FieldLabel
									htmlFor={field.name}
									className="font-bold text-foreground text-xs"
								>
									Option name
								</FieldLabel>
								<Input
									id={field.name}
									name={field.name}
									placeholder="e.g. Size"
									value={field.state.value ?? ""}
									onBlur={field.handleBlur}
									onChange={(e) => field.handleChange(e.target.value)}
									aria-invalid={isInvalid}
									className={cn(
										"h-10 border-muted-foreground/10 bg-muted/20",
										isDuplicateOptionName && "border-destructive",
									)}
								/>
								{isDuplicateOptionName && (
									<p className="text-destructive text-xs">
										{t("form.variants.validation.duplicateOption")}
									</p>
								)}
								{isInvalid && !isDuplicateOptionName && (
									<FieldError errors={field.state.meta.errors} />
								)}
							</Field>
						);
					}}
				</form.Field>
				<Button
					type="button"
					variant="ghost"
					size="icon"
					onClick={onRemove}
					className="mt-6 h-8 w-8 text-muted-foreground hover:text-destructive"
				>
					<Icons.trash className="h-4 w-4" />
				</Button>
			</div>

			<form.Field name={`variantOptions[${index}].values`} mode="array">
				{(field) => {
					return (
						<div className="flex flex-wrap gap-2">
							{field.state.value.map((_: any, vIndex: number) => (
								<Badge
									key={vIndex}
									variant="secondary"
									className="flex items-center gap-1.5 rounded-full bg-muted/50 px-2 py-1 font-medium text-xs hover:bg-muted"
								>
									{form.state.values.variantOptions?.[index]?.values?.[vIndex]
										?.value || ""}
									<Button
										type="button"
										variant="ghost"
										size="icon"
										onClick={() => field.removeValue(vIndex)}
										className="size-3 rounded-full hover:bg-muted-foreground/20"
									>
										<Icons.x className="size-3" />
									</Button>
								</Badge>
							))}

							{isAdding ? (
								<InputGroup className="h-8 w-auto">
									<InputGroupInput
										autoFocus
										value={newValue}
										onChange={(e) => {
											setNewValue(e.target.value);
										}}
										onKeyDown={(e) => {
											if (e.key === "Enter") {
												e.preventDefault();
												handleAddValue();
											}
											if (e.key === "Escape") {
												setIsAdding(false);
												setNewValue("");
											}
										}}
										className={cn(
											"h-8 w-24 text-xs",
											isDuplicateValue(newValue) && "border-destructive",
										)}
									/>
									<InputGroupButton
										type="button"
										size="icon-xs"
										onClick={handleAddValue}
										className="mr-1 cursor-pointer"
									>
										<Icons.check className="size-3" />
									</InputGroupButton>
								</InputGroup>
							) : (
								<Button
									type="button"
									variant="outline"
									size="sm"
									onClick={() => setIsAdding(true)}
									className="h-9 rounded-full border-dashed px-4 text-muted-foreground"
								>
									<Icons.plus className="h-4 w-4" />
									{t("form.variants.options.addValue")}
								</Button>
							)}
						</div>
					);
				}}
			</form.Field>
			{isDuplicateValue(newValue) && isAdding && (
				<p className="text-destructive text-xs">
					{t("form.variants.validation.duplicateValue")}
				</p>
			)}
		</div>
	);
}
