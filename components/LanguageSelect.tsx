"use client";

import { Languages } from "lucide-react";
import { useTranslation } from "@/hooks/useTranslation";
import { languages, type LanguageCode } from "@/lib/i18n";

export function LanguageSelect() {
  const { language, setLanguage, t } = useTranslation();

  return (
    <label className="flex cursor-pointer items-center gap-2 rounded-md px-2 py-1.5 text-sm text-muted transition-colors hover:bg-hover hover:text-fg">
      <Languages size={16} aria-hidden="true" className="shrink-0" />
      <span className="sr-only">{t("language.label")}</span>
      <select
        value={language}
        onChange={(e) => setLanguage(e.target.value as LanguageCode)}
        className="cursor-pointer bg-transparent text-sm text-fg focus:outline-none"
      >
        {languages.map((option) => (
          <option key={option.code} value={option.code}>
            {option.label}
          </option>
        ))}
      </select>
    </label>
  );
}
