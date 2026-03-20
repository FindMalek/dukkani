import { z } from "zod";
import { UserOnboardingStep } from "../enums";

export const onboardingCompleteInputSchema = z.object({
	storeId: z.string().min(1, "Store ID is required").optional(),
});

export const onboardingGetStateInputSchema = z.object({
	guestStep: z.enum(UserOnboardingStep).nullable().optional(),
});

export const onboardingGetStepConfigInputSchema = z.object({
	step: z.enum(UserOnboardingStep).nullable(),
});

export type OnboardingCompleteInput = z.infer<
	typeof onboardingCompleteInputSchema
>;

export type OnboardingGetStateInput = z.infer<
	typeof onboardingGetStateInputSchema
>;

export type OnboardingGetStepConfigInput = z.infer<
	typeof onboardingGetStepConfigInputSchema
>;
