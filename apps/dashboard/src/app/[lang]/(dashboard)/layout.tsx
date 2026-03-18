import { UserOnboardingStep } from "@dukkani/common/schemas/enums";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { AuthGuard } from "@/components/auth/auth-guard";
import { BottomNavigation } from "@/components/layout/bottom-navigation";
import { StoreInitializer } from "@/components/layout/store-initializer";
import { getServerSession } from "@/lib/get-server-session";
import { client } from "@/lib/orpc";

const DashboardLayoutContent = ({
	children,
}: {
	children: React.ReactNode;
}) => (
	<StoreInitializer>
		<div className="grid h-svh grid-rows-[auto_1fr]">
			<main className="overflow-auto">{children}</main>
			<BottomNavigation />
		</div>
	</StoreInitializer>
);

export default async function DashboardLayout({
	children,
	params,
}: Readonly<{
	children: React.ReactNode;
	params: Promise<{ lang: string }>;
}>) {
	const session = await getServerSession();
	const { lang } = await params;

	if (!session?.user) {
		return (
			<AuthGuard redirectTo="/login" requireAuth>
				<DashboardLayoutContent>{children}</DashboardLayoutContent>
			</AuthGuard>
		);
	}

	try {
		const headersList = await headers();
		const user = await client.account.getCurrentUser({
			headers: headersList,
		});
		if (user.onboardingStep === UserOnboardingStep.STORE_SETUP) {
			redirect(`/${lang}/onboarding`);
		}
	} catch {
		// Allow dashboard if user fetch fails
	}

	return <DashboardLayoutContent>{children}</DashboardLayoutContent>;
}
