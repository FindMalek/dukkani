import type * as React from "react";
import { useFieldContext } from "../../hooks/use-app-form";
import { Textarea } from "../textarea";
import { BaseField } from "./base-field";

type TextAreaFieldProps = {
        label: string;
} & React.TextareaHTMLAttributes<HTMLTextAreaElement>;

export function TextAreaField({ label, ...inputProps }: TextAreaFieldProps) {
	const field = useFieldContext<string>();
	const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;

	return (
		<BaseField label={label}>
			<Textarea
				id={field.name}
				name={field.name}
				value={field.state.value}
                onChange={(e) => field.handleChange(e.target.value)}
				onBlur={field.handleBlur}
				aria-invalid={isInvalid}
				{...inputProps}
			/>
		</BaseField>
	);
}
