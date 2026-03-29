"use client";

import { Button } from "@dukkani/ui/components/button";
import {
  Drawer,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@dukkani/ui/components/drawer";
import { Icons } from "@dukkani/ui/components/icons";
import { Spinner } from "@dukkani/ui/components/spinner";
import { useTranslations } from "next-intl";
import { useEnrichedCart } from "@/hooks/use-enriched-cart";
import { RoutePaths, useRouter } from "@/lib/routes";
import { CartItem as CartItemComponent } from "./cart-item";
import { formatCurrency } from "@dukkani/common/utils";
import { useLocale } from "next-intl";

interface CartDrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function CartDrawer({ open, onOpenChange }: CartDrawerProps) {
  const router = useRouter();
  const locale = useLocale();
  const t = useTranslations("storefront.store.cart");

  const { enrichedData, subtotal, isLoading } = useEnrichedCart({
    enabled: open,
  });

  const hasItems = enrichedData && enrichedData.length > 0;

  const handleCheckout = () => {
    onOpenChange(false);
    router.push(RoutePaths.CHECKOUT.INDEX.url);
  };

  return (
    <Drawer open={open} onOpenChange={onOpenChange}>
      <DrawerContent className="max-h-[85vh]">
        <DrawerHeader className="sr-only">
          <DrawerTitle>{t("title")}</DrawerTitle>
        </DrawerHeader>
        <div className="flex-1 overflow-y-auto px-4">
          {isLoading && !enrichedData ? (
            <div className="flex items-center justify-center py-8">
              <Spinner className="size-6 animate-spin text-muted-foreground" />
            </div>
          ) : !hasItems ? (
            <div className="flex flex-col items-center justify-center gap-4 py-12">
              <Icons.shoppingCart className="size-12 text-muted-foreground" />
              <p className="text-center text-muted-foreground">{t("empty")}</p>
            </div>
          ) : (
            <div className="py-2">
              {enrichedData.map((item) => (
                <CartItemComponent
                  key={`${item.productId}-${item.variantId ?? "no-variant"}`}
                  item={item}
                  productName={item.productName}
                  productImage={item.productImage}
                  productDescription={item.productDescription}
                  price={item.price}
                  stock={item.stock}
                />
              ))}
            </div>
          )}
        </div>

        {hasItems && (
          <DrawerFooter className="border-border border-t">
            <Button
              className="w-full bg-primary text-primary-foreground"
              size="lg"
              onClick={handleCheckout}
              disabled={isLoading}
              isLoading={isLoading}
            >
              <div className="flex w-full items-center justify-between">
                <div className="flex items-center gap-2">
                  <Icons.shoppingCart className="size-4" />
                  <span>{t("checkout")}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span
                    className="font-semibold text-sm tabular-nums"
                    dir="ltr"
                  >
                    {formatCurrency(subtotal, "TND", locale)}
                  </span>
                  <Icons.arrowRight className="size-4 rtl:rotate-180" />
                </div>
              </div>
            </Button>
          </DrawerFooter>
        )}
      </DrawerContent>
    </Drawer>
  );
}
