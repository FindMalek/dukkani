import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "Onboarding | Dukkani",
};

export default function OnboardingPage() {
	return (
		<div className="flex min-h-screen items-center justify-center bg-background">
			<div className="w-full max-w-md space-y-4 p-8 text-center">
				<h1 className="font-semibold text-2xl">Welcome to Dukkani!</h1>
				<p className="text-muted-foreground">Onboarding flow coming soon...</p>
			</div>
		</div>
	);
}
