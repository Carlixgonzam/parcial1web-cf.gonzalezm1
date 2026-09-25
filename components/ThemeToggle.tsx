"use client";

import { Moon, Sun } from "lucide-react";
import type { Theme } from "@/hooks/useTheme";
import { useTranslation } from "@/hooks/useTranslation";

type ThemeToggleProps = {
  theme: Theme;
  onToggle: () => void;
  showLabel?: boolean;
};

export function ThemeToggle({ theme, onToggle, showLabel = false }: ThemeToggleProps) {
  const { t } = useTranslation();
  const label = theme === "dark" ? t("theme.light") : t("theme.dark");
  const Icon = theme === "dark" ? Sun : Moon;

  return (
    <button
      type="button"
      onClick={onToggle}
      aria-label={label}
      title={label}
      className="flex items-center gap-2 rounded-md px-2 py-1.5 text-sm text-muted transition-colors hover:bg-hover hover:text-fg"
    >
      <Icon size={16} aria-hidden="true" />
      {showLabel && <span>{label}</span>}
    </button>
  );
}
