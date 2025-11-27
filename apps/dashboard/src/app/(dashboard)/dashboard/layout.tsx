import { redirect } from "next/navigation";
import { BottomNavigation } from "@/components/layout/bottom-navigation";
import { getServerSession } from "@/lib/get-server-session";

export default async function DashboardLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	const session = await getServerSession();

	if (!session?.user) {
		redirect("/login");
	}

	return (
		<div className="grid h-svh grid-rows-[auto_1fr]">
			<main className="overflow-auto">{children}</main>
			<BottomNavigation />
		</div>
	);
}
