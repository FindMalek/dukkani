import { z } from "zod";

export const categoryOutputSchema = z.object({
	id: z.string(),
	name: z.string(),
	storeId: z.string(),
	createdAt: z.date(),
	updatedAt: z.date(),
});

export type CategoryOutput = z.infer<typeof categoryOutputSchema>;
