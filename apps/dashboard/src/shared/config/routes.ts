/**
 * Type-safe routing utility for Next.js App Router
 * Provides full compatibility with Next.js's typedRoutes while maintaining custom structure
 */

import { Icons } from "@dukkani/ui/components/icons";
import type { Route } from "next";

/**
 * Route path definitions with type safety
 * Uses `satisfies Route` to validate routes exist in Next.js typedRoutes
 * Routes that don't exist will show TypeScript errors
 */
export const RoutePaths = {
  AUTH: {
    LOGIN: {
      url: "/login" as Route,
      label: "Login",
    },
    ONBOARDING: {
      INDEX: {
        url: "/onboarding" as Route,
        label: "Onboarding",
      },
    },
  },
  DASHBOARD: {
    url: "/" as Route,
    label: "Dashboard",
    icon: Icons.home,
  },

  // Note: Next.js typedRoutes may not recognize routes in route groups like (dashboard)
  // These routes exist but typedRoutes validation is limited
  PRODUCTS: {
    INDEX: {
      url: "/products" as Route,
      label: "Products",
      icon: Icons.products,
    },
    NEW: {
      url: "/products/new" as Route,
      label: "New Product",
    },
    DETAIL: {
      url: (id: string) => `/products/${id}` as Route,
      label: "Edit product",
    },
  },

  ORDERS: {
    INDEX: {
      url: "/orders" as Route,
      label: "Orders",
      icon: Icons.orders,
    },
    DETAIL: {
      url: (id: string) => `/orders/${id}` as Route,
      label: "Order Details",
      hideBottomNav: true,
    },
  },

  CUSTOMERS: {
    INDEX: {
      url: "/customers" as Route,
      label: "Customers",
      icon: Icons.users,
    },
    NEW: {
      url: "/customers/new" as Route,
      label: "New Customer",
    },
    DETAIL: {
      url: (id: string) => `/customers/${id}` as Route,
      label: "Customer Details",
    },
  },

  SETTINGS: {
    INDEX: {
      url: "/settings" as Route,
      label: "Settings",
      icon: Icons.settings,
    },
    PROFILE: {
      url: "/settings/profile" as Route,
      label: "Profile",
      icon: Icons.user,
    },
    PAYMENTS: {
      url: "/settings/payments" as Route,
      label: "Payments",
      icon: Icons.payments,
    },
    STOREFRONT: {
      url: "/settings/storefront" as Route,
      label: "Storefront",
      icon: Icons.storefront,
    },
  },
} as const;

const DYNAMIC_ID_MARKER = "___DYNAMIC_ID___" as const;

/**
 * Strips the leading `[lang]` segment from the pathname. App routes are under
 * `/{locale}/…` (see `proxy`); `RoutePaths` use paths without the locale
 * prefix.
 */
function pathWithoutLocale(pathname: string): string {
  const parts = pathname.split("/").filter(Boolean);
  if (parts.length < 2) {
    if (parts.length === 0) {
      return "/";
    }
    return `/${parts[0]}`;
  }
  return `/${parts.slice(1).join("/")}`;
}

/**
 * Recursively collects `hideBottomNav` rules from `RoutePaths` and returns
 * matchers for the app path (no locale prefix).
 */
function buildHideBottomNavMatchers(): ((pathname: string) => boolean)[] {
  const matchers: ((pathname: string) => boolean)[] = [];
  const visit = (node: unknown): void => {
    if (node === null || typeof node !== "object") {
      return;
    }
    const o = node as Record<string, unknown>;
    if (
      "url" in o &&
      (typeof o.url === "string" || typeof o.url === "function")
    ) {
      if (o.hideBottomNav === true) {
        const url = o.url;
        if (typeof url === "string") {
          matchers.push((pathname) => pathWithoutLocale(pathname) === url);
        } else {
          const built = url(DYNAMIC_ID_MARKER) as string;
          const segs = built.split(DYNAMIC_ID_MARKER);
          if (segs.length < 2) {
            return;
          }
          const re = new RegExp(
            `^${segs
              .map((s) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"))
              .join("[^/]+")}$`,
          );
          matchers.push((pathname) => re.test(pathWithoutLocale(pathname)));
        }
      }
      return;
    }
    for (const v of Object.values(o)) {
      visit(v);
    }
  };
  visit(RoutePaths);
  return matchers;
}

let hideBottomNavMatchers: ((pathname: string) => boolean)[] | null = null;
function getHideBottomNavMatchers(): ((pathname: string) => boolean)[] {
  if (hideBottomNavMatchers === null) {
    hideBottomNavMatchers = buildHideBottomNavMatchers();
  }
  return hideBottomNavMatchers;
}

/** True when the current path matches a route that sets `hideBottomNav`. */
export function shouldHideBottomNav(pathname: string): boolean {
  return getHideBottomNavMatchers().some((m) => m(pathname));
}

/**
 * Type for route groups (e.g., 'AUTH', 'PRODUCTS', 'ORDERS')
 */
type RouteGroup = keyof typeof RoutePaths;

/**
 * Type for route keys within a group
 */
type RouteKey<T extends RouteGroup> = T extends "SETTINGS"
  ? keyof (typeof RoutePaths)[T] | "STORE"
  : keyof (typeof RoutePaths)[T];

/**
 * Get route path as string
 * Compatible with Next.js App Router's Link and useRouter
 */
export function getRoutePath<T extends RouteGroup>(
  group: T,
  key: RouteKey<T>,
  id?: string,
): string {
  const route = RoutePaths[group][key as keyof (typeof RoutePaths)[T]];

  if (typeof route === "function") {
    if (!id) {
      throw new Error(
        `Route ${String(group)}.${String(key)} requires an id parameter`,
      );
    }
    return route(id);
  }

  if (typeof route === "object" && route !== null && "INDEX" in route) {
    // Handle nested routes like SETTINGS.STORE
    return (route as { INDEX: Route }).INDEX;
  }

  return route as Route;
}

/**
 * Get route href compatible with Next.js Link component
 * Returns a typed Route for type safety
 */
export function getRouteHref<T extends RouteGroup>(
  group: T,
  key: RouteKey<T>,
  id?: string,
): Route {
  return getRoutePath(group, key, id) as Route;
}

/**
 * Build a route with query parameters using type-safe URL utilities
 *
 * @example
 *
 * getRouteWithQuery(RoutePaths.AUTH.ONBOARDING.url, { email: "user@example.com" })
 * // Returns: "/onboarding?email=user%40example.com"
 *  */
export function getRouteWithQuery(
  baseRoute: Route | string,
  params: Record<string, string | number | boolean | undefined | null>,
): string {
  const queryString = new URLSearchParams(
    Object.entries(params)
      .filter(([_, value]) => value !== undefined && value !== null)
      .map(([key, value]) => [key, String(value)]),
  ).toString();

  return queryString ? `${baseRoute}?${queryString}` : baseRoute;
}
