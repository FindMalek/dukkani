"use client";

import { store } from "@dukkani/common/schemas";
import { useFormatter } from "next-intl";
import { useGetStoreByIdQuery } from "@/hooks/api/use-stores.hook";
import { useCurrentStoreCurrency } from "@/hooks/use-current-store-currency";
import { useFormatPriceCurrentStore } from "@/hooks/use-format-price-current-store";
import { useActiveStoreStore } from "@/stores";
import { MetricCard } from "./metric-card";

interface RevenueCardProps {
  title: string;
  value: number;
  className?: string;
}

export function RevenueCard({ title, value, className }: RevenueCardProps) {
  const formatPrice = useFormatPriceCurrentStore();

  return (
    <MetricCard
      title={title}
      className={className}
      value={
        <div className="font-bold text-3xl text-foreground">
          {formatPrice(value)}
        </div>
      }
    />
  );
}
