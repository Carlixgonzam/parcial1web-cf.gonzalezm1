"use client";

import { useContext } from "react";
import { LanguageContext } from "@/components/LanguageProvider";

export function useTranslation() {
  const context = useContext(LanguageContext);
  if (!context) throw new Error("useTranslation debe usarse dentro de LanguageProvider");
  return context;
}
