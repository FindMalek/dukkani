export const RESERVED_STORE_SLUGS = [
  "api",
  "dashboard",
  "www",
  "admin",
  "auth",
  "login",
  "register",
  "signin",
  "signout",
  "account",
  "products",
  "checkout",
  "success",
  "cart",
  "order",
  "orders",
  "store",
  "stores",
  "en",
  "ar",
  "fr",
  "_next",
  "_vercel",
  "static",
  "public",
  "assets",
  "favicon",
  "robots",
  "sitemap",
  "api-docs",
] as const;

export function isReservedStoreSlug(slug: string): boolean {
  return (RESERVED_STORE_SLUGS as readonly string[]).includes(
    slug.toLowerCase(),
  );
}
