"use client";

import { FormField } from "@/components/FormField";
import { useTranslation } from "@/hooks/useTranslation";
import type { TrailerFormData } from "@/lib/movies/types";

type TrailerFieldsProps = {
  trailer: TrailerFormData;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export function TrailerFields({ trailer, onChange }: TrailerFieldsProps) {
  const { t } = useTranslation();

  return (
    <>
      <FormField id="trailer-name" name="name" label={t("fields.name")} value={trailer.name} onChange={onChange} />
      <FormField
        id="trailer-url"
        name="url"
        label={t("fields.url")}
        type="url"
        placeholder="https://youtube.com/..."
        value={trailer.url}
        onChange={onChange}
      />
      <div className="grid gap-4 sm:grid-cols-2">
        <FormField
          id="trailer-duration"
          name="duration"
          label={t("fields.durationMinutes")}
          type="number"
          min={1}
          value={trailer.duration}
          onChange={onChange}
        />
        <FormField id="trailer-channel" name="channel" label={t("fields.channel")} value={trailer.channel} onChange={onChange} />
      </div>
    </>
  );
}
