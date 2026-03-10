import { useFieldContext } from "../../hooks/use-app-form";
import { Icons } from "../icons";
import {
	InputGroup,
	InputGroupAddon,
	InputGroupButton,
	InputGroupInput,
} from "../input-group";
import { BaseField, type CommonFieldProps } from "./base-field";

interface PillFieldProps
	extends CommonFieldProps,
		Omit<React.InputHTMLAttributes<HTMLInputElement>, "type"> {
	onDelete?: () => void;
}

export function PillField({ label, onDelete, ...props }: PillFieldProps) {
	const field = useFieldContext<string>();
	const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;
	return (
		<BaseField label={label} srOnlyLabel>
			<InputGroup className="group/pill rounded-full">
				<InputGroupInput
					type="text"
					value={field.state.value}
					onChange={(e) => field.handleChange(e.target.value)}
					onBlur={field.handleBlur}
					aria-invalid={isInvalid}
					className="w-fit rounded-full"
					{...props}
				/>
				{onDelete && (
					<InputGroupAddon align="inline-end">
						<InputGroupButton
							type="button"
							variant="ghost"
							className="rounded-full"
							size="icon-xs"
							onClick={onDelete}
						>
							<Icons.trash className="size-3" />
						</InputGroupButton>
					</InputGroupAddon>
				)}
			</InputGroup>
		</BaseField>
	);
}
