"use client";

import type { CreateProductInput } from "@dukkani/common/schemas/product/input";
import { Badge } from "@dukkani/ui/components/badge";
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
import { cn } from "@dukkani/ui/lib/utils";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { type UseFormReturn, useFieldArray } from "react-hook-form";

interface VariantOptionCardProps {
	form: UseFormReturn<CreateProductInput>;
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

	const { fields, append, remove } = useFieldArray({
		control: form.control,
		name: `variantOptions.${index}.values`,
	});

	const variantOptions = form.watch("variantOptions") || [];
	const currentOptionName = form.watch(`variantOptions.${index}.name`);
	const currentValues = form.watch(`variantOptions.${index}.values`) || [];

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
			form.setError(`variantOptions.${index}.values`, {
				type: "manual",
				message: t("form.variants.validation.duplicateValue"),
			});
			return;
		}

		append({ value: trimmedValue });
		setNewValue("");
		setIsAdding(false);
		form.clearErrors(`variantOptions.${index}.values`);
	};

	return (
		<div className="relative space-y-4 rounded-xl border bg-background p-4 shadow-sm">
			<div className="flex items-start justify-between gap-4">
				<FormField
					control={form.control}
					name={`variantOptions.${index}.name`}
					render={({ field }) => (
						<FormItem className="flex-1 space-y-1.5">
							<FormLabel className="font-bold text-foreground text-xs">
								Option name
							</FormLabel>
							<FormControl>
								<Input
									{...field}
									placeholder="e.g. Size"
									className={cn(
										"h-10 border-muted-foreground/10 bg-muted/20",
										isDuplicateOptionName && "border-destructive",
									)}
									onChange={(e) => {
										field.onChange(e);
										// Clear error when user starts typing
										if (isDuplicateOptionName) {
											form.clearErrors(`variantOptions.${index}.name`);
										}
									}}
									onBlur={() => {
										field.onBlur();
										// Set error on blur if duplicate
										if (isDuplicateOptionName) {
											form.setError(`variantOptions.${index}.name`, {
												type: "manual",
												message: t("form.variants.validation.duplicateOption"),
											});
										}
									}}
								/>
							</FormControl>
							{isDuplicateOptionName && (
								<p className="text-destructive text-xs">
									{t("form.variants.validation.duplicateOption")}
								</p>
							)}
							<FormMessage />
						</FormItem>
					)}
				/>
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

			<div className="flex flex-wrap gap-2">
				{fields.map((field, vIndex) => (
					<Badge
						key={field.id}
						variant="secondary"
						className="flex items-center gap-1.5 rounded-full bg-muted/50 px-3 py-1 font-medium text-sm hover:bg-muted"
					>
						{form.watch(`variantOptions.${index}.values.${vIndex}.value`)}
						<button
							type="button"
							onClick={() => remove(vIndex)}
							className="rounded-full hover:bg-muted-foreground/20"
						>
							<Icons.x className="h-3 w-3" />
						</button>
					</Badge>
				))}

				{isAdding ? (
					<div className="flex items-center gap-2">
						<Input
							autoFocus
							value={newValue}
							onChange={(e) => {
								setNewValue(e.target.value);
								// Clear error when user starts typing
								form.clearErrors(`variantOptions.${index}.values`);
							}}
							onKeyDown={(e) => {
								if (e.key === "Enter") {
									e.preventDefault();
									handleAddValue();
								}
								if (e.key === "Escape") {
									setIsAdding(false);
									setNewValue("");
									form.clearErrors(`variantOptions.${index}.values`);
								}
							}}
							className={cn(
								"h-8 w-24 text-xs",
								isDuplicateValue(newValue) && "border-destructive",
							)}
						/>
						<Button size="icon" className="h-8 w-8" onClick={handleAddValue}>
							<Icons.check className="h-3 w-3" />
						</Button>
					</div>
				) : (
					<Button
						type="button"
						variant="outline"
						size="sm"
						onClick={() => setIsAdding(true)}
						className="h-9 rounded-full border-dashed px-4 text-muted-foreground"
					>
						<Icons.plus className="mr-2 h-4 w-4" />
						Add value
					</Button>
				)}
			</div>
			{isDuplicateValue(newValue) && isAdding && (
				<p className="text-destructive text-xs">
					{t("form.variants.validation.duplicateValue")}
				</p>
			)}
		</div>
	);
}
