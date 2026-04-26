import { Button } from "@dukkani/ui/components/button";
import { Card } from "@dukkani/ui/components/card";
import { Icons } from "@dukkani/ui/components/icons";
import Link from "next/link";

export function OrderDetailCustomerCard({
  name,
  phone,
  contactHref,
  isWaLink,
  isWhatsApp,
  callAriaLabel,
  openWhatsAppAriaLabel,
  sectionLabel,
}: {
  name: string;
  phone: string | undefined;
  contactHref: string | null;
  isWaLink: boolean;
  isWhatsApp: boolean;
  callAriaLabel: string;
  openWhatsAppAriaLabel: string;
  sectionLabel: string;
}) {
  return (
    <Card className="gap-0 py-0 shadow-sm">
      <div className="p-3">
        <p className="mb-1.5 font-medium text-muted-foreground text-xs">
          {sectionLabel}
        </p>
        <div className="flex items-center justify-between gap-2">
          <div className="min-w-0">
            <p className="font-semibold text-sm">{name}</p>
            {phone && <p className="text-muted-foreground text-sm">{phone}</p>}
          </div>
          {contactHref && (
            <Button
              size="icon-sm"
              variant="ghost"
              className="shrink-0 rounded-full bg-primary/10 hover:bg-primary/15"
              asChild
            >
              <Link
                href={contactHref}
                target={isWaLink ? "_blank" : undefined}
                rel={isWaLink ? "noopener noreferrer" : undefined}
                prefetch={false}
                aria-label={isWhatsApp ? openWhatsAppAriaLabel : callAriaLabel}
              >
                {isWhatsApp ? (
                  <Icons.whatsapp className="size-4 text-primary" />
                ) : (
                  <Icons.phone className="size-4 text-primary" />
                )}
              </Link>
            </Button>
          )}
        </div>
      </div>
    </Card>
  );
}
