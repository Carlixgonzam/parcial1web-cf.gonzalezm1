"use client";

import type { LucideIcon } from "lucide-react";

type PageHeaderProps = {
  icon: LucideIcon;
  title: string;
  description?: string;
  action?: React.ReactNode;
};

export function PageHeader({ icon: Icon, title, description, action }: PageHeaderProps) {
  return (
    <header className="flex flex-wrap items-end justify-between gap-4">
      <div>
        <Icon size={40} strokeWidth={1.5} aria-hidden="true" className="text-muted" />
        <h1 className="mt-3 text-4xl font-bold tracking-tight text-fg">{title}</h1>
        {description && <p className="mt-2 text-[15px] text-muted">{description}</p>}
      </div>
      {action}
    </header>
  );
}
