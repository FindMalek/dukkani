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
 * Desktop (>=1280px / `xl:`) loading state for {@link CustomersTable}. Row
 * shape mirrors the table's columns so the skeleton doesn't shift layout
 * once data arrives.
 */
export function CustomersTableSkeleton() {
  const t = useTranslations("customers.list");

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
            <TableHead>{t("table.name")}</TableHead>
            <TableHead>{t("table.contact")}</TableHead>
            <TableHead>{t("table.governorate")}</TableHead>
            <TableHead className="text-end">{t("table.orderCount")}</TableHead>
            <TableHead className="text-end">{t("table.totalSpent")}</TableHead>
            <TableHead>{t("table.lastOrder")}</TableHead>
            <TableHead className="w-12 text-end">
              <span className="sr-only">{t("table.actions")}</span>
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {Array.from({ length: 5 }).map((_, i) => (
            <TableRow key={i} className="hover:bg-transparent">
              <TableCell>
                <Skeleton className="h-4 w-32" />
              </TableCell>
              <TableCell>
                <Skeleton className="h-4 w-28" />
              </TableCell>
              <TableCell>
                <Skeleton className="h-5 w-20 rounded-full" />
              </TableCell>
              <TableCell className="text-end">
                <Skeleton className="ms-auto h-4 w-8" />
              </TableCell>
              <TableCell className="text-end">
                <Skeleton className="ms-auto h-4 w-16" />
              </TableCell>
              <TableCell>
                <Skeleton className="h-4 w-24" />
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
