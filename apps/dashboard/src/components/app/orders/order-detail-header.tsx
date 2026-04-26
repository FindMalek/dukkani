import { Button } from "@dukkani/ui/components/button";
import { Icons } from "@dukkani/ui/components/icons";
import { cn } from "@dukkani/ui/lib/utils";
import Link from "next/link";
import { RoutePaths } from "@/shared/config/routes";

export function OrderDetailHeader({
  title,
  titleClassName,
}: {
  title: string;
  titleClassName?: string;
}) {
  return (
    <div className="flex items-center justify-between">
      <Link href={RoutePaths.ORDERS.INDEX.url}>
        <Button variant="ghost" size="icon">
          <Icons.arrowLeft className="size-4" />
        </Button>
      </Link>
      <h1 className={cn("font-semibold", titleClassName)}>{title}</h1>
      <div className="w-9" />
    </div>
  );
}
