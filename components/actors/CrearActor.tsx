"use client";

import { ActorForm } from "@/components/actors/ActorForm";
import { useActorForm } from "@/hooks/useActorForm";
import { useTranslation } from "@/hooks/useTranslation";

export function CrearActor() {
  const { t } = useTranslation();
  const { form, error, handleChange, handleSubmit, handleCancel } = useActorForm();

  return (
    <ActorForm
      title={t("actorForm.createTitle")}
      submitLabel={t("actorForm.create")}
      form={form}
      error={error}
      onChange={handleChange}
      onSubmit={handleSubmit}
      onCancel={handleCancel}
    />
  );
}
