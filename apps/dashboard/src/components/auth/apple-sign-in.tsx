"use client";

import { Button } from "@dukkani/ui/components/button";
import { Icons } from "@dukkani/ui/components/icons";
import { authClient } from "@/lib/auth-client";

interface AppleSignInProps {
	showLastUsed?: boolean;
}

export function AppleSignIn({ showLastUsed = false }: AppleSignInProps) {
	const handleSignIn = () => {
		authClient.signIn.social({
			provider: "apple",
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
			<Icons.apple className="size-4" />
			<span className="flex-1 text-left">Continue with Apple</span>
			{showLastUsed && (
				<span className="text-muted-foreground text-xs">Last used</span>
			)}
		</Button>
	);
}
