import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { dashboardEnv } from "@/env";
import { client } from "@/lib/orpc";
import { RoutePaths } from "@/lib/routes";

interface OnboardingPageProps {
	searchParams: Promise<{
		email?: string;
	}>;
}

export const metadata: Metadata = {
	title: "Create Your Account | Dukkani",
	description:
		"Join Dukkani and start managing your business with our powerful dashboard. Create your account to get started.",
	keywords: ["signup", "register", "account", "business", "dashboard"],
	openGraph: {
		title: "Create Your Account | Dukkani",
		description:
			"Join Dukkani and start managing your business with our powerful dashboard.",
		url: `${dashboardEnv.NEXT_PUBLIC_DASHBOARD_URL}/onboarding`,
		siteName: "Dukkani",
		type: "website",
		images: [
			{
				url: `${dashboardEnv.NEXT_PUBLIC_DASHBOARD_URL}/og-image.png`,
				width: 1200,
				height: 630,
				alt: "Dukkani - Business Management Dashboard",
			},
		],
	},
	twitter: {
		card: "summary_large_image",
		title: "Create Your Account | Dukkani",
		description:
			"Join Dukkani and start managing your business with our powerful dashboard.",
		images: [`${dashboardEnv.NEXT_PUBLIC_DASHBOARD_URL}/og-image.png`],
	},
	robots: {
		index: false,
		follow: false,
	},
};

export default async function OnboardingPage({
	searchParams,
}: OnboardingPageProps) {
	const params = await searchParams;
	const email = params.email;

	if (!email) {
		redirect(RoutePaths.AUTH.LOGIN.url);
	}

	try {
		const emailExists = await client.account.checkEmailExists({ email });

		if (emailExists) {
			const loginUrl = `${RoutePaths.AUTH.LOGIN.url}?error=email_taken`;
			redirect(loginUrl);
		}
	} catch {
		redirect(RoutePaths.AUTH.LOGIN.url);
	}

	return (
		<div className="flex min-h-screen items-center justify-center bg-background">
			<div className="w-full max-w-md space-y-4 p-8">
				<div className="space-y-2 text-center">
					<h1 className="font-semibold text-2xl">Welcome to Dukkani!</h1>
					<p className="text-muted-foreground">
						Create your account to get started
					</p>
				</div>
				<p>Creating account for {email}</p>
			</div>
		</div>
	);
}
