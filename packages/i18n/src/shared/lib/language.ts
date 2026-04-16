export const SupportedLanguages = {
  FRENCH: "fr",
  ENGLISH: "en",
  ARABIC: "ar",
} as const;

export type SupportedLanguage =
  (typeof SupportedLanguages)[keyof typeof SupportedLanguages];

export function isSupportedLanguage(
  language: string,
): language is SupportedLanguage {
  const found = Object.values(SupportedLanguages).find((v) => v === language);
  return found !== undefined;
}

export const DefaultLanguage = SupportedLanguages.FRENCH;
