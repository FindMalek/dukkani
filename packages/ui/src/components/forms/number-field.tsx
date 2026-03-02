import type { InputHTMLAttributes } from "react";
import { useCallback, useMemo } from "react";
import { useFieldContext } from "../../hooks/use-app-form";
import { Icons } from "../icons";
import {
	InputGroup,
	InputGroupAddon,
	InputGroupButton,
	InputGroupInput,
} from "../input-group";
import { BaseField } from "./base-field";

// Avoid float precision issues (e.g. 0.2 + 0.1 => 0.30000000004); round to 3 decimals
const stepResult = (n: number) => String(Number(Number(n).toFixed(3)));

type NumberFieldProps = {
	label: string;
	min?: number;
	max?: number;
	step?: number;
	inputMode?: InputHTMLAttributes<HTMLInputElement>["inputMode"];
} & Omit<
	InputHTMLAttributes<HTMLInputElement>,
	"type" | "min" | "max" | "step" | "inputMode"
>;

export function NumberField({
	label,
	min = Number.NEGATIVE_INFINITY,
	max = Number.POSITIVE_INFINITY,
	inputMode = "numeric",
	step = 1,
	...props
}: NumberFieldProps) {
	const field = useFieldContext<string>();

	const isInvalid = useMemo(
		() => field.state.meta.isTouched && !field.state.meta.isValid,
		[field.state.meta.isTouched, field.state.meta.isValid],
	);

	const handleDecrement = useCallback(() => {
		field.handleChange(stepResult(Number(field.state.value) - step));
	}, [field, step]);

	const handleIncrement = useCallback(() => {
		field.handleChange(stepResult(Number(field.state.value) + step));
	}, [field, step]);

	const handleChange = useCallback(
		(e: React.ChangeEvent<HTMLInputElement>) => {
			const raw = e.target.value;

			// Allow clearing
			if (raw === "") {
				field.handleChange("");
				return;
			}

			const allowsDecimal = inputMode === "decimal";

			if (allowsDecimal) {
				// Normalize comma to dot for validation and storage
				const withDot = raw.replace(",", ".");
				const separatorCount = (raw.match(/[.,]/g) ?? []).length;
				if (separatorCount > 1) return;

				// Integer part, optional decimal part (max 3 digits), optional leading minus
				const isDecimalPattern = /^-?\d*\.?\d{0,3}$/.test(withDot);
				if (!isDecimalPattern) return;

				// Normalize leading . or -. for UX
				const normalized = withDot.startsWith("-.")
					? `-0${withDot.slice(1)}`
					: withDot.startsWith(".")
						? `0${withDot}`
						: withDot;

				field.handleChange(normalized);
				return;
			}

			// Numeric (integers only): digits and optional leading minus
			const isIntegerPattern = /^-?\d*$/.test(raw);
			if (!isIntegerPattern) return;

			// When value is "0", disallow appending digits (e.g. "05" → "5")
			const prev = field.state.value;
			if (prev === "0" && raw.startsWith("0") && raw.length > 1) {
				field.handleChange(raw.slice(1));
				return;
			}

			field.handleChange(raw);
		},
		[field, inputMode],
	);

	const isMinDisabled = useMemo(
		() => Number(field.state.value) <= min,
		[field.state.value, min],
	);

	const isMaxDisabled = useMemo(
		() => Number(field.state.value) >= max,
		[field.state.value, max],
	);

	return (
		<BaseField label={label} orientation={"vertical"}>
			<InputGroup>
				<InputGroupAddon align="inline-start">
					<InputGroupButton
						variant={"secondary"}
						size="icon-xs"
						onClick={handleDecrement}
						disabled={isMinDisabled}
					>
						<Icons.minus className="size-4" />
					</InputGroupButton>
				</InputGroupAddon>
				<InputGroupInput
					id={field.name}
					name={field.name}
					value={field.state.value}
					onChange={handleChange}
					onBlur={field.handleBlur}
					aria-invalid={isInvalid}
					type="text"
					className="text-end"
					inputMode={inputMode}
					min={min}
					max={max}
					step={step}
					{...props}
				/>
				<InputGroupAddon align="inline-end">
					<InputGroupButton
						variant={"secondary"}
						size="icon-xs"
						onClick={handleIncrement}
						disabled={isMaxDisabled}
					>
						<Icons.plus className="size-4" />
					</InputGroupButton>
				</InputGroupAddon>
			</InputGroup>
		</BaseField>
	);
}
