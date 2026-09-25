"use client";

import { createContext, useEffect, useState } from "react";
import {
  defaultLanguage,
  getLanguage,
  isLanguageCode,
  translate,
  type LanguageCode,
  type MessageKey,
  type TranslationParams,
} from "@/lib/i18n";

type LanguageContextValue = {
  language: LanguageCode;
  locale: string;
  setLanguage: (code: LanguageCode) => void;
  t: (key: MessageKey, params?: TranslationParams) => string;
};

export const LanguageContext = createContext<LanguageContextValue | null>(null);

function getInitialLanguage(): LanguageCode {
  const saved = localStorage.getItem("language");
  if (isLanguageCode(saved)) return saved;
  const browserLanguage = navigator.languages.map((language) => language.slice(0, 2)).find(isLanguageCode);
  return browserLanguage ?? defaultLanguage;
}

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<LanguageCode>(getInitialLanguage);
  const { locale, messages } = getLanguage(language);

  useEffect(() => {
    document.documentElement.lang = language;
    localStorage.setItem("language", language);
  }, [language]);

  const t = (key: MessageKey, params?: TranslationParams) => translate(messages, key, params);

  return (
    <LanguageContext.Provider value={{ language, locale, setLanguage, t }}>{children}</LanguageContext.Provider>
  );
}
