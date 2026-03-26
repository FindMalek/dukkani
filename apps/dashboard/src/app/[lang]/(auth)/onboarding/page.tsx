"use client";

import { UserOnboardingStep } from "@dukkani/common/schemas/enums";
import { parseEmail, parseOnboardingStep } from "@dukkani/common/utils";
import { Button } from "@dukkani/ui/components/button";
import { Skeleton } from "@dukkani/ui/components/skeleton";
import { useAppForm } from "@dukkani/ui/hooks/use-app-form";
import { RedirectType, redirect } from "next/navigation";
import { useTranslations } from "next-intl";
import { useQueryState } from "nuqs";
import { useEffect, useState } from "react";
import { OnboardingStepper } from "@/components/app/onboarding/onboarding-stepper";
import { OnboardingCompletion } from "@/components/auth/onboarding-completion";
import {
  SignUpOnboardingForm,
  signUpOnboardingFormDefaultValues as signUpOnboardingFormDefaultOptions,
} from "@/components/auth/onboarding-sign-up-form";
import { StoreConfigurationOnboardingForm } from "@/components/auth/onboarding-store-configuration-form";
import { StoreSetupOnboardingForm } from "@/components/auth/onboarding-store-setup-form";
import { useOnboardingController } from "@/hooks/controllers/use-onboarding-controller";
import { authClient } from "@/lib/auth-client";
import { RoutePaths } from "@/lib/routes";

export default function OnboardingPage() {
  const t = useTranslations("onboarding");

  const [email] = useQueryState("email", parseEmail);
  const [step, setStep] = useQueryState("step", parseOnboardingStep);
  const [skeletonTimedOut, setSkeletonTimedOut] = useState(false);

  const onboarding = useOnboardingController(t, step, setStep);

  // Add timeout to prevent indefinite skeleton state
  useEffect(() => {
    const waitingForStoreHydration =
      onboarding.isAuthenticated &&
      onboarding.effectiveStep === UserOnboardingStep.STORE_CREATED &&
      (onboarding.isStoresLoading || !onboarding.storeId);

    if (waitingForStoreHydration && !skeletonTimedOut) {
      const timeout = setTimeout(() => {
        setSkeletonTimedOut(true);
      }, 5000); // 5 second timeout

      return () => clearTimeout(timeout);
    }
  }, [
    onboarding.isAuthenticated,
    onboarding.effectiveStep,
    onboarding.isStoresLoading,
    onboarding.storeId,
    skeletonTimedOut,
  ]);
  const signUpForm = useAppForm({
    ...signUpOnboardingFormDefaultOptions(email ?? ""),
    onSubmit: async ({ value, formApi }) => {
      await authClient.signUp.email(
        {
          email: value.email,
          password: value.password,
          name: value.name,
        },
        {
          onSuccess: async () => {
            setStep(UserOnboardingStep.STORE_SETUP);
          },
          onError: async (error) => {
            if (error.error.code === "USER_ALREADY_EXISTS_USE_ANOTHER_EMAIL") {
              formApi.setFieldMeta("email", (fieldMeta) => ({
                ...fieldMeta,
                errorMap: {
                  onSubmit: {
                    message: t("errors.emailAlreadyInUse"),
                  },
                },
              }));
            }
          },
        },
      );
    },
  });

  if (onboarding.isSessionPending) {
    return null;
  }

  if (onboarding.isAuthenticated && onboarding.isCurrentUserLoading) {
    return (
      <div className="flex min-h-[40vh] items-center justify-center">
        <div className="w-full max-w-md space-y-6">
          <div className="space-y-2 text-center">
            <Skeleton className="mx-auto h-8 w-48" />
            <Skeleton className="mx-auto h-4 w-64" />
          </div>
          <div className="space-y-4">
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-full" />
          </div>
        </div>
      </div>
    );
  }

  if (onboarding.isComplete) {
    redirect(RoutePaths.DASHBOARD.url, RedirectType.replace);
  }

  const waitingForStoreHydration =
    onboarding.isAuthenticated &&
    onboarding.effectiveStep === UserOnboardingStep.STORE_CREATED &&
    (onboarding.isStoresLoading || !onboarding.storeId) &&
    !skeletonTimedOut;

  if (waitingForStoreHydration) {
    return (
      <div className="flex min-h-[40vh] items-center justify-center">
        <div className="w-full max-w-md space-y-4">
          <Skeleton className="h-6 w-32" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-3/4" />
        </div>
      </div>
    );
  }

  if (
    onboarding.isAuthenticated &&
    onboarding.effectiveStep === UserOnboardingStep.STORE_CREATED &&
    onboarding.stores?.length === 0 &&
    !onboarding.isStoresLoading &&
    skeletonTimedOut
  ) {
    return (
      <div className="flex w-full max-w-md flex-col gap-4 text-center">
        <p className="text-muted-foreground text-sm">
          {t("errors.storeLoadFailed")}
        </p>
        <Button
          type="button"
          onClick={() => window.location.reload()}
          size="lg"
        >
          {t("actions.retry")}
        </Button>
      </div>
    );
  }

  const stepperStep =
    onboarding.effectiveStep === UserOnboardingStep.STORE_LAUNCHED
      ? UserOnboardingStep.STORE_LAUNCHED
      : onboarding.effectiveStep;

  return (
    <div className="flex w-full max-w-md flex-col gap-10">
      <OnboardingStepper currentStep={stepperStep} />
      {!onboarding.isAuthenticated && onboarding.effectiveStep === null && (
        <SignUpOnboardingForm form={signUpForm} />
      )}
      {onboarding.effectiveStep === UserOnboardingStep.STORE_SETUP && (
        <StoreSetupOnboardingForm form={onboarding.forms.storeSetupForm} />
      )}
      {onboarding.effectiveStep === UserOnboardingStep.STORE_CREATED && (
        <StoreConfigurationOnboardingForm
          form={onboarding.forms.storeConfigurationForm}
        />
      )}
      {onboarding.effectiveStep === UserOnboardingStep.STORE_LAUNCHED &&
        onboarding.storeId && (
          <OnboardingCompletion storeId={onboarding.storeId} />
        )}
    </div>
  );
}
