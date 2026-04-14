"use client";

import { useFormatPriceForActiveStore } from "@/shared/lib/store/format-price.hook";
import { MetricCard } from "./metric-card";

interface RevenueCardProps {
  title: string;
  value: number;
  className?: string;
}

export function RevenueCard({ title, value, className }: RevenueCardProps) {
  const formatPrice = useFormatPriceForActiveStore();

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
