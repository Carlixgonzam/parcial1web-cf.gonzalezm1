"use client";

import { useEffect, useState } from "react";
import { useTranslation } from "@/hooks/useTranslation";
import { deleteActor, getActors } from "@/lib/actors/api";
import type { Actor } from "@/lib/actors/types";

export function useActors() {
  const { t } = useTranslation();
  const [actors, setActors] = useState<Actor[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getActors()
      .then((data) => setActors(data))
      .catch(() => setError(t("actors.loadError")))
      .finally(() => setLoading(false));
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm(t("actors.confirmDelete"))) return;
    setError(null);
    try {
      await deleteActor(id);
      setActors(actors.filter((actor) => actor.id !== id));
    } catch (err) {
      setError(err instanceof Error ? err.message : t("actors.deleteError"));
    }
  };

  return { actors, loading, error, handleDelete };
}
