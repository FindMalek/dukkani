"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@dukkani/ui/components/alert-dialog";
import { Button } from "@dukkani/ui/components/button";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { authClient } from "@/shared/api/auth-client";
import { RoutePaths } from "@/shared/config/routes";

export function LogoutButton() {
  const router = useRouter();
  const [isPending, setIsPending] = useState(false);

  function handleSignOut(e: React.MouseEvent) {
    e.preventDefault();
    setIsPending(true);
    authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push(RoutePaths.AUTH.LOGIN.url);
        },
        onError: () => {
          setIsPending(false);
        },
      },
    });
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="destructive" className="w-full sm:w-auto">
          Log out
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Log out of your account?</AlertDialogTitle>
          <AlertDialogDescription>
            You will be redirected to the login page. Any unsaved changes in
            other tabs may be lost.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={isPending}>Cancel</AlertDialogCancel>
          <AlertDialogAction
            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            isLoading={isPending}
            onClick={handleSignOut}
          >
            Log out
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
