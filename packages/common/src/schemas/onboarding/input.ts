import { z } from "zod";

export const onboardingCompleteInputSchema = z.object({
	storeId: z.string().min(1, "Store ID is required").optional(),
});

export type OnboardingCompleteInput = z.infer<typeof onboardingCompleteInputSchema>;