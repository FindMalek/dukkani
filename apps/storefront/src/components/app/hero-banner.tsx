import { AspectRatio } from "@dukkani/ui/components/aspect-ratio";
import { Button } from "@dukkani/ui/components/button";
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
				<AspectRatio ratio={16 / 9}>
					{imageUrl ? (
						<Image
							src={imageUrl}
							alt={title}
							fill
							className="object-cover"
							priority
						/>
					) : (
						<div className="h-full w-full bg-muted" />
					)}
					<div className="absolute inset-0 bg-black/20" />
					<div className="absolute bottom-6 left-6 text-white">
						<h2 className="mb-2 font-bold text-2xl">{title}</h2>
						<Button
							variant="ghost"
							asChild
							className="h-auto p-0 text-white hover:text-white/80"
						>
							<Link href={linkHref}>{subtitle}</Link>
						</Button>
					</div>
				</AspectRatio>
			</div>
		</div>
	);
}
