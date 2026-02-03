import type { VariantOutput } from "../schemas/variant/output";

/**
 * Build a human-readable description from variant selections
 *
 * @example
 * // Input: variant with selections [{ option: { name: "Size" }, value: { value: "M" } }, { option: { name: "Color" }, value: { value: "Red" } }]
 * // Output: "Size: M, Color: Red"
 *
 * @param variant - The variant with selections
 * @returns Formatted description string or undefined if no selections
 */
export function buildVariantDescription(
	variant: VariantOutput | null | undefined,
): string | undefined {
	if (!variant?.selections || variant.selections.length === 0) {
		return undefined;
	}

	const descriptions = variant.selections
		.map((selection) => {
			const optionName = selection.option?.name;
			const valueLabel = selection.value?.value;

			if (optionName && valueLabel) {
				return `${optionName}: ${valueLabel}`;
			}

			return null;
		})
		.filter((desc): desc is string => desc !== null);

	return descriptions.length > 0 ? descriptions.join(", ") : undefined;
}
