"use client";

import { SupportedLanguage, SupportedLanguages } from "@dukkani/i18n";
import { usePathname, useRouter } from "next/navigation";
import { useT } from "next-i18next/client";
import { cn } from "../lib/utils";
import { Button } from "./button";
import { Select, SelectContent, SelectItem, SelectTrigger } from "./select";

interface LanguageSwitcherProps {
  variant?: "buttons" | "select";
  className?: string;
}

interface LanguageSwitcherComponentProps {
  currentLanguage: SupportedLanguage;
  handleLanguageChange: (locale: SupportedLanguage) => Promise<void>;
  className?: string;
}

const ComponentMap = {
  buttons: LanguageSwitcherButtonsVariant,
  select: LanguageSwitcherSelectVariant,
};

const Languages = Object.values(SupportedLanguages);

export function LanguageSwitcher({
  variant = "select",
  className,
}: LanguageSwitcherProps) {
  const { i18n } = useT();
  const pathname = usePathname();
  const router = useRouter();
  const Component = ComponentMap[variant];

  const currentLanguage = Object.values(SupportedLanguages).includes(
    i18n.resolvedLanguage as SupportedLanguage,
  )
    ? (i18n.resolvedLanguage as SupportedLanguage)
    : SupportedLanguages.FRENCH;

  const handleLanguageChange = async (language: SupportedLanguage) => {
    router.push(pathname.replace(currentLanguage, language));
  };

  return (
    <Component
      className={className}
      handleLanguageChange={handleLanguageChange}
      currentLanguage={currentLanguage}
    />
  );
}

function LanguageSwitcherSelectVariant({
  className,
  handleLanguageChange,
  currentLanguage,
}: LanguageSwitcherComponentProps) {
  const { t } = useT("ui", { keyPrefix: "languageSwitcher" });

  return (
    <Select value={currentLanguage} onValueChange={handleLanguageChange}>
      <SelectTrigger className={className}>{t(currentLanguage)}</SelectTrigger>
      <SelectContent>
        {Languages.map((language) => (
          <SelectItem key={language} value={language}>
            {t(language)}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}

function LanguageSwitcherButtonsVariant({
  className,
  handleLanguageChange,
  currentLanguage,
}: LanguageSwitcherComponentProps) {
  const { t } = useT("ui", { keyPrefix: "languageSwitcher" });

  return (
    <div className={cn("flex gap-1", className)}>
      {Languages.map((language) => (
        <Button
          key={language}
          variant={currentLanguage === language ? "default" : "outline"}
          size="sm"
          onClick={() => handleLanguageChange(language)}
          className="min-w-25"
        >
          {t(language)}
        </Button>
      ))}
    </div>
  );
}
