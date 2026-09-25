"use client";

import { User } from "lucide-react";
import { PageHeader } from "@/components/PageHeader";
import { ActorFields } from "@/components/actors/ActorFields";
import { errorClass, primaryButtonClass, secondaryButtonClass } from "@/components/styles";
import { useTranslation } from "@/hooks/useTranslation";
import type { ActorFormData } from "@/lib/actors/types";

type ActorFormProps = {
  title: string;
  submitLabel: string;
  form: ActorFormData;
  error: string | null;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  onCancel: () => void;
};

export function ActorForm({ title, submitLabel, form, error, onChange, onSubmit, onCancel }: ActorFormProps) {
  const { t } = useTranslation();

  return (
    <section className="max-w-xl">
      <PageHeader icon={User} title={title} />

      {error && (
        <div role="alert" className={`mt-6 ${errorClass}`}>
          {error}
        </div>
      )}

      <form className="mt-8 space-y-4" onSubmit={onSubmit}>
        <ActorFields actor={form} onChange={onChange} />

        <div className="flex gap-2 pt-2">
          <button type="submit" className={primaryButtonClass}>
            {submitLabel}
          </button>
          <button type="button" onClick={onCancel} className={secondaryButtonClass}>
            {t("actorForm.cancel")}
          </button>
        </div>
      </form>
    </section>
  );
}
