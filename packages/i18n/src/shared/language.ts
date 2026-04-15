export const SupportedLanguages = {
  ENGLISH: "en",
  ARABIC: "ar",
  FRENCH: "fr",
} as const;

export type SupportedLanguage =
  (typeof SupportedLanguages)[keyof typeof SupportedLanguages];

export const DefaultLanguage = SupportedLanguages.FRENCH;
