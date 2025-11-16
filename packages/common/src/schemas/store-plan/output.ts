import { z } from "zod";
import { storePlanTypeSchema } from "./enums";

export const storePlanSimpleOutputSchema = z.object({
	id: z.string(),
	planType: storePlanTypeSchema,
	orderLimit: z.number().int(),
	orderCount: z.number().int(),
	resetAt: z.date().nullable(),
	storeId: z.string(),
	createdAt: z.date(),
	updatedAt: z.date(),
});

// Lazy schema reference to avoid circular dependency
let _storeSimpleOutputSchema: typeof import("../store/output").storeSimpleOutputSchema | undefined;

function getStoreSchema() {
	if (!_storeSimpleOutputSchema) {
		_storeSimpleOutputSchema = require("../store/output").storeSimpleOutputSchema;
	}
	return _storeSimpleOutputSchema!;
}

export const storePlanIncludeOutputSchema = storePlanSimpleOutputSchema.extend({
	store: z.lazy(() => getStoreSchema()).optional(),
});

export type StorePlanSimpleOutput = z.infer<typeof storePlanSimpleOutputSchema>;
export type StorePlanIncludeOutput = z.infer<typeof storePlanIncludeOutputSchema>;

