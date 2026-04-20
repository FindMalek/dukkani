type RouteParams = Record<string, string | string[] | undefined>;

/**
 * Reads a single string value for a dynamic route segment (e.g. `[id]`).
 * For catch-all segments (`[...slug]`), returns the first segment when the param is a string array.
 */
export function getDynamicRouteParam(
  params: RouteParams,
  key: string,
): string | undefined {
  const raw = params[key];
  if (typeof raw === "string" && raw.length > 0) {
    return raw;
  }
  if (Array.isArray(raw) && raw.length > 0 && raw[0]) {
    return raw[0];
  }
  return undefined;
}
