import { useFieldContext } from "../../hooks/use-app-form";
import { RadioGroup } from "../radio-group";
import { BaseField, type CommonFieldProps } from "./base-field";

interface RadioFieldProps extends React.PropsWithChildren<CommonFieldProps> {}

export function RadioField({
	label,
	description,
	labelFirst,
	rightToField,
	orientation,
	children,
}: RadioFieldProps) {
	const field = useFieldContext<unknown>();

	return (
		<BaseField
			label={label}
			description={description}
			labelFirst={labelFirst}
			rightToField={rightToField}
			orientation={orientation}
		>
			<RadioGroup>{children}</RadioGroup>
		</BaseField>
	);
}
