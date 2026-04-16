"use client";

import { Button } from "@dukkani/ui/components/button";
import { Card } from "@dukkani/ui/components/card";
import { Icons } from "@dukkani/ui/components/icons";
import { Spinner } from "@dukkani/ui/components/spinner";
import { useMutation, useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { useT } from "next-i18next/client";
import { useEffect } from "react";
import { appMutations } from "@/shared/api/mutations";
import { appQueries } from "@/shared/api/queries";
import { RoutePaths } from "@/shared/config/routes";
import { useCopyToClipboard } from "@/shared/lib/clipboard";

export function OnboardingCompletion({ storeId }: { storeId: string }) {
  const { copy } = useCopyToClipboard();
  const { t } = useT("pages", { keyPrefix: "onboarding.complete" });

  const { mutate: completeOnboarding, ...completionMutation } = useMutation(
    appMutations.onboarding.complete(),
  );

  useEffect(() => {
    completeOnboarding({ storeId });
  }, [storeId, completeOnboarding]);

  const { data: telegramStatus } = useQuery(appQueries.telegram.status());

  const { data: botLinkData } = useQuery({
    ...appQueries.telegram.botLink(),
    enabled: !!completionMutation.data && !telegramStatus?.linked,
  });

  if (completionMutation.isPending) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Spinner className="h-8 w-8" />
      </div>
    );
  }

  return (
    <>
      <div className="space-y-2 text-center">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
          <Icons.check className="h-6 w-6 text-primary" />
        </div>
        <h1 className="font-semibold text-2xl tracking-tight">{t("title")}</h1>
        <p className="text-muted-foreground">{t("subtitle")}</p>
      </div>

      <Card className="space-y-4 border-2 border-dashed bg-muted/30 p-6">
        <p className="text-center font-medium text-sm">
          {t("storeLink.label")}
        </p>
        <div className="flex items-center gap-2 rounded-md border bg-background p-2 pl-4">
          <span className="flex-1 truncate font-mono text-muted-foreground text-sm">
            {completionMutation.data?.storeUrl}
          </span>
          <Button
            size="icon"
            variant="ghost"
            onClick={() =>
              copy(
                completionMutation.data?.storeUrl || "",
                t("storeLink.copied"),
              )
            }
          >
            <Icons.copy className="h-4 w-4" />
          </Button>
        </div>
      </Card>

      {!telegramStatus?.linked && botLinkData && (
        <div className="space-y-4 rounded-xl border bg-muted/20 p-6">
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#0088cc]/10">
              <Icons.telegram className="h-5 w-5 text-[#0088cc]" />
            </div>
            <p className="font-semibold">{t("telegram.title")}</p>
          </div>
          <p className="text-muted-foreground text-sm">
            {t("telegram.description")}
          </p>
          <div className="flex flex-col gap-2">
            <p className="font-medium text-muted-foreground text-xs uppercase">
              {t("telegram.otpLabel")}
            </p>
            <div className="flex items-center gap-2">
              <code className="flex-1 rounded-md border bg-background p-2 text-center font-bold text-lg tracking-widest">
                {botLinkData.otpCode}
              </code>
              <Button
                variant="outline"
                className="gap-2"
                onClick={() =>
                  window.open(
                    `${botLinkData.botLink}?start=link_${botLinkData.otpCode}`,
                    "_blank",
                  )
                }
              >
                {t("telegram.connectButton")}
              </Button>
            </div>
            <p className="text-[10px] text-muted-foreground">
              {t("telegram.instructions", {
                code: botLinkData.otpCode,
              })}
            </p>
          </div>
        </div>
      )}

      <div className="flex flex-col items-center gap-4">
        <Button asChild className="w-full">
          <Link href={RoutePaths.PRODUCTS.NEW.url}>
            <Icons.plus className="h-5 w-5" />
            {t("actions.addProduct")}
          </Link>
        </Button>
        <Button variant="outline" asChild className="w-full">
          <Link href={RoutePaths.DASHBOARD.url}>
            {t("actions.goToDashboard")}
          </Link>
        </Button>
      </div>
    </>
  );
}
