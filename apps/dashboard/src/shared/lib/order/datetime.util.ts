export function formatOrderDateTime(
  date: Date,
  now: Date,
  t: (key: string) => string,
): string {
  const d = new Date(date);
  const today = new Date(now);
  today.setHours(0, 0, 0, 0);
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);
  const dStart = new Date(d);
  dStart.setHours(0, 0, 0, 0);

  const timeStr = d.toLocaleTimeString(undefined, {
    hour: "2-digit",
    minute: "2-digit",
  });

  if (dStart.getTime() === today.getTime()) {
    return `${t("today")} ${timeStr}`;
  }
  if (dStart.getTime() === yesterday.getTime()) {
    return `${t("yesterday")} ${timeStr}`;
  }
  return d.toLocaleDateString(undefined, {
    day: "numeric",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
  });
}
