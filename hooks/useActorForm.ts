"use client";

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "@/hooks/useTranslation";
import { createActor, getActor, updateActor } from "@/lib/actors/api";
import type { ActorFormData } from "@/lib/actors/types";

const initialForm: ActorFormData = {
  name: "",
  photo: "",
  nationality: "",
  birthDate: "",
  biography: "",
};

export function useActorForm(id?: string) {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [form, setForm] = useState<ActorFormData>(initialForm);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;
    getActor(id)
      .then((actor) =>
        setForm({
          name: actor.name,
          photo: actor.photo,
          nationality: actor.nationality,
          birthDate: actor.birthDate.slice(0, 10),
          biography: actor.biography,
        })
      )
      .catch(() => setError(t("actorForm.loadError")));
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    try {
      if (id) {
        await updateActor(id, form);
      } else {
        await createActor(form);
      }
      navigate("/actors");
    } catch (err) {
      setError(err instanceof Error ? err.message : t("actorForm.saveError"));
    }
  };

  const handleCancel = () => navigate("/actors");

  return { form, error, handleChange, handleSubmit, handleCancel };
}
