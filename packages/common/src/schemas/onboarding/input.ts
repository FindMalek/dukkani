import { z } from "zod";
import { userOnboardingStepSchema } from "../enums";

export const onboardingCompleteInputSchema = z.object({
  storeId: z.string().min(1, "Store ID is required").optional(),
});

export const onboardingGetStateInputSchema = z.object({
  guestStep: userOnboardingStepSchema.nullable().optional(),
});

export const onboardingGetStepConfigInputSchema = z.object({
  step: userOnboardingStepSchema.nullable(),
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
