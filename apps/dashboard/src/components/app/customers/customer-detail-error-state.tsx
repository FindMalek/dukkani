import { Alert, AlertTitle } from "@dukkani/ui/components/alert";
import { Button } from "@dukkani/ui/components/button";
import { Icons } from "@dukkani/ui/components/icons";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { RoutePaths } from "@/shared/config/routes";

export function CustomerDetailErrorState({
  errorMessage,
}: {
  errorMessage: string;
}) {
  const t = useTranslations("customers.detail");

  return (
    <div className="container mx-auto max-w-2xl p-4 xl:max-w-6xl">
      <div className="mb-4 flex items-center gap-2">
        <Button variant="ghost" size="icon" asChild className="shrink-0">
          <Link
            href={RoutePaths.CUSTOMERS.INDEX.url}
            aria-label={t("backToCustomers")}
          >
            <Icons.arrowLeft className="size-4" />
          </Link>
        </Button>
        <h1 className="truncate font-semibold text-base">{t("title")}</h1>
      </div>
      <Alert variant="destructive">
        <Icons.alertTriangle />
        <AlertTitle>{errorMessage}</AlertTitle>
      </Alert>
    </div>
  );
}
