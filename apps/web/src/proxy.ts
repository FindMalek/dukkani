import { I18nextWebConfig } from "@dukkani/i18n/web";
import { createProxy } from "next-i18next/middleware";

export const proxy = createProxy(I18nextWebConfig);

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|assets|favicon.ico|favicon|sw.js|.well-known|site.webmanifest).*)",
  ],
};
