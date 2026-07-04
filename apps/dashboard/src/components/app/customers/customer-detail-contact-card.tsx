import { Button } from "@dukkani/ui/components/button";
import { Card } from "@dukkani/ui/components/card";
import { Icons } from "@dukkani/ui/components/icons";
import Link from "next/link";

interface CustomerDetailContactCardProps {
  phone: string;
  contactHref: string;
  isWhatsApp: boolean;
  isWaLink: boolean;
  callLabel: string;
  whatsappLabel: string;
}

export function CustomerDetailContactCard({
  phone,
  contactHref,
  isWhatsApp,
  isWaLink,
  callLabel,
  whatsappLabel,
}: CustomerDetailContactCardProps) {
  return (
    <Card className="gap-0 py-0 shadow-sm">
      <div className="flex items-center justify-between gap-2 p-3">
        <p className="text-muted-foreground text-sm">{phone}</p>
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
    </Card>
  );
}
