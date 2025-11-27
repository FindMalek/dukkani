import { redirect } from "next/navigation";
import { AuthGuard } from "@/components/auth/auth-guard";
import { getServerSession } from "@/lib/get-server-session";

export default async function AuthLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	const session = await getServerSession();

	if (session?.user) {
		redirect("/dashboard");
	}

	return (
		<AuthGuard redirectTo="/dashboard" requireAuth={false}>
			{children}
		</AuthGuard>
	);
}
