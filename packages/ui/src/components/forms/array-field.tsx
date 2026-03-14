import { useFieldContext } from "../../hooks/use-app-form";
import { cn } from "../../lib/utils";
import {
	Field,
	FieldContent,
	FieldDescription,
	FieldErrors,
	FieldLabel,
} from "../field";
import type { CommonFieldProps } from "./base-field";

interface CommonArrayFieldProps
	extends CommonFieldProps,
		Required<React.PropsWithChildren> {}

export function ArrayField({
	label,
	srOnlyLabel = false,
	description,
	children,
}: CommonArrayFieldProps) {
	const field = useFieldContext<unknown[]>();
	const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;

	return (
		<Field>
			<FieldContent>
				<FieldLabel className={cn(srOnlyLabel && "sr-only")}>
					{label}
				</FieldLabel>
				<FieldDescription>{description}</FieldDescription>
			</FieldContent>
			{children}
			<FieldErrors errors={field.state.meta.errors} match={isInvalid} />
		</Field>
	);
}
