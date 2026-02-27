import type { InputHTMLAttributes } from "react";
import { useFieldContext } from "../../hooks/use-app-form";
import { Icons } from "../icons";
import {
	InputGroup,
	InputGroupAddon,
	InputGroupButton,
	InputGroupInput,
} from "../input-group";
import { BaseField } from "./base-field";

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
	const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;
	return (
		<BaseField label={label}>
			<InputGroup>
				<InputGroupAddon align="inline-start">
					<InputGroupButton
						size="icon-xs"
						onClick={() =>
							field.handleChange(String(Number(field.state.value) - step))
						}
						disabled={Number(field.state.value) <= min}
					>
						<Icons.minus className="size-4" />
					</InputGroupButton>
				</InputGroupAddon>
				<InputGroupInput
					id={field.name}
					name={field.name}
					value={field.state.value}
					onChange={(e) => {
						const raw = e.target.value;

						// Allow clearing
						if (raw === "") {
							field.handleChange("");
							return;
						}

						const allowsDecimal = inputMode === "decimal";

						if (allowsDecimal) {
							// Integer part, optional decimal part, optional leading minus
							const hasMultipleDots = (raw.match(/\./g) ?? []).length > 1;
							const isDecimalPattern = /^-?(\d*\.?\d*)$/.test(raw);

							if (hasMultipleDots || !isDecimalPattern) return;

							// Normalize leading . or -. for UX
							const normalized =
								raw.startsWith("-.")
									? `-0${raw.slice(1)}`
									: raw.startsWith(".")
										? `0${raw}`
										: raw;

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
					}}
					onBlur={field.handleBlur}
					aria-invalid={isInvalid}
					type="text"
					inputMode={inputMode}
					min={min}
					max={max}
					step={step}
					{...props}
				/>
				<InputGroupAddon align="inline-end">
					<InputGroupButton
						size="icon-xs"
						onClick={() =>
							field.handleChange(String(Number(field.state.value) + step))
						}
						disabled={Number(field.state.value) >= max}
					>
						<Icons.plus className="size-4" />
					</InputGroupButton>
				</InputGroupAddon>
			</InputGroup>
		</BaseField>
	);
}
