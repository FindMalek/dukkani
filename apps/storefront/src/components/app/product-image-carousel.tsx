"use client";

import { AspectRatio } from "@dukkani/ui/components/aspect-ratio";
import {
	Carousel,
	type CarouselApi,
	CarouselContent,
	CarouselItem,
} from "@dukkani/ui/components/carousel";
import { Skeleton } from "@dukkani/ui/components/skeleton";
import { cn } from "@dukkani/ui/lib/utils";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";

interface ProductImageCarouselProps {
	images: string[];
	productName: string;
}

export function ProductImageCarousel({
	images,
	productName,
}: ProductImageCarouselProps) {
	const t = useTranslations("storefront.store.product.imageCarousel");
	const [api, setApi] = useState<CarouselApi>();
	const [current, setCurrent] = useState(0);

	useEffect(() => {
		if (!api) return;

		setCurrent(api.selectedScrollSnap());

		api.on("select", () => {
			setCurrent(api.selectedScrollSnap());
		});
	}, [api]);

	if (images.length === 0) {
		return (
			<div className="relative w-full">
				<AspectRatio ratio={1}>
					<Skeleton className="h-full w-full" />
				</AspectRatio>
			</div>
		);
	}

	return (
		<div className="relative w-full">
			<Carousel setApi={setApi} className="w-full">
				<CarouselContent>
					{images.map((image, index) => (
						<CarouselItem key={index}>
							<AspectRatio ratio={1}>
								<Image
									src={image}
									alt={`${productName} - Image ${index + 1}`}
									fill
									className="object-cover"
									priority={index === 0}
								/>
							</AspectRatio>
						</CarouselItem>
					))}
				</CarouselContent>
			</Carousel>
			{images.length > 1 && (
				<div className="mt-4 flex justify-center gap-2">
					{images.map((_, index) => (
						<button
							key={index}
							type="button"
							onClick={() => api?.scrollTo(index)}
							className={cn(
								"h-2 rounded-full transition-all",
								current === index
									? "w-8 bg-foreground"
									: "w-2 bg-muted-foreground/30",
							)}
							aria-label={t("goToSlide", { index: index + 1 })}
						/>
					))}
				</div>
			)}
		</div>
	);
}
