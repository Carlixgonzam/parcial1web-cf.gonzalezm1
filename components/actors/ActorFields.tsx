"use client";

import { FormField } from "@/components/FormField";
import { inputClass, labelClass } from "@/components/styles";
import { useTranslation } from "@/hooks/useTranslation";
import type { ActorFormData } from "@/lib/actors/types";

type ActorFieldsProps = {
  actor: ActorFormData;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
};

export function ActorFields({ actor, onChange }: ActorFieldsProps) {
  const { t } = useTranslation();

  return (
    <>
      <FormField id="actor-name" name="name" label={t("fields.name")} value={actor.name} onChange={onChange} />
      <FormField
        id="actor-photo"
        name="photo"
        label={t("fields.photo")}
        type="url"
        placeholder="https://..."
        value={actor.photo}
        onChange={onChange}
      />
      <FormField
        id="actor-nationality"
        name="nationality"
        label={t("fields.nationality")}
        value={actor.nationality}
        onChange={onChange}
      />
      <FormField
        id="actor-birthDate"
        name="birthDate"
        label={t("fields.birthDate")}
        type="date"
        value={actor.birthDate}
        onChange={onChange}
      />
      <div>
        <label htmlFor="actor-biography" className={labelClass}>
          {t("fields.biography")}
        </label>
        <textarea
          id="actor-biography"
          name="biography"
          value={actor.biography}
          onChange={onChange}
          rows={4}
          required
          className={inputClass}
        />
      </div>
    </>
  );
}
