import {
  isLocalCalendarDayToday,
  isLocalCalendarDayYesterday,
} from "@dukkani/common/lib";
import { useFormatter, useTranslations } from "next-intl";
import { useMemo } from "react";

/**
 * Order list / detail meta line: "Today, 08:10" and "Yesterday, 08:10", or
 * a medium date + short time for older instants. Uses the active next-intl locale.
 */
export function useFormatOrderRelativeDateTime(
  createdAt: Date | string | undefined,
): string {
  const tList = useTranslations("orders.list");
  const format = useFormatter();

  return useMemo(() => {
    if (createdAt == null) return "";
    const orderDate = new Date(createdAt);
    const now = new Date();
    if (isLocalCalendarDayToday(orderDate, now)) {
      const time = format.dateTime(orderDate, {
        hour: "2-digit",
        minute: "2-digit",
      });
      return `${tList("today")}, ${time}`;
    }
    if (isLocalCalendarDayYesterday(orderDate, now)) {
      const time = format.dateTime(orderDate, {
        hour: "2-digit",
        minute: "2-digit",
      });
      return `${tList("yesterday")}, ${time}`;
    }
    return format.dateTime(orderDate, {
      dateStyle: "medium",
      timeStyle: "short",
    });
  }, [createdAt, format, tList]);
}
