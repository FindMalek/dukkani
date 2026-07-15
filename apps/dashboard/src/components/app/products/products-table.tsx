"use client";

import type { ListProductOutput } from "@dukkani/common/schemas/product/output";
import { Badge } from "@dukkani/ui/components/badge";
import { Icons } from "@dukkani/ui/components/icons";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@dukkani/ui/components/table";
import { cn } from "@dukkani/ui/lib/utils";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { RoutePaths } from "@/shared/config/routes";
import { useProductListItemView } from "@/shared/lib/product/list-item-view.hook";
import { ProductCardDropdown } from "./product-card-dropdown";

interface ProductsTableProps {
  products: ListProductOutput[];
  onDelete: (id: string) => void;
  onTogglePublish: (id: string, published: boolean) => void;
}

/**
 * Desktop (>=1280px / `xl:`) table presentation of the products list.
 *
 * Mirrors the data + actions already surfaced by {@link ProductListCard} —
 * same fields, same edit/publish-toggle/delete actions, same navigation
 * target — just laid out for wide screens. Filtering, sorting, pagination
 * and mutations all stay owned by `useProductsController`; this component
 * is presentation only.
 */
export function ProductsTable({
  products,
  onDelete,
  onTogglePublish,
}: ProductsTableProps) {
  const t = useTranslations("products.list");

  return (
    <div className="hidden rounded-lg border xl:block">
      <Table>
        <TableHeader>
          <TableRow className="hover:bg-transparent">
            <TableHead className="w-16">
              <span className="sr-only">{t("table.image")}</span>
            </TableHead>
            <TableHead>{t("table.name")}</TableHead>
            <TableHead>{t("table.price")}</TableHead>
            <TableHead>{t("table.stock")}</TableHead>
            <TableHead>{t("table.status")}</TableHead>
            <TableHead className="w-12 text-end">
              <span className="sr-only">{t("table.actions")}</span>
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {products.map((product) => (
            <ProductsTableRow
              key={product.id}
              product={product}
              onDelete={onDelete}
              onTogglePublish={onTogglePublish}
            />
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

interface ProductsTableRowProps {
  product: ListProductOutput;
  onDelete: (id: string) => void;
  onTogglePublish: (id: string, published: boolean) => void;
}

function ProductsTableRow({
  product,
  onDelete,
  onTogglePublish,
}: ProductsTableRowProps) {
  const router = useRouter();
  const t = useTranslations("products.list");
  const { priceLabel, isOutOfStock, stockStatusText, firstImageUrl } =
    useProductListItemView(product);

  return (
    <TableRow
      className="cursor-pointer"
      onClick={() => router.push(RoutePaths.PRODUCTS.DETAIL.url(product.id))}
    >
      <TableCell>
        <div className="size-12 shrink-0 overflow-hidden rounded-md border border-border/50 bg-muted/50">
          {firstImageUrl ? (
            <Image
              key={firstImageUrl}
              src={firstImageUrl}
              alt={product.name}
              width={48}
              height={48}
              unoptimized
              className="size-full object-cover"
            />
          ) : (
            <div className="flex size-full items-center justify-center">
              <Icons.package className="size-4 text-muted-foreground/50" />
            </div>
          )}
        </div>
      </TableCell>
      <TableCell className="max-w-xs whitespace-normal">
        <p className="line-clamp-2 font-medium text-foreground/90">
          {product.name}
        </p>
      </TableCell>
      <TableCell className="font-medium">{priceLabel}</TableCell>
      <TableCell>
        <span
          className={cn(
            "font-medium text-sm",
            isOutOfStock ? "text-destructive" : "text-muted-foreground",
          )}
        >
          {stockStatusText}
        </span>
      </TableCell>
      <TableCell>
        <Badge
          variant={product.published ? "statusSuccess" : "statusMuted"}
          size="sm"
        >
          {product.published ? t("status.published") : t("status.draft")}
        </Badge>
      </TableCell>
      <TableCell
        className="text-end"
        onClick={(e) => e.stopPropagation()}
        onPointerDown={(e) => e.stopPropagation()}
      >
        <ProductCardDropdown
          product={product}
          onDelete={onDelete}
          onTogglePublish={onTogglePublish}
        />
      </TableCell>
    </TableRow>
  );
}
