"use client";

import { useEffect, useState } from "react";
import { useTranslation } from "@/hooks/useTranslation";
import { getMovies } from "@/lib/movies/api";
import type { MovieDetail } from "@/lib/movies/types";
import { getPrizes } from "@/lib/prizes/api";

export function useMovies() {
  const { t } = useTranslation();
  const [movies, setMovies] = useState<MovieDetail[]>([]);
  const [prizesByMovie, setPrizesByMovie] = useState<Record<string, string[]>>({});
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    Promise.all([getMovies(), getPrizes()])
      .then(([moviesData, prizesData]) => {
        const map: Record<string, string[]> = {};
        prizesData.forEach((prize) => {
          prize.movies.forEach((movie) => {
            map[movie.id] = [...(map[movie.id] ?? []), prize.name];
          });
        });
        setMovies(moviesData);
        setPrizesByMovie(map);
      })
      .catch(() => setError(t("movies.loadError")))
      .finally(() => setLoading(false));
  }, []);

  const query = search.trim().toLowerCase();
  const filteredMovies = query
    ? movies.filter((movie) => movie.title.toLowerCase().includes(query))
    : movies;

  return { movies, filteredMovies, prizesByMovie, search, setSearch, loading, error };
}
