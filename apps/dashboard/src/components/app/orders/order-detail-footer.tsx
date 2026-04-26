import { Button } from "@dukkani/ui/components/button";
import { Icons } from "@dukkani/ui/components/icons";
import { SlideToConfirm } from "@dukkani/ui/components/slide-to-confirm";
import Link from "next/link";

export function OrderDetailFooter({
  canAdvance,
  slideToConfirmText,
  phone,
  contactHref,
  isWaLink,
  isWhatsApp,
  contactCompactAriaLabel,
  contactOnlyLabel,
  isMutating,
  onConfirmAdvance,
}: {
  canAdvance: boolean;
  slideToConfirmText: string | null;
  phone: string | undefined;
  contactHref: string | null;
  isWaLink: boolean;
  isWhatsApp: boolean;
  contactCompactAriaLabel: string;
  contactOnlyLabel: string;
  isMutating: boolean;
  onConfirmAdvance: () => void;
}) {
  return (
    <div className="fixed inset-x-0 bottom-0 z-10 border-t bg-background/95 p-3 backdrop-blur supports-[backdrop-filter]:bg-background/80">
      <div className="mx-auto max-w-2xl">
        {canAdvance && slideToConfirmText ? (
          <div className="flex items-center gap-2">
            {phone && contactHref ? (
              <Button
                className="shrink-0"
                type="button"
                size="icon"
                variant="outline"
                asChild
              >
                <Link
                  href={contactHref}
                  target={isWaLink ? "_blank" : undefined}
                  rel={isWaLink ? "noopener noreferrer" : undefined}
                  prefetch={false}
                  aria-label={contactCompactAriaLabel}
                >
                  {isWhatsApp ? (
                    <Icons.whatsapp className="size-4 text-primary" />
                  ) : (
                    <Icons.phone className="size-4 text-primary" />
                  )}
                </Link>
              </Button>
            ) : null}
            <SlideToConfirm
              className={phone ? "min-w-0 flex-1" : "w-full"}
              disabled={isMutating}
              icon={<Icons.chevronsRight className="size-3.5" />}
              onConfirm={onConfirmAdvance}
            >
              <span className="inline-flex items-center justify-center gap-1.5">
                {slideToConfirmText}
              </span>
            </SlideToConfirm>
          </div>
        ) : phone && contactHref ? (
          <Button className="w-full" type="button" variant="outline" asChild>
            <Link
              className="inline-flex w-full items-center justify-center gap-2"
              href={contactHref}
              target={isWaLink ? "_blank" : undefined}
              rel={isWaLink ? "noopener noreferrer" : undefined}
              prefetch={false}
            >
              {isWhatsApp ? (
                <Icons.whatsapp className="size-4 shrink-0 text-primary" />
              ) : (
                <Icons.phone className="size-4 shrink-0 text-primary" />
              )}
              <span className="font-medium text-sm">{contactOnlyLabel}</span>
            </Link>
          </Button>
        ) : null}
      </div>
    </div>
  );
}
