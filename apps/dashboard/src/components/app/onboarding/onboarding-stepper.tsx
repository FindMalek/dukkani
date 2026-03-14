"use client";

import { cn } from "@dukkani/ui/lib/utils";

const steps = [
	"SIGNUP",
	"STORE_CREATION",
	"STORE_CONFIGURATION",
	"COMPLETION"
] as const;

export type OnboardingStep = (typeof steps)[number];

interface OnboardingStepperProps {
	currentStep: OnboardingStep;
}

export function OnboardingStepper({
	currentStep = "SIGNUP",
}: OnboardingStepperProps) {

	const currentIndex = steps.indexOf(currentStep);

	return (
		<div className="flex w-full items-center gap-2 px-2 py-4">
			{steps.map((step, index) => {
				const isCompleted = index < currentIndex;
				const isActive = index === currentIndex;

				return (
					<div
						key={step}
						className={cn(
							"h-1.5 flex-1 rounded-full transition-all duration-500",
							isCompleted || isActive ? "bg-primary" : "bg-muted",
							isActive && "opacity-100",
							!isActive && !isCompleted && "opacity-40",
						)}
					/>
				);
			})}
		</div>
	);
}
