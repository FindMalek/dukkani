import type * as React from "react";
import { TextField } from "./text-field";

type EmailFieldProps = {
	label?: string;
} & React.InputHTMLAttributes<HTMLInputElement>;

export function EmailField({
	label = "Email",
	...inputProps
}: EmailFieldProps) {
	return <TextField label={label} type="email" {...inputProps} />;
}
