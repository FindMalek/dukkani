import { Eye, EyeOff } from "lucide-react";
import { type InputHTMLAttributes, useState } from "react";
import { useFieldContext } from "../../hooks/use-app-form";
import {
	InputGroup,
	InputGroupAddon,
	InputGroupButton,
	InputGroupInput,
} from "../input-group";
import { BaseField } from "./base-field";

type PasswordFieldProps = {
	label: string;
} & Omit<InputHTMLAttributes<HTMLInputElement>, "type">;

export function PasswordField({
	label,
	...props
}: PasswordFieldProps) {
	const field = useFieldContext<string>();
	const [hidden, setHidden] = useState(true);
	const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;
	return (
		<BaseField label={label}>
			<InputGroup>
				<InputGroupInput
					id={field.name}
					name={field.name}
					type={hidden ? "password" : "text"}
					value={field.state.value}
					onChange={(e) => field.handleChange(e.target.value)}
					onBlur={field.handleBlur}
					aria-invalid={isInvalid}
					{...props}
				/>
				<InputGroupAddon align="inline-end">
					<InputGroupButton
						aria-label={hidden ? "password-input.show" : "password-input.hide"}
						title={hidden ? "password-input.show" : "password-input.hide"}
						size="icon-xs"
						onClick={() => setHidden((v) => !v)}
					>
						{hidden ? (
							<EyeOff className="h-4 w-4" />
						) : (
							<Eye className="h-4 w-4" />
						)}
					</InputGroupButton>
				</InputGroupAddon>
			</InputGroup>
		</BaseField>
	);
}
