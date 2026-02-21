import type * as React from "react";
import { useFieldContext } from "../../hooks/use-app-form";
import {
	Field,
	FieldContent,
	FieldDescription,
	FieldErrors,
	FieldLabel,
} from "../field";

export type CommonFieldProps = {
	label: string;
	description?: string;
};

type BaseFieldProps = {
	orientation?: "vertical" | "horizontal" | "responsive";
	children: React.ReactNode;
};

export function BaseField({
	children,
	label,
	orientation = "vertical",
	description,
}: CommonFieldProps & BaseFieldProps) {
	const field = useFieldContext();
	const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;
	return (
		<Field orientation={orientation}>
			{orientation !== "vertical" && children}
			<FieldContent>
				<FieldLabel htmlFor={field.name}>{label}</FieldLabel>
				{description && <FieldDescription>{description}</FieldDescription>}
			</FieldContent>
			{orientation === "vertical" && children}
			<FieldErrors match={isInvalid} errors={field.state.meta.errors} />
		</Field>
	);
}
