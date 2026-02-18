"use client";

import {
	Avatar,
	AvatarFallback,
	AvatarImage,
} from "@dukkani/ui/components/avatar";
import { Icons } from "@dukkani/ui/components/icons";
import { cn } from "@dukkani/ui/lib/utils";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useTranslations } from "next-intl";
import { RoutePaths } from "@/lib/routes";

interface StoreInfoCardProps {
	storeName: string;
	ownerName?: string | null;
	ownerImage?: string | null;
	isOpen?: boolean;
	storeSlug?: string;
}

export function StoreInfoCard({
	storeName,
	ownerName,
	ownerImage,
	isOpen,
	storeSlug,
}: StoreInfoCardProps) {
	const t = useTranslations("storefront.store.product.storeInfo");

	if (!storeSlug) {
		return null;
	}

	return (
		<Link href={RoutePaths.HOME.url} className="block">
			<div className="flex items-center gap-3 rounded-lg bg-primary/10 p-3">
				<Avatar className="size-10">
					<AvatarImage
						src={ownerImage || undefined}
						alt={ownerName || storeName}
					/>
					<AvatarFallback className="bg-secondary-foreground/10 text-secondary-foreground">
						{ownerName?.[0] || storeName[0] || "S"}
					</AvatarFallback>
				</Avatar>
				<div className="flex-1">
					<p className="font-medium text-foreground">{storeName}</p>
					{isOpen !== undefined && (
						<p className="text-muted-foreground text-sm">
							<span
								className={cn(
									"me-1 inline-block size-2 rounded-full",
									isOpen ? "bg-primary" : "bg-muted-foreground",
								)}
							/>
							{isOpen ? t("openNow") : t("closed")}
						</p>
					)}
				</div>
				<Icons.chevronRight className="size-5 text-muted-foreground rtl:rotate-180" />
			</div>
		</Link>
	);
}
