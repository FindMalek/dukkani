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
  return Object.prototype.hasOwnProperty.call(SupportedLanguages, language);
}

export const DefaultLanguage = SupportedLanguages.FRENCH;
