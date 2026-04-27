/**
 * Local calendar-day comparisons (midnight in the runtime timezone).
 * Use for bucketing and “today / yesterday” labels, not for UTC instants.
 */
export function getStartOfLocalDay(date: Date): Date {
  const d = new Date(date);
  d.setHours(0, 0, 0, 0);
  return d;
}

export function isSameLocalCalendarDay(a: Date, b: Date): boolean {
  return getStartOfLocalDay(a).getTime() === getStartOfLocalDay(b).getTime();
}

export function isLocalCalendarDayToday(date: Date, now: Date): boolean {
  return isSameLocalCalendarDay(date, now);
}

export function isLocalCalendarDayYesterday(date: Date, now: Date): boolean {
  const yesterday = new Date(now);
  yesterday.setDate(yesterday.getDate() - 1);
  return isSameLocalCalendarDay(date, yesterday);
}
