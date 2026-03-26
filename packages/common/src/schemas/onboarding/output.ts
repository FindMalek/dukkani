import { z } from "zod";
import type {
  OnboardingState,
  OnboardingStepConfig,
} from "../../services/onboarding.service";
import { UserOnboardingStep } from "../enums";
import { userSimpleOutputSchema } from "../user/output";

export const onboardingCompleteOutputSchema = z.object({
  storeId: z.string(),
  storeSlug: z.string(),
  storeUrl: z.string(),
});

export const onboardingGetStateOutputSchema = z.object({
  isAuthenticated: z.boolean(),
  currentUser: userSimpleOutputSchema.nullable(),
  onboardingStep: z.enum(UserOnboardingStep).nullable(),
  effectiveStep: z.enum(UserOnboardingStep).nullable(),
  needsStores: z.boolean(),
  isComplete: z.boolean(),
  canProceed: z.boolean(),
}) satisfies z.ZodType<OnboardingState>;

export const onboardingShouldShowStoresOutputSchema = z.boolean();

export const onboardingIsCompleteOutputSchema = z.boolean();

export const onboardingGetStepConfigOutputSchema = z.object({
  title: z.string(),
  description: z.string().optional(),
  canProceed: z.boolean(),
  requiresAuth: z.boolean(),
  requiresStores: z.boolean(),
}) satisfies z.ZodType<OnboardingStepConfig>;

export type OnboardingCompleteOutput = z.infer<
  typeof onboardingCompleteOutputSchema
>;

export type OnboardingGetStateOutput = z.infer<
  typeof onboardingGetStateOutputSchema
>;

export type OnboardingShouldShowStoresOutput = z.infer<
  typeof onboardingShouldShowStoresOutputSchema
>;

export type OnboardingIsCompleteOutput = z.infer<
  typeof onboardingIsCompleteOutputSchema
>;

export type OnboardingGetStepConfigOutput = z.infer<
  typeof onboardingGetStepConfigOutputSchema
>;
