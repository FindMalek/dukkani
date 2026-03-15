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
	rightToField?: React.ReactNode;
};

interface BaseFieldWithDescriptionProps extends CommonFieldProps {
	description: string;
	orientation: React.ComponentProps<typeof Field>["orientation"];
	children: React.ReactNode;
}
export function BaseFieldWithDescription({
	children,
	label,
	srOnlyLabel = false,
	description,
	orientation = "vertical",
	labelFirstOnHorizontal = false,
	rightToField,
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
				<div className="flex items-center gap-2">
					{children}
					{rightToField}
				</div>
			</>
		) : (
			<>
				<div className="flex items-center gap-2">
					{children}
					{rightToField}
				</div>
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
			<div className="flex items-center gap-2">
				{children}
				{rightToField}
			</div>
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
	rightToField,
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
				<div className="flex items-center gap-2">
					{children}
					<div className="ml-auto">{rightToField}</div>
				</div>
			</>
		) : (
			<>
				<div className="flex items-center gap-2">
					{children}
					{rightToField}
				</div>
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
			<div className="flex items-center gap-2">
				{children}
				{rightToField}
			</div>
		</>
	);
}

export function BaseField({
	children,
	label,
	description,
	rightToField,
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
					rightToField={rightToField}
				>
					{children}
				</BaseFieldWithDescription>
			) : (
				<BaseFieldWithoutDescription
					labelFirstOnHorizontal={labelFirstOnHorizontal}
					orientation={orientation}
					label={label}
					srOnlyLabel={srOnlyLabel}
					rightToField={rightToField}
				>
					{children}
				</BaseFieldWithoutDescription>
			)}
			<FieldErrors match={isInvalid} errors={field.state.meta.errors} />
		</Field>
	);
}
