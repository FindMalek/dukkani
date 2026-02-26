import type * as React from "react";
import { useFieldContext } from "../../hooks/use-app-form";
import { Checkbox } from "../checkbox";
import { BaseField, type CommonFieldProps } from "./base-field";

type CheckboxFieldProps = CommonFieldProps &
	React.ComponentProps<typeof Checkbox>;

export function CheckboxField({
	label,
	description,
	...props
}: CheckboxFieldProps) {
	const field = useFieldContext<boolean>();
	const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;
	return (
		<BaseField
			label={label}
			description={description}
			orientation={"horizontal"}
		>
			<Checkbox
				id={field.name}
				name={field.name}
				checked={field.state.value}
				onCheckedChange={(checked) => checked !== "indeterminate" && field.handleChange(checked)}
				onBlur={field.handleBlur}
				aria-invalid={isInvalid}
				{...props}
			/>
		</BaseField>
	);
}
