"use client";

import { Button } from "@dukkani/ui/components/button";
import { Icons } from "@dukkani/ui/components/icons";
import { authClient } from "@/lib/auth-client";
import { RoutePaths } from "@/lib/routes";

interface FacebookSignInProps {
	showLastUsed?: boolean;
}

export function FacebookSignIn({ showLastUsed = false }: FacebookSignInProps) {
	const handleSignIn = () => {
		authClient.signIn.social({
			provider: "facebook",
			callbackURL: RoutePaths.DASHBOARD.url,
		});
	};

	return (
		<Button
			type="button"
			variant="outline"
			className="h-11 w-full justify-start gap-3"
			onClick={handleSignIn}
		>
			<Icons.facebook className="size-4" />
			<span className="flex-1 text-left">Continue with Facebook</span>
			{showLastUsed && (
				<span className="text-muted-foreground text-xs">Last used</span>
			)}
		</Button>
	);
}
