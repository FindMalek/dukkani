import { auth } from "@dukkani/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export default async function AuthLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	const session = await auth.api.getSession({
		headers: await headers(),
	});

	// If user is already logged in, redirect to dashboard
	if (session?.user) {
		redirect("/dashboard");
	}

	return <>{children}</>;
}
