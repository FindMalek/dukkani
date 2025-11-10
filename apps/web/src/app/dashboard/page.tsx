import { redirect } from "next/navigation";
import Dashboard from "./dashboard";
import { headers } from "next/headers";
import { auth } from "@my-better-t-app/auth";
import { authClient } from "@/lib/auth-client";

export default async function DashboardPage() {
	const session = await auth.api.getSession({
		headers: await headers(),
	});

	if (!session?.user) {
		redirect("/login");
	}

	const { data: customerState } = await authClient.customer.state({
		fetchOptions: {
			headers: await headers(),
		},
	});

	return (
		<div>
			<h1>Dashboard</h1>
			<p>Welcome {session.user.name}</p>
			<Dashboard session={session} customerState={customerState} />
		</div>
	);
}
