import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import path from "node:path";
import { describe, it } from "node:test";
import { fileURLToPath } from "node:url";

const here = path.dirname(fileURLToPath(import.meta.url));
const localeDir = path.resolve(here, "../../src/locale/dashboard");
const load = (locale) =>
  JSON.parse(readFileSync(path.join(localeDir, `${locale}.json`), "utf8"));

function flatten(obj, prefix = "") {
  return Object.entries(obj).flatMap(([key, value]) =>
    typeof value === "object"
      ? flatten(value, `${prefix}${key}.`)
      : [[`${prefix}${key}`, value]],
  );
}

const en = new Map(flatten(load("en")));
const fr = new Map(flatten(load("fr")));
const ar = new Map(flatten(load("ar")));
const onboardingKeys = [...en.keys()].filter((key) =>
  key.startsWith("onboarding."),
);
// an email placeholder and the "&" glyph are not translatable
const NOT_TRANSLATABLE = new Set([
  "onboarding.signup.email.placeholder",
  "onboarding.signup.and",
]);
const ARABIC_SCRIPT = /[؀-ۿ]/;

describe("onboarding locale strings", () => {
  it("has the same keys in en, fr and ar", () => {
    for (const key of onboardingKeys) {
      assert.ok(fr.has(key), `fr missing ${key}`);
      assert.ok(ar.has(key), `ar missing ${key}`);
    }
  });

  it("does not leave french values as english", () => {
    const untranslated = onboardingKeys.filter(
      (key) => !NOT_TRANSLATABLE.has(key) && fr.get(key) === en.get(key),
    );
    assert.deepEqual(untranslated, []);
  });

  it("uses arabic script for arabic values", () => {
    const latinOnly = onboardingKeys.filter(
      (key) => !NOT_TRANSLATABLE.has(key) && !ARABIC_SCRIPT.test(ar.get(key)),
    );
    assert.deepEqual(latinOnly, []);
  });
});
