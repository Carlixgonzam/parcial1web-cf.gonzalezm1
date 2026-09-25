"use client";

type TagTone = "gray" | "info" | "success" | "warning";

const toneClass: Record<TagTone, string> = {
  gray: "bg-hover text-muted",
  info: "bg-info-soft text-info",
  success: "bg-success-soft text-success",
  warning: "bg-warning-soft text-warning",
};

type TagProps = {
  tone?: TagTone;
  children: React.ReactNode;
};

export function Tag({ tone = "gray", children }: TagProps) {
  return (
    <span
      className={`inline-flex max-w-full items-center gap-1 rounded px-1.5 py-0.5 text-[13px] font-medium leading-5 ${toneClass[tone]}`}
    >
      {children}
    </span>
  );
}
