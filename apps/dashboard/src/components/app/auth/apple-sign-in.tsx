"use client";

import { Button } from "@dukkani/ui/components/button";
import { Icons } from "@dukkani/ui/components/icons";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@dukkani/ui/components/tooltip";
import { authClient } from "@/shared/api/auth-client";
import { RoutePaths } from "@/shared/config/routes";

interface AppleSignInProps {
  showLastUsed?: boolean;
  disabled?: boolean;
}

export function AppleSignIn({
  showLastUsed = false,
  disabled = false,
}: AppleSignInProps) {
  const handleSignIn = () => {
    authClient.signIn.social({
      provider: "apple",
      callbackURL: RoutePaths.DASHBOARD.url,
    });
  };

  const button = (
    <Button
      type="button"
      variant="outline"
      className="h-11 w-full justify-start gap-3"
      onClick={handleSignIn}
      disabled={disabled}
    >
      <Icons.apple className="size-4" />
      <span className="flex-1 text-left">Continue with Apple</span>
      {showLastUsed && (
        <span className="text-muted-foreground text-xs">Last used</span>
      )}
    </Button>
  );

  if (!disabled) {
    return button;
  }

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <span className="block w-full">{button}</span>
      </TooltipTrigger>
      <TooltipContent>Upcoming</TooltipContent>
    </Tooltip>
  );
}
