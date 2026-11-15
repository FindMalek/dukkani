// Onboarding e2e: walks each onboarding step in en, fr and ar against a running
// local stack (api on :3002, dashboard on :3003, local postgres container).
//
// Run from the repo root with the dev servers up:
//   CHROME_BIN=<chrome-headless-shell> PLAYWRIGHT_DIR=<dir with playwright> \
//   SCREENSHOT_DIR=<out dir> node apps/dashboard/test/e2e/onboarding-steps.e2e.mjs
//
// Uses the seeded merchant sana@dukkani.co and restores its onboarding step.

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
const EMAIL = "sana@dukkani.co";
const PASSWORD = "Merchant123!";
const LOCALES = ["en", "fr", "ar"];
const STEPS = ["STORE_SETUP", "STORE_CREATED", "STORE_CONFIGURED"];

mkdirSync(SCREENSHOT_DIR, { recursive: true });

function sql(query) {
  return execFileSync("docker", [
    "exec",
    "dukkani-postgres",
    "sh",
    "-c",
    `psql -U "$POSTGRES_USER" -d "$POSTGRES_DB" -tAc "${query}"`,
  ])
    .toString()
    .trim();
}

const getStep = () =>
  sql(`select onboarding_step from users where email = '${EMAIL}'`);
const setStep = (step) =>
  sql(`update users set onboarding_step = '${step}' where email = '${EMAIL}'`);

async function waitForStep(expected, timeoutMs = 15_000) {
  const deadline = Date.now() + timeoutMs;
  let current = getStep();
  while (current !== expected && Date.now() < deadline) {
    await new Promise((resolve) => setTimeout(resolve, 500));
    current = getStep();
  }
  return current;
}

async function login(context) {
  const res = await context.request.post(`${BASE_URL}/api/auth/sign-in/email`, {
    data: { email: EMAIL, password: PASSWORD },
  });
  if (!res.ok()) throw new Error(`sign in failed: ${res.status()}`);
}

// sign in once and reuse the session cookies, the api rate limits repeated sign-ins
let sessionState;
async function getSessionState(browser) {
  if (!sessionState) {
    const context = await browser.newContext();
    await login(context);
    sessionState = await context.storageState();
    await context.close();
  }
  return sessionState;
}

async function newContext(browser, { authed }) {
  return browser.newContext({
    viewport: { width: 390, height: 844 },
    isMobile: true,
    hasTouch: true,
    storageState: authed ? await getSessionState(browser) : undefined,
  });
}

async function openStep(page, locale, screenshotName, { authed = false } = {}) {
  const url = `${BASE_URL}/${locale}/onboarding`;
  // the api's standard limiter is 30 req/min per user, space out authenticated steps
  if (authed) await new Promise((resolve) => setTimeout(resolve, 12_000));
  await page.goto(url, { waitUntil: "networkidle" });
  // dev server compiles on first hit, so wait for real content instead of a fixed delay
  await page.waitForFunction(() => document.body.innerText.trim().length > 40, {
    timeout: 90_000,
  });
  // a session fetch that fails on a cold dev server renders the guest signup form,
  // so retry once for authenticated steps
  if (authed && (await page.locator('input[type="email"]').count()) > 0) {
    await page.reload({ waitUntil: "networkidle" });
    await page.waitForFunction(
      () => document.body.innerText.trim().length > 40,
      {
        timeout: 90_000,
      },
    );
  }
  await page.waitForTimeout(800);
  const text = (await page.locator("body").innerText()).trim();
  await page.screenshot({
    path: path.join(SCREENSHOT_DIR, `${screenshotName}.png`),
    fullPage: true,
  });
  return text;
}

const browser = await chromium.launch({
  executablePath: process.env.CHROME_BIN,
  headless: true,
});

const originalStep = getStep();
const results = [];

try {
  for (const locale of LOCALES) {
    // guest signup
    const guest = await newContext(browser, { authed: false });
    await openStep(await guest.newPage(), locale, `${locale}-guest-signup`);
    await guest.close();

    for (const step of STEPS) {
      setStep(step);
      const context = await newContext(browser, { authed: true });
      const page = await context.newPage();

      if (step === "STORE_CONFIGURED") {
        // configured merchants must land on the completion step, which calls
        // onboarding.complete and moves the user to STORE_LAUNCHED.
        await openStep(page, locale, `${locale}-${step.toLowerCase()}`, {
          authed: true,
        });
        const after = await waitForStep("STORE_LAUNCHED");
        if (after !== "STORE_LAUNCHED") {
          throw new Error(
            `${locale}: expected STORE_LAUNCHED after completion, got ${after}`,
          );
        }
        await page.screenshot({
          path: path.join(SCREENSHOT_DIR, `${locale}-completion.png`),
          fullPage: true,
        });
      } else {
        await openStep(page, locale, `${locale}-${step.toLowerCase()}`, {
          authed: true,
        });
      }
      results.push(`${locale} ${step} ok`);
      await context.close();
    }
  }

  // dashboard must send a configured merchant back to completion
  setStep("STORE_CONFIGURED");
  const context = await newContext(browser, { authed: true });
  const page = await context.newPage();
  await page.goto(`${BASE_URL}/en`, { waitUntil: "networkidle" });
  if (!page.url().includes("/onboarding")) {
    throw new Error(
      `dashboard did not redirect configured user, url=${page.url()}`,
    );
  }
  results.push("dashboard redirects STORE_CONFIGURED to onboarding ok");
  await context.close();
} finally {
  setStep(originalStep);
  await browser.close();
}

console.log(results.join("\n"));
