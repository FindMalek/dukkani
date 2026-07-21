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
import Link from "next/link";
import { useTranslations } from "next-intl";
import { RoutePaths } from "@/shared/config/routes";
import { useProductListItemView } from "@/shared/lib/product/list-item-view.hook";
import { ProductCardDropdown } from "./product-card-dropdown";

interface ProductsTableProps {
  products: ListProductOutput[];
  onDelete: (id: string) => void;
  onTogglePublish: (id: string, published: boolean) => void;
  /** Hide the Status column when a specific status filter (not "All") is active — every visible row already shares it. */
  showStatus: boolean;
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
  showStatus,
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
            {showStatus && <TableHead>{t("table.status")}</TableHead>}
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
              showStatus={showStatus}
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
  showStatus: boolean;
}

function ProductsTableRow({
  product,
  onDelete,
  onTogglePublish,
  showStatus,
}: ProductsTableRowProps) {
  const t = useTranslations("products.list");
  const { priceLabel, isOutOfStock, stockStatusText, firstImageUrl } =
    useProductListItemView(product);

  return (
    <TableRow className="group relative hover:bg-muted/50">
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
        <Link
          href={RoutePaths.PRODUCTS.DETAIL.url(product.id)}
          className="line-clamp-2 font-medium text-foreground/90 after:absolute after:inset-0 hover:underline"
        >
          {product.name}
        </Link>
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
      {showStatus && (
        <TableCell>
          <Badge
            variant={product.published ? "statusSuccess" : "statusMuted"}
            size="sm"
          >
            {product.published ? t("status.published") : t("status.draft")}
          </Badge>
        </TableCell>
      )}
      <TableCell className="relative z-10 text-end">
        <ProductCardDropdown
          product={product}
          onDelete={onDelete}
          onTogglePublish={onTogglePublish}
        />
      </TableCell>
    </TableRow>
  );
}
