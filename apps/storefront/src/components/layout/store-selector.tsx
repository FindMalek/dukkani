"use client";

import { isReservedStoreSlug } from "@dukkani/common/schemas/store/constants";
import { Button } from "@dukkani/ui/components/button";
import { Input } from "@dukkani/ui/components/input";
import { ThemeProvider } from "@dukkani/ui/components/theme-provider";
import { QueryClientProvider } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useT } from "next-i18next/client";
import { useState } from "react";
import { toast } from "sonner";
import { getQueryClient, getStorefrontClient } from "@/shared/api/orpc";

interface StoreSelectorFormProps {
  compact?: boolean;
}

export function StoreSelectorForm({ compact }: StoreSelectorFormProps) {
  const { t } = useT("pages", { keyPrefix: "storeSelector" });
  const router = useRouter();
  const { i18n } = useT();
  const [slug, setSlug] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    const trimmed = slug.trim().toLowerCase();
    if (!trimmed) return;

    if (isReservedStoreSlug(trimmed)) {
      toast.error(t("errorReserved"));
      return;
    }

    setIsSubmitting(true);
    try {
      await getStorefrontClient().selectStore({ slug: trimmed });
      router.push(`/${i18n.language}`);
      router.refresh();
    } catch {
      toast.error(t("errorNotFound"));
    } finally {
      setIsSubmitting(false);
    }
  };

  const formContent = (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input
        type="text"
        placeholder={t("placeholder")}
        value={slug}
        onChange={(e) => setSlug(e.target.value)}
        className="w-full"
        autoFocus={!compact}
      />
      <Button type="submit" className="w-full" disabled={isSubmitting}>
        {t("button")}
      </Button>
    </form>
  );

  if (compact) {
    return (
      <div className="space-y-3">
        <h3 className="font-semibold text-sm">{t("heading")}</h3>
        <p className="text-muted-foreground text-xs">{t("description")}</p>
        {formContent}
      </div>
    );
  }

  return (
    <div className="container mx-auto flex min-h-screen items-center justify-center px-4">
      <div className="w-full max-w-md space-y-6 rounded-lg border bg-card p-6">
        <h1 className="font-bold text-2xl">{t("heading")}</h1>
        <p className="text-muted-foreground text-sm">{t("description")}</p>
        {formContent}
      </div>
    </div>
  );
}

export function StoreSelector() {
  const [queryClient] = useState(() => getQueryClient());

  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <QueryClientProvider client={queryClient}>
        <StoreSelectorForm />
      </QueryClientProvider>
    </ThemeProvider>
  );
}
