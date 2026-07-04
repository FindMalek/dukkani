"use client";

import { Textarea } from "@dukkani/ui/components/textarea";
import { useTranslations } from "next-intl";
import { useNotesAutosave } from "@/shared/lib/customer/use-notes-autosave.hook";

interface CustomerDetailNotesCardProps {
  customerId: string;
  notes: string | null;
}

export function CustomerDetailNotesCard({
  customerId,
  notes,
}: CustomerDetailNotesCardProps) {
  const t = useTranslations("customers.detail.notes");
  const { value, onChange, isSaving } = useNotesAutosave(customerId, notes);

  return (
    <div className="rounded-xl border bg-card p-3 shadow-sm">
      <div className="mb-2 flex items-center justify-between">
        <p className="font-medium text-muted-foreground text-xs">
          {t("title")}
        </p>
        {isSaving && (
          <p className="text-muted-foreground text-xs">{t("saving")}</p>
        )}
      </div>
      <Textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={t("placeholder")}
        className="min-h-20 resize-none"
      />
    </div>
  );
}
