import type { CustomerIncludeOutput } from "@dukkani/common/schemas/customer/output";
import { Button } from "@dukkani/ui/components/button";
import { Card } from "@dukkani/ui/components/card";
import { FlagComponent, getPhoneCountry } from "@dukkani/ui/components/country";
import { Icons } from "@dukkani/ui/components/icons";
import { cn } from "@dukkani/ui/lib/utils";
import Link from "next/link";
import { useTranslations } from "next-intl";

interface CustomerDetailContactCardProps {
  phone: string;
  contactHref: string;
  isWhatsApp: boolean;
  isWaLink: boolean;
  callLabel: string;
  whatsappLabel: string;
  currentName: string;
  nameVariants: CustomerIncludeOutput["nameVariants"];
  className?: string;
}

export function CustomerDetailContactCard({
  phone,
  contactHref,
  isWhatsApp,
  isWaLink,
  callLabel,
  whatsappLabel,
  currentName,
  nameVariants,
  className,
}: CustomerDetailContactCardProps) {
  const t = useTranslations("customers.detail");
  const alsoKnownAs = nameVariants.filter((v) => v.name !== currentName);

  return (
    <Card className={cn("gap-0 py-0 shadow-sm", className)}>
      <div className="flex items-center justify-between gap-2 p-3">
        <p className="flex items-center gap-1.5 text-muted-foreground text-sm">
          <FlagComponent country={getPhoneCountry(phone)} countryName={phone} />
          {phone}
        </p>
        <Button size="sm" variant={isWhatsApp ? "default" : "outline"} asChild>
          <Link
            href={contactHref}
            target={isWaLink ? "_blank" : undefined}
            rel={isWaLink ? "noopener noreferrer" : undefined}
            prefetch={false}
          >
            {isWhatsApp ? (
              <Icons.whatsapp className="size-4" />
            ) : (
              <Icons.phone className="size-4" />
            )}
            {isWhatsApp ? whatsappLabel : callLabel}
          </Link>
        </Button>
      </div>
      {alsoKnownAs.length > 0 && (
        <div className="border-t px-3 py-2">
          <p className="text-muted-foreground text-xs">
            {t("alsoKnownAs", {
              names: alsoKnownAs.map((v) => v.name).join(", "),
            })}
          </p>
        </div>
      )}
    </Card>
  );
}
