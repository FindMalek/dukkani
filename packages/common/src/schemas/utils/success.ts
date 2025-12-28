import { z } from "zod";

export const successOutputSchema = z.object({
	success: z.boolean(),
});

export type SuccessOutput = z.infer<typeof successOutputSchema>;