import type * as React from "react";
import { useFieldContext } from "../../hooks/use-app-form";
import { Checkbox } from "../checkbox";
import { Switch } from "../switch";
import { BaseField, type CommonFieldProps } from "./base-field";

type SwitchFieldProps = CommonFieldProps & React.ComponentProps<typeof Switch>;

export function SwitchField({
	label,
	description,
	...props
}: SwitchFieldProps) {
	const field = useFieldContext<boolean>();
	const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;
	return (
		<BaseField
			label={label}
			description={description}
			orientation={"horizontal"}
			labelFirstOnHorizontal
		>
			<Switch
				id={field.name}
				name={field.name}
				checked={field.state.value}
				onCheckedChange={(checked) => field.handleChange(checked)}
				onBlur={field.handleBlur}
				aria-invalid={isInvalid}
				{...props}
			/>
		</BaseField>
	);
}
