import { AspectRatio } from "@dukkani/ui/components/aspect-ratio";
import { Button } from "@dukkani/ui/components/button";
import { Skeleton } from "@dukkani/ui/components/skeleton";
import Image from "next/image";
import Link from "next/link";

interface HeroBannerProps {
	imageUrl?: string;
	title: string;
	subtitle: string;
	linkHref?: string;
}

export function HeroBanner({
	imageUrl,
	title,
	subtitle,
	linkHref = "#",
}: HeroBannerProps) {
	return (
		<div className="container mx-auto mb-6 px-4">
			<div className="relative overflow-hidden rounded-lg">
				<AspectRatio ratio={16 / 8}>
					{imageUrl ? (
						<Image
							src={imageUrl}
							alt={title}
							fill
							className="object-cover"
							priority
						/>
					) : (
						<Skeleton className="h-full w-full" />
					)}
					<div className="absolute inset-0 bg-linear-to-t from-foreground/60 via-foreground/20 to-transparent" />
					<div className="absolute start-3 bottom-3 text-card">
						<h2 className="font-bold text-lg">{title}</h2>
						<Button
							variant="ghost"
							asChild
							className="h-auto p-0 text-card/70 text-sm"
						>
							<Link href={linkHref}>{subtitle}</Link>
						</Button>
					</div>
				</AspectRatio>
			</div>
		</div>
	);
}
