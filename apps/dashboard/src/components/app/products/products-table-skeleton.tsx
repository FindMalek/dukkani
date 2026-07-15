"use client";

import { Skeleton } from "@dukkani/ui/components/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@dukkani/ui/components/table";
import { useTranslations } from "next-intl";

/**
 * Desktop (>=1280px / `xl:`) loading state for {@link ProductsTable}.
 * Row shape mirrors the table's columns so the skeleton doesn't shift
 * layout once data arrives.
 */
export function ProductsTableSkeleton() {
  const t = useTranslations("products.list");

  return (
    <div
      className="hidden rounded-lg border xl:block"
      role="status"
      aria-busy
      aria-label={t("loading")}
    >
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
          {Array.from({ length: 5 }).map((_, i) => (
            <TableRow key={i} className="hover:bg-transparent">
              <TableCell>
                <Skeleton className="size-12 rounded-md" />
              </TableCell>
              <TableCell>
                <Skeleton className="h-4 w-40" />
              </TableCell>
              <TableCell>
                <Skeleton className="h-4 w-16" />
              </TableCell>
              <TableCell>
                <Skeleton className="h-4 w-24" />
              </TableCell>
              <TableCell>
                <Skeleton className="h-5 w-16 rounded-full" />
              </TableCell>
              <TableCell className="text-end">
                <Skeleton className="ms-auto size-8 rounded" />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <span className="sr-only">{t("loading")}</span>
    </div>
  );
}
