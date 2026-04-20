"use client";

import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@dukkani/ui/components/alert";
import { Button } from "@dukkani/ui/components/button";
import { Icons } from "@dukkani/ui/components/icons";
import { useTranslations } from "next-intl";
import type { PendingRemoval } from "@/shared/lib/variant/variants-field.hook";

export function PendingRemovalBanner({
  pending,
  onConfirm,
  onUndo,
}: {
  pending: PendingRemoval;
  onConfirm: () => void;
  onUndo: () => void;
}) {
  const t = useTranslations("products.create");

  return (
    <Alert className="border-border bg-muted/50 text-foreground">
      <Icons.alertTriangle className="text-muted-foreground" />
      <AlertTitle>
        {t("form.variants.pendingRemoval.title", {
          count: pending.affectedCount,
        })}
      </AlertTitle>
      <AlertDescription className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <span className="text-muted-foreground">
          {t("form.variants.pendingRemoval.description")}
        </span>
        <div className="flex shrink-0 gap-2">
          <Button variant="ghost" size="sm" type="button" onClick={onUndo}>
            {t("form.variants.pendingRemoval.undo")}
          </Button>
          <Button size="sm" type="button" onClick={onConfirm}>
            {t("form.variants.pendingRemoval.confirm")}
          </Button>
        </div>
      </AlertDescription>
    </Alert>
  );
}
