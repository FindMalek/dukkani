import { z } from "zod";
import { healthStatusSchema } from "./enums";

export const healthStorageOutputSchema = z.object({
	status: z.enum(["ok", "error"]),
	latencyMs: z.number().int().optional(),
});

export const healthSimpleOutputSchema = z.object({
	id: z.string(),
	status: healthStatusSchema,
	duration: z.number().int(),
	startTime: z.date(),
	endTime: z.date(),
	storage: healthStorageOutputSchema.optional(),
});

export type HealthSimpleOutput = z.infer<typeof healthSimpleOutputSchema>;
export type HealthStorageOutput = z.infer<typeof healthStorageOutputSchema>;
