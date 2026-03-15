import type * as React from "react";
import type { CommonFieldProps } from "./base-field";
import { TextField } from "./text-field";

interface EmailFieldProps
	extends CommonFieldProps,
		Omit<React.ComponentProps<typeof TextField>, "type"> {}

export function EmailField(props: EmailFieldProps) {
	return <TextField {...props} type="email" />;
}
