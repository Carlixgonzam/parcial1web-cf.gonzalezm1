"use client";

import { Film, Plus, Search } from "lucide-react";
import { Link } from "react-router-dom";
import { PageHeader } from "@/components/PageHeader";
import { MovieCard } from "@/components/movies/MovieCard";
import { errorClass, inputClass, primaryButtonClass } from "@/components/styles";
import { useMovies } from "@/hooks/useMovies";
import { useTranslation } from "@/hooks/useTranslation";

export function MovieList() {
  const { t } = useTranslation();
  const { movies, filteredMovies, prizesByMovie, search, setSearch, loading, error } = useMovies();

  return (
    <section>
      <PageHeader
        icon={Film}
        title={t("movies.title")}
        description={t("movies.description")}
        action={
          <Link to="/movies/crear" className={primaryButtonClass}>
            <Plus size={16} aria-hidden="true" />
            {t("movies.new")}
          </Link>
        }
      />

      <div className="mt-8 flex flex-wrap items-center justify-between gap-3 border-b border-line pb-3">
        <div className="relative w-full sm:max-w-xs">
          <Search
            size={16}
            aria-hidden="true"
            className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-subtle"
          />
          <label htmlFor="movie-search" className="sr-only">
            {t("movies.searchLabel")}
          </label>
          <input
            id="movie-search"
            type="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={t("movies.searchPlaceholder")}
            className={`${inputClass} pl-9`}
          />
        </div>
        {!loading && !error && (
          <p className="text-sm text-muted" aria-live="polite">
            {filteredMovies.length === movies.length
              ? t("movies.count", { count: movies.length })
              : t("movies.filteredCount", { shown: filteredMovies.length, total: movies.length })}
          </p>
        )}
      </div>

      {error && (
        <div role="alert" className={`mt-6 ${errorClass}`}>
          {error}
        </div>
      )}

      {loading && (
        <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4" aria-busy="true">
          {Array.from({ length: 8 }, (_, i) => (
            <div key={i} className="animate-pulse overflow-hidden rounded-lg border border-line">
              <div className="aspect-[3/4] bg-hover" />
              <div className="space-y-2 p-3">
                <div className="h-4 w-3/4 rounded bg-hover" />
                <div className="h-3 w-1/2 rounded bg-hover" />
              </div>
            </div>
          ))}
        </div>
      )}

      {!loading && !error && filteredMovies.length === 0 && (
        <div className="mt-6 flex flex-col items-center rounded-lg border border-dashed border-line py-16 text-center">
          <Film size={32} strokeWidth={1.5} aria-hidden="true" className="text-subtle" />
          <p className="mt-3 text-[15px] font-medium text-fg">
            {search ? t("movies.noResults", { search }) : t("movies.empty")}
          </p>
          {search && (
            <button
              type="button"
              onClick={() => setSearch("")}
              className="mt-2 rounded px-2 py-1 text-sm font-medium text-accent hover:bg-hover"
            >
              {t("movies.clearSearch")}
            </button>
          )}
        </div>
      )}

      {!loading && filteredMovies.length > 0 && (
        <ul className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
          {filteredMovies.map((movie) => (
            <li key={movie.id} className="flex">
              <MovieCard movie={movie} prizes={prizesByMovie[movie.id] ?? []} />
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
