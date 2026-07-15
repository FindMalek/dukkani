import { pathWithoutLocale, RoutePaths } from "@/shared/config/routes";

/**
 * Primary nav routes shared by `BottomNavigation` and `AppSidebar`. Keeping
 * this list in one place means both surfaces always expose the same routes,
 * icons, and labels — see #486.
 */
export const mainNavLinks = [
  RoutePaths.DASHBOARD,
  RoutePaths.PRODUCTS.INDEX,
  RoutePaths.ORDERS.INDEX,
  RoutePaths.CUSTOMERS.INDEX,
  RoutePaths.SETTINGS.INDEX,
];

/**
 * Whether `targetPath` (a locale-less `RoutePaths` url) is the active route
 * for `currentPath` (the raw `usePathname()` value, which includes the
 * `[lang]` segment, e.g. `/en/products`).
 */
export function isActiveRoute(
  currentPath: string,
  targetPath: string,
  exact = false,
): boolean {
  const current = pathWithoutLocale(currentPath);
  if (exact) {
    return current === targetPath;
  }
  return current.startsWith(targetPath);
}
