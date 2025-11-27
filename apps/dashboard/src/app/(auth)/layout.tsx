import { redirect } from "next/navigation";
import { getServerSession } from "@/lib/get-server-session";
import { AuthRedirectGuard } from "@/components/auth/auth-redirect-guard";

export default async function AuthLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	const session = await getServerSession();

	// If we have a session server-side, redirect immediately
	if (session?.user) {
		redirect("/dashboard");
	}

	// If server-side check failed (Vercel cross-origin), use client-side check
	return <AuthRedirectGuard>{children}</AuthRedirectGuard>;
}
