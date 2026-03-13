import { useFieldContext } from "../../hooks/use-app-form";
import { RadioGroup } from "../radio-group";
import { BaseField } from "./base-field";

interface RadioFieldProps {
	label: string;
	children: React.ReactNode;
}

export function RadioField({ label, children }: RadioFieldProps) {
    const field = useFieldContext();
	return (
		<BaseField label={label}>
			<RadioGroup>{children}</RadioGroup>
		</BaseField>
	);
}
