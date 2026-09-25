"use client";

import { useParams } from "react-router-dom";
import { ActorForm } from "@/components/actors/ActorForm";
import { useActorForm } from "@/hooks/useActorForm";
import { useTranslation } from "@/hooks/useTranslation";

export function EditarActor() {
  const { t } = useTranslation();
  const { id } = useParams();
  const { form, error, handleChange, handleSubmit, handleCancel } = useActorForm(id);

  return (
    <ActorForm
      title={t("actorForm.editTitle")}
      submitLabel={t("actorForm.save")}
      form={form}
      error={error}
      onChange={handleChange}
      onSubmit={handleSubmit}
      onCancel={handleCancel}
    />
  );
}
