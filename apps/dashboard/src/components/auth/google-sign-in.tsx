"use client";

import { Button } from "@dukkani/ui/components/button";
import { Icons } from "@dukkani/ui/components/icons";
import { authClient } from "@/lib/auth-client";

interface GoogleSignInProps {
	showLastUsed?: boolean;
}

export function GoogleSignIn({ showLastUsed = false }: GoogleSignInProps) {
	const handleSignIn = () => {
		authClient.signIn.social({
			provider: "google",
			callbackURL: "/dashboard",
		});
	};

	return (
		<Button
			type="button"
			variant="outline"
			className="h-11 w-full justify-start gap-3"
			onClick={handleSignIn}
		>
			<Icons.google className="size-4" />
			<span className="flex-1 text-left">Continue with Google</span>
			{showLastUsed && (
				<span className="text-muted-foreground text-xs">Last used</span>
			)}
		</Button>
	);
}
