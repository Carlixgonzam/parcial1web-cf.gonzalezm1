"use client";

import { Clapperboard, Film, Plus, UserPlus, Users } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Link, NavLink } from "react-router-dom";
import { LanguageSelect } from "@/components/LanguageSelect";
import { ThemeToggle } from "@/components/ThemeToggle";
import type { Theme } from "@/hooks/useTheme";
import { useTranslation } from "@/hooks/useTranslation";
import type { MessageKey } from "@/lib/i18n";

type NavItem = {
  to: string;
  label: MessageKey;
  shortLabel: MessageKey;
  icon: LucideIcon;
  end?: boolean;
};

const sections: { title: MessageKey; items: NavItem[] }[] = [
  {
    title: "nav.movies",
    items: [
      { to: "/movies", label: "nav.allMovies", shortLabel: "nav.movies", icon: Film, end: true },
      { to: "/movies/crear", label: "nav.createMovie", shortLabel: "nav.newMovie", icon: Plus },
    ],
  },
  {
    title: "nav.actors",
    items: [
      { to: "/actors", label: "nav.allActors", shortLabel: "nav.actors", icon: Users, end: true },
      { to: "/crear", label: "nav.createActor", shortLabel: "nav.newActor", icon: UserPlus },
    ],
  },
];

const linkClass = ({ isActive }: { isActive: boolean }) =>
  `flex items-center gap-2 whitespace-nowrap rounded-md px-2 py-1.5 text-sm transition-colors ${
    isActive ? "bg-hover font-medium text-fg" : "text-muted hover:bg-hover hover:text-fg"
  }`;

type AppNavProps = {
  theme: Theme;
  onToggleTheme: () => void;
};

function Brand() {
  return (
    <Link to="/movies" className="flex items-center gap-2 rounded-md px-2 py-1.5 font-semibold text-fg hover:bg-hover">
      <span className="flex h-6 w-6 items-center justify-center rounded-md bg-accent text-white">
        <Clapperboard size={14} aria-hidden="true" />
      </span>
      Arte7
    </Link>
  );
}

export function AppSidebar({ theme, onToggleTheme }: AppNavProps) {
  const { t } = useTranslation();

  return (
    <aside className="sticky top-0 hidden h-screen w-60 shrink-0 flex-col border-r border-line bg-sidebar px-2 py-3 md:flex">
      <Brand />
      <nav aria-label={t("nav.main")} className="mt-4 flex flex-col gap-4">
        {sections.map((section) => (
          <div key={section.title}>
            <p className="px-2 pb-1 text-xs font-medium text-subtle">{t(section.title)}</p>
            <ul className="flex flex-col gap-0.5">
              {section.items.map((item) => (
                <li key={item.to}>
                  <NavLink to={item.to} end={item.end} className={linkClass}>
                    <item.icon size={16} aria-hidden="true" />
                    {t(item.label)}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </nav>
      <div className="mt-auto flex flex-col gap-0.5">
        <LanguageSelect />
        <ThemeToggle theme={theme} onToggle={onToggleTheme} showLabel />
      </div>
    </aside>
  );
}

export function MobileNav({ theme, onToggleTheme }: AppNavProps) {
  const { t } = useTranslation();

  return (
    <header className="sticky top-0 z-10 border-b border-line bg-page/95 backdrop-blur md:hidden">
      <div className="flex items-center justify-between px-2 pt-2">
        <Brand />
        <div className="flex items-center gap-1">
          <LanguageSelect />
          <ThemeToggle theme={theme} onToggle={onToggleTheme} />
        </div>
      </div>
      <nav aria-label={t("nav.main")} className="flex gap-1 overflow-x-auto px-2 py-2">
        {sections.flatMap((section) => section.items).map((item) => (
          <NavLink key={item.to} to={item.to} end={item.end} className={linkClass}>
            <item.icon size={16} aria-hidden="true" />
            {t(item.shortLabel)}
          </NavLink>
        ))}
      </nav>
    </header>
  );
}
