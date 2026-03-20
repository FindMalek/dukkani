import type * as React from "react";
import { TextField } from "./text-field";

type TextFieldProps = React.ComponentProps<typeof TextField>;

interface EmailFieldProps extends Omit<TextFieldProps, "type"> {}

export function EmailField(props: EmailFieldProps) {
	return <TextField {...props} type="email" />;
}
