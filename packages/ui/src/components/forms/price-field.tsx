import type { InputHTMLAttributes } from "react";
import { useCallback, useMemo } from "react";
import { useFieldContext } from "../../hooks/use-app-form";
import {
	InputGroup,
	InputGroupAddon,
	InputGroupInput,
	InputGroupText,
} from "../input-group";
import { BaseField } from "./base-field";

interface PriceFieldProps
	extends Omit<InputHTMLAttributes<HTMLInputElement>, "type" | "inputMode"> {
	label: string;
	min?: number;
	max?: number;
	step?: number;
	maxPoints?: number;
}

export function PriceField({
	label,
	min = Number.NEGATIVE_INFINITY,
	max = Number.POSITIVE_INFINITY,
	step = 1,
	maxPoints = 3,
	...props
}: PriceFieldProps) {
	const field = useFieldContext<string>();

	const isInvalid = useMemo(
		() => field.state.meta.isTouched && !field.state.meta.isValid,
		[field.state.meta.isTouched, field.state.meta.isValid],
	);

	const handleChange = useCallback(
		(e: React.ChangeEvent<HTMLInputElement>) => {
			const raw = e.target.value;

			// Allow clearing
			if (raw === "") {
				field.handleChange("");
				return;
			}

			// Only allow digits and a single decimal separator (dot or comma)
			const separatorCount = (raw.match(/[.,]/g) ?? []).length;
			if (separatorCount > 1) {
				return;
			}

			const withDot = raw.replace(",", ".");

			// Only positive decimal numbers with up to maxPoints decimal places
			const decimalPattern = new RegExp(`^\\d*\\.?\\d{0,${maxPoints}}$`);
			if (!decimalPattern.test(withDot)) {
				return;
			}

			let normalized = withDot;

			// Normalize leading "." to "0."
			if (normalized.startsWith(".")) {
				normalized = `0${normalized}`;
			}

			// Remove unnecessary leading zeros in integer part (but keep "0." and "0")
			const [integerPart = "", decimalPart] = normalized.split(".");
			let cleanedInteger = integerPart.replace(/^0+/, "");
			if (cleanedInteger === "") {
				cleanedInteger = "0";
			}
			normalized =
				decimalPart !== undefined
					? `${cleanedInteger}.${decimalPart}`
					: cleanedInteger;

			field.handleChange(normalized);
		},
		[field, maxPoints],
	);

	return (
		<BaseField label={label} orientation={"vertical"}>
			<InputGroup>
				<InputGroupInput
					id={field.name}
					name={field.name}
					value={field.state.value}
					onChange={handleChange}
					onBlur={field.handleBlur}
					aria-invalid={isInvalid}
					type="text"
					className="text-center"
					inputMode={"decimal"}
					min={min}
					max={max}
					step={step}
					{...props}
				/>
				<InputGroupAddon align="inline-end">
					<InputGroupText>TND</InputGroupText>
				</InputGroupAddon>
			</InputGroup>
		</BaseField>
	);
}
