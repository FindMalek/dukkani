import { Button } from "@dukkani/ui/components/button";
import { Icons } from "@dukkani/ui/components/icons";
import { useSidebar } from "@dukkani/ui/components/sidebar";
import { SlideToConfirm } from "@dukkani/ui/components/slide-to-confirm";
import { cn } from "@dukkani/ui/lib/utils";
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
  // `fixed` escapes the sidebar's flex layout, so without a left offset this
  // bar renders across the full viewport width and visually overlaps the
  // desktop sidebar. Match its current rendered width (icon-collapsed vs.
  // expanded) so it stays scoped to the main content column instead.
  const { state } = useSidebar();

  return (
    <div
      className={cn(
        "fixed inset-x-0 bottom-0 z-10 border-t bg-background/95 p-3 backdrop-blur transition-[left] duration-200 ease-linear supports-[backdrop-filter]:bg-background/80",
        state === "collapsed"
          ? "xl:left-(--sidebar-width-icon)"
          : "xl:left-(--sidebar-width)",
      )}
    >
      <div className="mx-auto max-w-2xl xl:max-w-3xl">
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
