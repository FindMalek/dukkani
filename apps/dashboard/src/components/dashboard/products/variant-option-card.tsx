"use client";

import type { CreateProductInput } from "@dukkani/common/schemas/product/input";
import { Badge } from "@dukkani/ui/components/badge";
import { Button } from "@dukkani/ui/components/button";
import {
	FormControl,
	FormField,
	FormItem,
	FormLabel,
} from "@dukkani/ui/components/form";
import { Icons } from "@dukkani/ui/components/icons";
import { Input } from "@dukkani/ui/components/input";
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
	const [newValue, setNewValue] = useState("");
	const [isAdding, setIsAdding] = useState(false);

	const { fields, append, remove } = useFieldArray({
		control: form.control,
		name: `variantOptions.${index}.values`,
	});

	const handleAddValue = () => {
		if (newValue.trim()) {
			append({ value: newValue.trim() });
			setNewValue("");
			setIsAdding(false);
		}
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
									className="h-10 border-muted-foreground/10 bg-muted/20"
								/>
							</FormControl>
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
							onChange={(e) => setNewValue(e.target.value)}
							onKeyDown={(e) => {
								if (e.key === "Enter") {
									e.preventDefault();
									handleAddValue();
								}
								if (e.key === "Escape") setIsAdding(false);
							}}
							className="h-8 w-24 text-xs"
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
		</div>
	);
}
