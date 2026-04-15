export const SupportedLanguages = {
  FRENCH: "fr",
  ENGLISH: "en",
  ARABIC: "ar",
} as const;

export type SupportedLanguage =
  (typeof SupportedLanguages)[keyof typeof SupportedLanguages];

export const DefaultLanguage = SupportedLanguages.FRENCH;
