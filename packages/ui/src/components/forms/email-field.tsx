import type * as React from "react";
import { TextField } from "./text-field";

type EmailFieldProps = {
	label: string;
} & Omit<React.InputHTMLAttributes<HTMLInputElement>, "type">;

export function EmailField({
	label,
	...inputProps
}: EmailFieldProps) {
	return <TextField label={label} {...inputProps} type="email"/>;
}
