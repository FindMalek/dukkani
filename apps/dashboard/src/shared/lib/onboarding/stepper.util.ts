import { UserOnboardingStep } from "@dukkani/common/schemas/enums";

/**
 * Client-side onboarding utilities for pure logic operations
 * These functions don't require server data and can run safely on the client
 */

/**
 * Get the next step in the onboarding flow
 * Pure enum manipulation - no server data required
 */
export function getNextStep(
  currentStep: UserOnboardingStep | null,
): UserOnboardingStep | null {
  const ONBOARDING_STEPS: UserOnboardingStep[] = [
    UserOnboardingStep.STORE_SETUP,
    UserOnboardingStep.STORE_CREATED,
    UserOnboardingStep.STORE_CONFIGURED,
    UserOnboardingStep.STORE_LAUNCHED,
  ];

  if (!currentStep) return ONBOARDING_STEPS[0] ?? null;

  const currentIndex = ONBOARDING_STEPS.indexOf(currentStep);
  const nextIndex = currentIndex + 1;

  return (
    (nextIndex < ONBOARDING_STEPS.length
      ? ONBOARDING_STEPS[nextIndex]
      : null) ?? null
  );
}

/**
 * Get the previous step in the onboarding flow
 * Pure enum manipulation - no server data required
 */
export function getPreviousStep(
  currentStep: UserOnboardingStep | null,
): UserOnboardingStep | null {
  const ONBOARDING_STEPS: UserOnboardingStep[] = [
    UserOnboardingStep.STORE_SETUP,
    UserOnboardingStep.STORE_CREATED,
    UserOnboardingStep.STORE_CONFIGURED,
    UserOnboardingStep.STORE_LAUNCHED,
  ];

  if (!currentStep) return null;
  const currentIndex = ONBOARDING_STEPS.indexOf(currentStep);
  const previousIndex = currentIndex - 1;

  return (previousIndex >= 0 ? ONBOARDING_STEPS[previousIndex] : null) ?? null;
}

/**
 * Check if user can proceed to the next step
 * Simple comparison - no server data required
 */
export function canProceedToNextStep(
  currentStep: UserOnboardingStep | null,
): boolean {
  if (!currentStep) return false;
  return currentStep !== UserOnboardingStep.STORE_LAUNCHED;
}

/**
 * Validate if a step transition is allowed
 * Prevents backward movement in onboarding flow
 * Pure array index comparison - no server data required
 */
export function isValidStepTransition(
  fromStep: UserOnboardingStep | null,
  toStep: UserOnboardingStep | null,
): boolean {
  if (!fromStep || !toStep) return true;

  const ONBOARDING_STEPS: UserOnboardingStep[] = [
    UserOnboardingStep.STORE_SETUP,
    UserOnboardingStep.STORE_CREATED,
    UserOnboardingStep.STORE_CONFIGURED,
    UserOnboardingStep.STORE_LAUNCHED,
  ];

  const fromIndex = ONBOARDING_STEPS.indexOf(fromStep);
  const toIndex = ONBOARDING_STEPS.indexOf(toStep);

  // If either step is not found, allow the transition
  if (fromIndex === -1 || toIndex === -1) return true;

  // Allow forward movement and staying on the same step
  // Don't allow backward movement in onboarding
  const isValid = toIndex >= fromIndex;

  return isValid;
}

/**
 * Determine if store should be auto-selected based on onboarding step
 * Pure logic - no server data required
 */
export function shouldAutoSelectStore(
  onboardingStep: UserOnboardingStep | null,
  storeId: string | null,
): boolean {
  const shouldAuto =
    (onboardingStep === UserOnboardingStep.STORE_CREATED ||
      onboardingStep === UserOnboardingStep.STORE_CONFIGURED ||
      onboardingStep === UserOnboardingStep.STORE_LAUNCHED) &&
    !storeId;

  return shouldAuto;
}
