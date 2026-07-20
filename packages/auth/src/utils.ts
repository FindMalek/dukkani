import { scrypt } from "node:crypto";
import {
  isOriginAllowedByPatterns,
  isOriginAllowedForRequest,
} from "@dukkani/common/lib";

/**
 * Custom password verifier to match seeder format
 * Format: salt:hash (both base64 encoded)
 * BetterAuth expects: verify({ hash, password })
 */
export async function verifyPassword({
  hash: hashedPassword,
  password,
}: {
  hash: string;
  password: string;
}): Promise<boolean> {
  const [saltBase64, hashBase64] = hashedPassword.split(":");
  if (!saltBase64 || !hashBase64) {
    return false;
  }

  const salt = Buffer.from(saltBase64, "base64");
  const hash = await new Promise<Buffer>((resolve, reject) => {
    scrypt(
      password,
      salt,
      64,
      {
        N: 16384,
        r: 8,
        p: 1,
      },
      (err, derivedKey) => {
        if (err) reject(err);
        else resolve(derivedKey);
      },
    );
  });

  return hash.toString("base64") === hashBase64;
}

/**
 * Derive the cookie `Domain` attribute that lets the session cookie be shared
 * across all subdomains of the API's own domain (e.g. `api.dukkani.co` and
 * `dashboard.dukkani.co` both sit under `.dukkani.co`; in preview,
 * `api.preview.dukkani.co` and `dashboard.preview.dukkani.co` both sit under
 * `.preview.dukkani.co`). Returns undefined when there's no subdomain to
 * strip (e.g. localhost, or an apex domain), in which case cross-subdomain
 * cookie sharing should stay disabled.
 */
export function deriveCookieDomain(apiUrl: string): string | undefined {
  try {
    const labels = new URL(apiUrl).hostname.split(".");
    if (labels.length < 3) {
      return undefined;
    }
    return `.${labels.slice(1).join(".")}`;
  } catch {
    return undefined;
  }
}

/**
 * Build trusted origins configuration for Better Auth
 * Returns either a static array or a dynamic function that validates origins
 */
export function buildTrustedOrigins(
  baseOrigins: string[],
  isVercel: boolean,
  allowedOriginPattern?: string,
  previewOriginPattern?: string,
): string[] | ((request?: Request) => string[] | Promise<string[]>) {
  // Enable dynamic origin check when on Vercel (even without allowedOriginPattern)
  // so preview deployments can trust *.vercel.app origins
  if (isVercel) {
    return (request?: Request) => {
      if (!request) {
        return baseOrigins;
      }
      const origin = request.headers.get("origin");
      if (
        origin &&
        (isOriginAllowedForRequest(origin, baseOrigins, allowedOriginPattern) ||
          (process.env.VERCEL_ENV === "preview" &&
            isOriginAllowedByPatterns(origin, previewOriginPattern)))
      ) {
        return [...baseOrigins, origin];
      }
      return baseOrigins;
    };
  }

  return baseOrigins;
}
