import { auth } from "@dukkani/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { BottomNavigation } from "@/components/layout/bottom-navigation";

export default async function DashboardLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	const session = await auth.api.getSession({
		headers: await headers(),
	});

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
