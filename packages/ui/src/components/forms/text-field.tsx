import type * as React from "react";
import { useFieldContext } from "../../hooks/use-app-form";
import { Input } from "../input";
import { BaseField } from "./base-field";

type TextFieldProps = {
	label: string;
	type?: React.InputHTMLAttributes<HTMLInputElement>["type"];
} & Omit<React.InputHTMLAttributes<HTMLInputElement>, "type">;

export function TextField({
	label,
	type = "text",
	...inputProps
}: TextFieldProps) {
	const field = useFieldContext<string>();
	const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;

	return (
		<BaseField label={label}>
			<Input
				id={field.name}
				name={field.name}
				value={field.state.value}
				onChange={(e) => field.handleChange(e.target.value)}
				onBlur={field.handleBlur}
				aria-invalid={isInvalid}
				{...inputProps}
				type={type}
			/>
		</BaseField>
	);
}
