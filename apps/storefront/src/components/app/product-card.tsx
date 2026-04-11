"use client";

import type { store } from "@dukkani/common/schemas";
import type { ProductPublicOutput } from "@dukkani/common/schemas/product/output";
import { AspectRatio } from "@dukkani/ui/components/aspect-ratio";
import { Button } from "@dukkani/ui/components/button";
import { Icons } from "@dukkani/ui/components/icons";
import { Skeleton } from "@dukkani/ui/components/skeleton";
import { useFormatPriceCurrentStore } from "@dukkani/ui/hooks/use-format-price";
import Image from "next/image";
import Link from "next/link";
import { RoutePaths } from "@/shared/config/routes";

interface ProductCardProps {
  product: ProductPublicOutput;
  storeCurrency: store.SupportedCurrencyInfer;
  onAddToCart?: (product: ProductPublicOutput) => void;
}

export function ProductCard({
  product,
  onAddToCart,
  storeCurrency,
}: ProductCardProps) {
  const imageUrl = product.imagesUrls?.[0];

  const formatPrice = useFormatPriceCurrentStore(storeCurrency);

  return (
    <div className="group">
      <Link href={RoutePaths.PRODUCTS.DETAIL.url(product.id)} className="block">
        <div className="relative overflow-hidden rounded-lg">
          <AspectRatio ratio={3 / 4}>
            {imageUrl ? (
              <Image
                src={imageUrl}
                alt={product.name}
                fill
                className="object-cover transition-transform group-hover:scale-105"
              />
            ) : (
              <Skeleton className="h-full w-full" />
            )}
          </AspectRatio>
          <Button
            variant="secondary"
            size="icon"
            className="absolute end-2 bottom-2 size-10 rounded-full border-border bg-card hover:bg-card/90"
            onClick={(e) => {
              e.preventDefault();
              onAddToCart?.(product);
            }}
          >
            <Icons.plus className="size-5 text-primary" />
          </Button>
        </div>
        <div className="mt-2">
          <h3 className="mb-1 font-bold text-foreground">{product.name}</h3>
          <p className="text-muted-foreground text-sm tabular-nums" dir="ltr">
            {formatPrice(product.price)}
          </p>
        </div>
      </Link>
    </div>
  );
}
