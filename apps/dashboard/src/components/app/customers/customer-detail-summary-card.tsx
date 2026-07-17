import { cn } from "@dukkani/ui/lib/utils";
import { useTranslations } from "next-intl";

interface CustomerDetailSummaryCardProps {
  totalSpentFormatted: string;
  orderCount: number;
  avgOrderValueFormatted: string;
  customerSinceFormatted: string;
  className?: string;
}

export function CustomerDetailSummaryCard({
  totalSpentFormatted,
  orderCount,
  avgOrderValueFormatted,
  customerSinceFormatted,
  className,
}: CustomerDetailSummaryCardProps) {
  const t = useTranslations("customers.detail.summary");

  const stats = [
    { label: t("totalSpent"), value: totalSpentFormatted },
    { label: t("orderCount"), value: String(orderCount) },
    { label: t("avgOrderValue"), value: avgOrderValueFormatted },
    { label: t("customerSince"), value: customerSinceFormatted },
  ];

  return (
    <div className={cn("grid grid-cols-2 gap-2", className)}>
      {stats.map((stat) => (
        <div
          key={stat.label}
          className="rounded-xl border bg-card p-3 shadow-sm"
        >
          <p className="text-muted-foreground text-xs">{stat.label}</p>
          <p className="font-bold text-lg">{stat.value}</p>
        </div>
      ))}
    </div>
  );
}
