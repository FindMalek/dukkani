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
import { useTranslations } from "next-intl";
import { useState } from "react";
import { authClient } from "@/shared/api/auth-client";
import { RoutePaths } from "@/shared/config/routes";

export function LogoutButton() {
  const router = useRouter();
  const t = useTranslations("settings.logout");
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
          {t("button")}
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{t("title")}</AlertDialogTitle>
          <AlertDialogDescription>{t("description")}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={isPending}>
            {t("cancel")}
          </AlertDialogCancel>
          <AlertDialogAction asChild>
            <Button
              variant="destructive"
              isLoading={isPending}
              onClick={handleSignOut}
            >
              {t("confirm")}
            </Button>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
