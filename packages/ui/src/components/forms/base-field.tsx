import type * as React from "react";

import { useFieldContext } from "../../hooks/use-app-form";
import { cn } from "../../lib/utils";
import {
	Field,
	FieldContent,
	FieldDescription,
	FieldErrors,
	FieldLabel,
} from "../field";

export type CommonFieldProps = {
	label: string;
	srOnlyLabel?: boolean;
	description?: string;
	labelFirstOnHorizontal?: boolean;
};

type BaseFieldWithDescriptionProps = CommonFieldProps & {
	description: string;
	orientation: React.ComponentProps<typeof Field>["orientation"];
	children: React.ReactNode;
};
export function BaseFieldWithDescription({
	children,
	label,
	srOnlyLabel = false,
	description,
	orientation = "vertical",
	labelFirstOnHorizontal = false,
}: BaseFieldWithDescriptionProps) {
	const field = useFieldContext();
	if (orientation === "horizontal") {
		return labelFirstOnHorizontal ? (
			<>
				<FieldContent>
					<FieldLabel
						htmlFor={field.name}
						className={cn(srOnlyLabel && "sr-only")}
					>
						{label}
					</FieldLabel>
					<FieldDescription>{description}</FieldDescription>
				</FieldContent>
				{children}
			</>
		) : (
			<>
				{children}
				<FieldContent>
					<FieldLabel
						htmlFor={field.name}
						className={cn(srOnlyLabel && "sr-only")}
					>
						{label}
					</FieldLabel>
					<FieldDescription>{description}</FieldDescription>
				</FieldContent>
			</>
		);
	}
	return (
		<>
			<FieldContent>
				<FieldLabel
					htmlFor={field.name}
					className={cn(srOnlyLabel && "sr-only")}
				>
					{label}
				</FieldLabel>
				<FieldDescription>{description}</FieldDescription>
			</FieldContent>
			{children}
		</>
	);
}

type BaseFieldWithoutDescriptionProps = CommonFieldProps & {
	orientation: React.ComponentProps<typeof Field>["orientation"];
	children: React.ReactNode;
};

export function BaseFieldWithoutDescription({
	children,
	label,
	srOnlyLabel = false,
	orientation = "vertical",
	labelFirstOnHorizontal = false,
}: BaseFieldWithoutDescriptionProps) {
	const field = useFieldContext();
	if (orientation === "horizontal") {
		return labelFirstOnHorizontal ? (
			<>
				<FieldLabel
					htmlFor={field.name}
					className={cn(srOnlyLabel && "sr-only")}
				>
					{label}
				</FieldLabel>
				{children}
			</>
		) : (
			<>
				{children}
				<FieldLabel
					htmlFor={field.name}
					className={cn(srOnlyLabel && "sr-only")}
				>
					{label}
				</FieldLabel>
			</>
		);
	}
	return (
		<>
			<FieldLabel htmlFor={field.name} className={cn(srOnlyLabel && "sr-only")}>
				{label}
			</FieldLabel>
			{children}
		</>
	);
}

export function BaseField({
	children,
	label,
	description,
	srOnlyLabel = false,
	orientation = "vertical",
	className,
	labelFirstOnHorizontal = false,
}: CommonFieldProps & React.ComponentProps<typeof Field>) {
	const field = useFieldContext();
	const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;
	return (
		<Field orientation={orientation} className={className}>
			{description ? (
				<BaseFieldWithDescription
					labelFirstOnHorizontal={labelFirstOnHorizontal}
					orientation={orientation}
					label={label}
					description={description}
					srOnlyLabel={srOnlyLabel}
				>
					{children}
				</BaseFieldWithDescription>
			) : (
				<BaseFieldWithoutDescription
					labelFirstOnHorizontal={labelFirstOnHorizontal}
					orientation={orientation}
					label={label}
					srOnlyLabel={srOnlyLabel}
				>
					{children}
				</BaseFieldWithoutDescription>
			)}
			<FieldErrors match={isInvalid} errors={field.state.meta.errors} />
		</Field>
	);
}
