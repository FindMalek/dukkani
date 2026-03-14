import type * as React from "react";
import { useFieldContext } from "../../hooks/use-app-form";
import { Textarea } from "../textarea";
import { BaseField, type CommonFieldProps } from "./base-field";

interface TextAreaFieldProps
	extends CommonFieldProps,
		React.ComponentProps<typeof Textarea> {}

export function TextAreaField({
	label,
	description,
	orientation,
	...inputProps
}: TextAreaFieldProps) {
	const field = useFieldContext<string>();
	const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;

	return (
		<BaseField
			label={label}
			description={description}
			orientation={orientation}
		>
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
