"use client";

import { AspectRatio } from "@dukkani/ui/components/aspect-ratio";
import {
  Carousel,
  type CarouselApi,
  CarouselContent,
  CarouselItem,
} from "@dukkani/ui/components/carousel";
import { useIsRtl } from "@dukkani/ui/components/direction";
import { Icons } from "@dukkani/ui/components/icons";
import { cn } from "@dukkani/ui/lib/utils";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";

interface ProductFormPreviewCarouselProps {
  images: string[];
  productName: string;
  targetSlideIndex?: number | null;
}

/**
 * Dashboard-local product image carousel for the live product form preview.
 * Mirrors the storefront's `ProductImageCarousel`
 * (`apps/storefront/src/components/app/product-image-carousel.tsx`) behavior —
 * embla-based swipe, dot indicators, and a `targetSlideIndex` effect that jumps
 * to a variant's linked photo — without importing across app boundaries. Both
 * wrap the same shared `@dukkani/ui` carousel primitive.
 */
export function ProductFormPreviewCarousel({
  images,
  productName,
  targetSlideIndex = null,
}: ProductFormPreviewCarouselProps) {
  const isRtl = useIsRtl();
  const [current, setCurrent] = useState(0);
  const [api, setApi] = useState<CarouselApi>();
  const t = useTranslations("products.create.preview");

  useEffect(() => {
    if (!api) return;

    setCurrent(api.selectedScrollSnap());

    const handler = () => {
      setCurrent(api.selectedScrollSnap());
    };

    api.on("select", handler);

    return () => {
      api.off("select", handler);
    };
  }, [api]);

  useEffect(() => {
    if (!api || targetSlideIndex == null || images.length === 0) {
      return;
    }
    if (targetSlideIndex < 0 || targetSlideIndex >= images.length) {
      return;
    }
    api.scrollTo(targetSlideIndex);
  }, [api, images.length, targetSlideIndex]);

  if (images.length === 0) {
    return (
      <div className="overflow-hidden rounded-lg">
        <AspectRatio ratio={3 / 4}>
          <div className="flex h-full w-full items-center justify-center bg-muted">
            <Icons.image className="size-8 text-muted-foreground" />
          </div>
        </AspectRatio>
      </div>
    );
  }

  return (
    <div className="relative w-full overflow-hidden rounded-lg">
      <Carousel
        setApi={setApi}
        className="w-full"
        opts={{ direction: isRtl ? "rtl" : "ltr" }}
      >
        <CarouselContent>
          {images.map((image, index) => (
            <CarouselItem key={index}>
              <AspectRatio ratio={3 / 4}>
                <Image
                  src={image}
                  alt={`${productName} - ${index + 1}`}
                  fill
                  className="object-cover"
                  unoptimized={image.startsWith("blob:")}
                  priority={index === 0}
                />
              </AspectRatio>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
      {images.length > 1 && (
        <div className="absolute bottom-2 left-1/2 flex -translate-x-1/2 justify-center gap-1 rounded-full bg-background/10 px-2 py-1.5 backdrop-blur-sm">
          {images.map((_, index) => (
            <button
              key={index}
              type="button"
              onClick={() => api?.scrollTo(index)}
              className={cn(
                "h-2 rounded-full transition-all",
                current === index ? "w-8 bg-card" : "w-2 bg-card/40",
              )}
              aria-label={t("goToSlide", { index: index + 1 })}
            />
          ))}
        </div>
      )}
    </div>
  );
}
