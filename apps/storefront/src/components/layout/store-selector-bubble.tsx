"use client";

import { Button } from "@dukkani/ui/components/button";
import { Icons } from "@dukkani/ui/components/icons";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@dukkani/ui/components/popover";
import { useT } from "next-i18next/client";
import { StoreSelectorForm } from "./store-selector";

export function StoreSelectorBubble() {
  const { t } = useT("pages", { keyPrefix: "storeSelector" });

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="secondary"
          size="icon"
          className="fixed inset-e-4 bottom-4 z-50 size-12 rounded-full shadow-lg"
          aria-label={t("heading")}
        >
          <Icons.storefront className="size-5" />
        </Button>
      </PopoverTrigger>
      <PopoverContent align="end" side="top" className="w-80">
        <StoreSelectorForm compact />
      </PopoverContent>
    </Popover>
  );
}
