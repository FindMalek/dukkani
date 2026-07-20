"use client";

import { Button } from "@dukkani/ui/components/button";
import { Icons } from "@dukkani/ui/components/icons";
import { Label } from "@dukkani/ui/components/label";
import { cn } from "@dukkani/ui/lib/utils";
import { useCopyToClipboard } from "@/shared/lib/clipboard";

interface StoreLinkProps {
  url: string;
  label?: string;
  hint?: string;
  className?: string;
}

export function StoreLink({
  url,
  label = "Your store link",
  hint = "Tap to copy and share",
  className,
}: StoreLinkProps) {
  const { copy, copied } = useCopyToClipboard();

  const handleCopy = () => {
    copy(url, "Link copied to clipboard!");
  };

  // Defensive: callers are expected to pass an absolute URL (getStoreUrl()
  // always includes a protocol today), but a bare domain here would silently
  // become a relative path when used as an <a href>.
  const href = /^https?:\/\//.test(url) ? url : `https://${url}`;

  return (
    <div className={cn("space-y-2", className)}>
      <Label htmlFor="store-link" className="text-muted-foreground text-sm">
        {label}
      </Label>
      <div className="flex items-center gap-2 rounded-lg border border-border/50 p-4">
        <span className="flex-1 truncate font-semibold text-base text-foreground">
          {url}
        </span>
        <Button
          type="button"
          variant="ghost"
          size="icon"
          className="size-8 shrink-0"
          aria-label="Copy store link"
          onClick={handleCopy}
        >
          {copied ? (
            <Icons.check className="size-4 text-success" />
          ) : (
            <Icons.copy className="size-4 text-muted-foreground" />
          )}
        </Button>
        <Button
          type="button"
          variant="ghost"
          size="icon"
          className="size-8 shrink-0"
          aria-label="Open store in new tab"
          asChild
        >
          <a href={href} target="_blank" rel="noopener noreferrer">
            <Icons.externalLink className="size-4 text-muted-foreground" />
          </a>
        </Button>
      </div>
      <p className="text-muted-foreground text-xs">{hint}</p>
    </div>
  );
}
