"use client";

import { useForm } from "@tanstack/react-form";
import type { ZodType, z } from "zod";

type ValidationMode = "onSubmit" | "onBlur" | "onChange";

export function useSchemaForm<T extends ZodType>({
	schema,
	defaultValues,
	validationMode = "onSubmit",
	onSubmit,
}: {
	schema: T;
	defaultValues: z.infer<T>;
	validationMode?: ValidationMode | ValidationMode[];
	onSubmit: (values: z.infer<T>) => void | Promise<void>;
}) {
	const modes = Array.isArray(validationMode)
		? validationMode
		: [validationMode];

	const validators: Record<string, T> = {};
	for (const mode of modes) {
		validators[mode] = schema;
	}

	return useForm({
		defaultValues,
		validators,
		onSubmit: async ({ value }: { value: z.infer<T> }) => {
			await onSubmit(value);
		},
	});
}
