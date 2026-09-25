import { en } from "@/lib/i18n/messages/en";
import { es } from "@/lib/i18n/messages/es";
import type { MessageKey, Messages } from "@/lib/i18n/messages/es";
import { pt } from "@/lib/i18n/messages/pt";

export type { MessageKey, Messages };

export type TranslationParams = Record<string, string | number>;

export const languages = [
  { code: "es", label: "Español", locale: "es-CO", messages: es },
  { code: "en", label: "English", locale: "en-US", messages: en },
  { code: "pt", label: "Português", locale: "pt-BR", messages: pt },
] as const;

export type LanguageCode = (typeof languages)[number]["code"];

export const defaultLanguage: LanguageCode = "es";

export function isLanguageCode(value: string | null): value is LanguageCode {
  return languages.some((language) => language.code === value);
}

export function getLanguage(code: LanguageCode) {
  return languages.find((language) => language.code === code) ?? languages[0];
}

export function translate(messages: Messages, key: MessageKey, params: TranslationParams = {}): string {
  const singularKey = `${key}_one` as MessageKey;
  const text = params.count === 1 && singularKey in messages ? messages[singularKey] : messages[key];
  return text.replace(/\{(\w+)\}/g, (match, name: string) => (name in params ? String(params[name]) : match));
}
