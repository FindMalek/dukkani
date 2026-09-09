"use client";

import { Button } from "@dukkani/ui/components/button";
import { Icons } from "@dukkani/ui/components/icons";
import { useTranslations } from "next-intl";
import { RoutePaths, useRouter } from "@/shared/config/routes";

export default function CheckoutSuccessPage() {
  const router = useRouter();
  const t = useTranslations("storefront.store.checkout.success");

  return (
    <div className="container mx-auto max-w-3xl px-4 py-16 md:py-24">
      <div className="flex flex-col items-center justify-center rounded-2xl border bg-card px-6 py-12 text-center md:px-12 md:py-16">
        {/* Success Icon */}
        <div className="mb-6 flex size-16 items-center justify-center rounded-full bg-primary/10">
          <Icons.check className="size-8 text-primary" />
        </div>

        {/* Title */}
        <h1 className="mb-4 font-bold text-3xl">{t("title")}</h1>

        {/* Message */}
        <p className="mb-8 text-lg text-muted-foreground">{t("message")}</p>

        {/* Continue Shopping Button */}
        <Button
          onClick={() => router.push(RoutePaths.HOME.url)}
          size="lg"
          className="bg-primary text-primary-foreground"
        >
          {t("continueShopping")}
        </Button>
      </div>
    </div>
  );
}
