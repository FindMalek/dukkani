import { authClient } from "@/lib/auth-client";

// Auth-related hooks wrapper
export function useAuth() {
	const { data: session, isPending } = authClient.useSession();

	return {
		session,
		isPending,
		isAuthenticated: !!session?.user,
		user: session?.user,
	};
}
