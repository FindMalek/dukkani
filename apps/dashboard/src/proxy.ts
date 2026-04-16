import { I18nextDashboardConfig } from "@dukkani/i18n/dashboard";
import { createProxy } from "next-i18next/middleware";

export const proxy = createProxy(I18nextDashboardConfig);

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|assets|favicon.ico|favicon|.*.webmanifest|sw.js|.well-known).*)",
  ],
};
