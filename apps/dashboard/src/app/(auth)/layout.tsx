import { redirect } from "next/navigation";
import { getServerSession } from "@/lib/get-server-session";

export default async function AuthLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	const session = await getServerSession();

	// If user is already logged in, redirect to dashboard
	if (session?.user) {
		redirect("/dashboard");
	}

	return <>{children}</>;
}
