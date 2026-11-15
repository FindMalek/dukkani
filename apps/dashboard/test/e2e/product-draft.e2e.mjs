// Product draft e2e: creates a product with "save draft" on the new product form
// in en, fr and ar, then checks the row is stored unpublished.
//
// Run with the api (:3002) and dashboard (:3003) dev servers up and the local
// postgres container running:
//   CHROME_BIN=<chrome-headless-shell> PLAYWRIGHT_DIR=<dir with playwright> \
//   SCREENSHOT_DIR=<out dir> node apps/dashboard/test/e2e/product-draft.e2e.mjs

import { execFileSync } from "node:child_process";
import { mkdirSync } from "node:fs";
import { createRequire } from "node:module";
import path from "node:path";

const playwrightDir = process.env.PLAYWRIGHT_DIR;
if (!playwrightDir) throw new Error("PLAYWRIGHT_DIR is required");
const { chromium } = createRequire(path.join(playwrightDir, "package.json"))(
  "playwright",
);

const BASE_URL = process.env.DASHBOARD_URL ?? "http://localhost:3003";
const SCREENSHOT_DIR = process.env.SCREENSHOT_DIR ?? "./screenshots";
const DB_CONTAINER = process.env.DB_CONTAINER ?? "dukkani-postgres";
const EMAIL = process.env.E2E_EMAIL ?? "sana@dukkani.co";
const PASSWORD = process.env.E2E_PASSWORD ?? "Merchant123!";
const LABELS = {
  en: { name: "Product Name", price: "Price", draft: "Save draft" },
  fr: {
    name: "Nom du produit",
    price: "Prix",
    draft: "Enregistrer le brouillon",
  },
  ar: { name: "اسم المنتج", price: "السعر", draft: "حفظ كمسودة" },
};

mkdirSync(SCREENSHOT_DIR, { recursive: true });

function sql(query) {
  return execFileSync("docker", [
    "exec",
    DB_CONTAINER,
    "sh",
    "-c",
    `psql -U "$POSTGRES_USER" -d "$POSTGRES_DB" -tAc "${query}"`,
  ])
    .toString()
    .trim();
}

const browser = await chromium.launch({
  executablePath: process.env.CHROME_BIN,
  headless: true,
});
const results = [];

try {
  const context = await browser.newContext({
    viewport: { width: 390, height: 844 },
    isMobile: true,
    hasTouch: true,
  });
  const loginRes = await context.request.post(
    `${BASE_URL}/api/auth/sign-in/email`,
    { data: { email: EMAIL, password: PASSWORD } },
  );
  if (!loginRes.ok()) throw new Error(`sign in failed: ${loginRes.status()}`);

  for (const locale of Object.keys(LABELS)) {
    // product create is rate limited per user, space the locales out
    await new Promise((resolve) => setTimeout(resolve, 35_000));
    const label = LABELS[locale];
    const productName = `e2e draft ${locale} ${Date.now()}`;
    const page = await context.newPage();
    await page.goto(`${BASE_URL}/${locale}/products/new`, {
      waitUntil: "networkidle",
    });
    const name = page.getByLabel(label.name).first();
    await name.click();
    await name.pressSequentially(productName);
    const price = page.getByLabel(label.price).first();
    await price.click();
    await price.pressSequentially("12");
    await price.press("Tab");
    await page.waitForTimeout(500);
    await page.screenshot({
      path: path.join(SCREENSHOT_DIR, `${locale}-product-new-filled.png`),
      fullPage: true,
    });
    await page.getByRole("button", { name: label.draft, exact: true }).click();
    await page.waitForURL((url) => !url.pathname.endsWith("/new"), {
      timeout: 60_000,
    });

    const published = sql(
      `select p.published from products p join product_versions v on v.product_id = p.id where v.name = '${productName}' limit 1`,
    );
    if (published !== "f") {
      throw new Error(
        `${locale}: expected draft (published=f), got "${published}"`,
      );
    }
    results.push(`${locale} save draft stores unpublished product ok`);
    await page.waitForLoadState("networkidle");
    await page.screenshot({
      path: path.join(SCREENSHOT_DIR, `${locale}-products-list.png`),
      fullPage: true,
    });
    await page.close();
  }
  await context.close();
} finally {
  await browser.close();
}

console.log(results.join("\n"));
