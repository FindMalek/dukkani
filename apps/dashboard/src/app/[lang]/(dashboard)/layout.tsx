import { AuthGuard } from "@/components/auth/auth-guard";
import { BottomNavigation } from "@/components/layout/bottom-navigation";
import { StoreInitializer } from "@/components/layout/store-initializer";
import { getServerSession } from "@/lib/get-server-session";

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
}: Readonly<{
	children: React.ReactNode;
}>) {
	const session = await getServerSession();

	if (!session?.user) {
		return (
			<AuthGuard redirectTo="/login" requireAuth>
				<DashboardLayoutContent>{children}</DashboardLayoutContent>
			</AuthGuard>
		);
	}

	return <DashboardLayoutContent>{children}</DashboardLayoutContent>;
}
