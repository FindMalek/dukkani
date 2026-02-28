"use client";

import type { ListProductOutput } from "@dukkani/common/schemas/product/output";
import { Button } from "@dukkani/ui/components/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@dukkani/ui/components/dropdown-menu";
import { Icons } from "@dukkani/ui/components/icons";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { RoutePaths } from "@/lib/routes";

interface ProductCardDropdownProps {
	product: ListProductOutput;
	onDelete: (id: string) => void;
	onTogglePublish: (id: string, published: boolean) => void;
}

export function ProductCardDropdown({
	product,
	onDelete,
	onTogglePublish,
}: ProductCardDropdownProps) {
	const t = useTranslations("products.list.actions");
	const router = useRouter();

	const handleEdit = () => {
		router.push(RoutePaths.PRODUCTS.DETAIL.url(product.id));
	};

	const handleDelete = () => {
		onDelete(product.id);
	};

	const handleTogglePublish = () => {
		onTogglePublish(product.id, !product.published);
	};

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button
					variant="ghost"
					size="icon-sm"
					className="size-8 shrink-0"
					onClick={(e) => e.stopPropagation()}
					aria-label="Product actions"
				>
					<Icons.moreHorizontal className="size-4" />
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent align="end" onClick={(e) => e.stopPropagation()}>
				<DropdownMenuItem onClick={handleEdit}>
					<Icons.edit className="size-4" />
					{t("edit")}
				</DropdownMenuItem>
				<DropdownMenuItem onClick={handleTogglePublish}>
					{product.published ? (
						<>
							<Icons.eyeOff className="size-4" />
							{t("unpublish")}
						</>
					) : (
						<>
							<Icons.eye className="size-4" />
							{t("publish")}
						</>
					)}
				</DropdownMenuItem>
				<DropdownMenuItem variant="destructive" onClick={handleDelete}>
					<Icons.trash className="size-4" />
					{t("delete")}
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
