"use client";

import type { StorePublicOutput } from "@dukkani/common/schemas/store/output";
import { Badge } from "@dukkani/ui/components/badge";
import { Button } from "@dukkani/ui/components/button";
import { Icons } from "@dukkani/ui/components/icons";
import { Skeleton } from "@dukkani/ui/components/skeleton";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { CartDrawer } from "@/components/app/cart-drawer";
import { isDetailPage } from "@/shared/config/routes";
import { useCartHydration, useCartStore } from "@/shared/lib/cart/store";

interface StoreHeaderProps {
  store: StorePublicOutput;
}

export function StoreHeader({ store }: StoreHeaderProps) {
  const router = useRouter();
  const pathname = usePathname();

  const isCartDrawerOpen = useCartStore((state) => state.isCartDrawerOpen);
  const setCartDrawerOpen = useCartStore((state) => state.setCartDrawerOpen);

  const isHydrated = useCartHydration();
  const isDetail = isDetailPage(pathname);
  const cartCount = useCartStore((state) => state.getTotalItems());

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 border-border/30 border-b bg-background/80 backdrop-blur-md">
        <div className="container mx-auto px-4 py-2 md:py-3">
          <div className="flex items-center justify-between gap-6">
            {isDetail ? (
              <Button
                variant="ghost"
                size="icon"
                className="size-8"
                onClick={() => router.back()}
              >
                <Icons.arrowLeft className="size-4 rtl:rotate-180" />
              </Button>
            ) : (
              <Link href="/" className="flex items-center gap-2">
                <h1 className="font-semibold text-base md:text-lg">{store.name}</h1>
              </Link>
            )}
            <nav className="ms-auto hidden items-center gap-6 md:flex">
              <Link href="/" className="font-medium text-sm text-muted-foreground transition-colors hover:text-foreground">
                Home
              </Link>
            </nav>
            <Button
              variant="ghost"
              size="icon"
              className="relative size-8 md:size-9"
              onClick={() => setCartDrawerOpen(true)}
            >
              <Icons.shoppingCart className="size-4 md:size-5" />
              {!isHydrated ? (
                <Skeleton className="absolute -end-0.5 -top-0.5 size-4 rounded-full" />
              ) : cartCount > 0 ? (
                <Badge
                  variant="default"
                  className="absolute -end-0.5 -top-0.5 size-4 p-0 text-[10px] leading-none"
                >
                  {cartCount}
                </Badge>
              ) : null}
            </Button>
          </div>
        </div>
      </header>
      <CartDrawer
        open={isCartDrawerOpen}
        onOpenChange={setCartDrawerOpen}
        storeCurrency={store.currency}
      />
    </>
  );
}
