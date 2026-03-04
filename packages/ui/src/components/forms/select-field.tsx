"use client";
import type * as React from "react";
import { useEffect, useMemo, useState } from "react";
import { useFieldContext } from "../../hooks/use-app-form";
import { Button } from "../button";
import { Icons } from "../icons";
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectLabel,
	SelectSeparator,
	SelectTrigger,
	SelectValue,
} from "../select";
import { BaseField, type CommonFieldProps } from "./base-field";

type SelectOption = {
	id: string;
	name: string;
};

type SelectOptionGroup = {
	id: string;
	name?: string;
	separator?: boolean;
	options: SelectOption[];
};

type SelectFieldProps = CommonFieldProps &
	React.ComponentProps<typeof Select> & {
		options?: SelectOptionGroup[] | (() => Promise<SelectOptionGroup[]>);
	} & {
		// like opening a modal or a dialog
		onNewOptionClick?: () => void;
	};

export function SelectField({
	label,
	description,
	labelFirstOnHorizontal = false,
	options: optionsOrPromise,
	onNewOptionClick,
	...props
}: SelectFieldProps) {
	const field = useFieldContext<string>();
	const [asyncOptions, setAsyncOptions] = useState<SelectOptionGroup[] | null>(
		null,
	);

	const resolvedOptions = useMemo(() => {
		if (!optionsOrPromise) return [];
		if (Array.isArray(optionsOrPromise)) return optionsOrPromise;
		if (typeof optionsOrPromise === "function") return asyncOptions ?? [];
		return [];
	}, [optionsOrPromise, asyncOptions]);

	useEffect(() => {
		const cancelled = false;
		if (typeof optionsOrPromise === "function") {
			optionsOrPromise()
				.then((options) => {
					if (!cancelled) setAsyncOptions(options);
				})
				.catch((error) => {
					if (!cancelled) {
						console.error("Failed to load select options:", error);
						setAsyncOptions([]);
					}
				});
		} else {
			setAsyncOptions(null);
		}
	}, [optionsOrPromise]);

	const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;
	return (
		<BaseField label={label} description={description}>
			<Select
				name={field.name}
				value={field.state.value}
				onValueChange={(value) => field.handleChange(value)}
				{...props}
			>
				<div className="flex w-full items-center justify-between gap-2">
					<SelectTrigger aria-invalid={isInvalid} className="grow">
						<SelectValue placeholder="Select an option" />
					</SelectTrigger>
					{onNewOptionClick && (
						<Button
							type="button"
							variant="secondary"
							size="icon"
							onClick={onNewOptionClick}
						>
							<Icons.plus className="size-4" />
						</Button>
					)}
				</div>
				<SelectContent>
					{resolvedOptions.map((optionGroup) => (
						<SelectGroup key={optionGroup.id}>
							{optionGroup.name && (
								<SelectLabel>{optionGroup.name}</SelectLabel>
							)}
							{optionGroup.options.map((option) => (
								<SelectItem key={option.id} value={option.id}>
									{option.name}
								</SelectItem>
							))}
							{optionGroup.separator && <SelectSeparator />}
						</SelectGroup>
					))}
				</SelectContent>
			</Select>
		</BaseField>
	);
}
