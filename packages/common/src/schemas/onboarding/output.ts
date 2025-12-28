import { z } from "zod";

export const onboardingCompleteOutputSchema = z.object({
	storeId: z.string(),
	storeSlug: z.string(),
	storeUrl: z.string(),
});

export type OnboardingCompleteOutput = z.infer<
	typeof onboardingCompleteOutputSchema
>;
