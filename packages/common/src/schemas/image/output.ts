import { z } from "zod";

export const imageSimpleOutputSchema = z.object({
	id: z.string(),
	url: z.string(),
	productId: z.string(),
	createdAt: z.date(),
	updatedAt: z.date(),
});

export const imageIncludeOutputSchema = imageSimpleOutputSchema.extend({
	product: z.unknown().optional(),
});

export type ImageSimpleOutput = z.infer<typeof imageSimpleOutputSchema>;
export type ImageIncludeOutput = z.infer<typeof imageIncludeOutputSchema>;

