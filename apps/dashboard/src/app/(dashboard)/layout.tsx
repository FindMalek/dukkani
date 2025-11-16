import { auth } from "@dukkani/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import Header from "@/components/layout/header";

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
			<Header />
			<main className="overflow-auto">{children}</main>
		</div>
	);
}
