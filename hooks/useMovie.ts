"use client";

import { useEffect, useState } from "react";
import { useTranslation } from "@/hooks/useTranslation";
import { getMovie, getMoviePrizes } from "@/lib/movies/api";
import type { MovieDetail } from "@/lib/movies/types";
import type { Prize } from "@/lib/prizes/types";

export function useMovie(id?: string) {
  const { t } = useTranslation();
  const [movie, setMovie] = useState<MovieDetail | null>(null);
  const [prizes, setPrizes] = useState<Prize[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;
    Promise.all([getMovie(id), getMoviePrizes(id)])
      .then(([movieData, prizesData]) => {
        setMovie(movieData);
        setPrizes(prizesData);
      })
      .catch(() => setError(t("movie.notFound")))
      .finally(() => setLoading(false));
  }, [id]);

  return { movie, prizes, loading, error };
}
