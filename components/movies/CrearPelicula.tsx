"use client";

import { Check, Clapperboard } from "lucide-react";
import { Link } from "react-router-dom";
import { PageHeader } from "@/components/PageHeader";
import { ActorFields } from "@/components/actors/ActorFields";
import { MovieFields } from "@/components/movies/MovieFields";
import { TrailerFields } from "@/components/movies/TrailerFields";
import { PrizeFields } from "@/components/prizes/PrizeFields";
import { errorClass, primaryButtonClass } from "@/components/styles";
import { useCrearPelicula } from "@/hooks/useCrearPelicula";
import { useTranslation } from "@/hooks/useTranslation";

const fieldsetClass = "space-y-4";
const legendClass = "mb-4 w-full border-b border-line pb-2 text-xl font-semibold text-fg";

export function CrearPelicula() {
  const { t } = useTranslation();
  const {
    movie,
    trailer,
    actor,
    prize,
    genres,
    directors,
    pasos,
    peliculaId,
    error,
    saving,
    handleMovieChange,
    handleTrailerChange,
    handleActorChange,
    handlePrizeChange,
    handleSubmit,
  } = useCrearPelicula();

  return (
    <section className="max-w-2xl">
      <PageHeader
        icon={Clapperboard}
        title={t("createMovie.title")}
        description={t("createMovie.description")}
      />

      <form className="mt-10 space-y-10" onSubmit={handleSubmit}>
        <fieldset className={fieldsetClass}>
          <legend className={legendClass}>{t("createMovie.movie")}</legend>
          <MovieFields movie={movie} genres={genres} directors={directors} onChange={handleMovieChange} />
        </fieldset>

        <fieldset className={fieldsetClass}>
          <legend className={legendClass}>{t("createMovie.trailer")}</legend>
          <TrailerFields trailer={trailer} onChange={handleTrailerChange} />
        </fieldset>

        <fieldset className={fieldsetClass}>
          <legend className={legendClass}>{t("createMovie.actor")}</legend>
          <ActorFields actor={actor} onChange={handleActorChange} />
        </fieldset>

        <fieldset className={fieldsetClass}>
          <legend className={legendClass}>{t("createMovie.prize")}</legend>
          <PrizeFields prize={prize} onChange={handlePrizeChange} />
        </fieldset>

        <button type="submit" disabled={saving} className={`${primaryButtonClass} w-full py-2.5`}>
          {saving ? t("createMovie.saving") : t("createMovie.submit")}
        </button>
      </form>

      {pasos.length > 0 && (
        <ol className="mt-6 space-y-1.5 rounded-md bg-hover p-4 text-sm text-fg">
          {pasos.map((paso) => (
            <li key={paso} className="flex items-center gap-2">
              <Check size={14} aria-hidden="true" className="shrink-0 text-success" />
              {paso}
            </li>
          ))}
        </ol>
      )}

      {error && (
        <div role="alert" className={`mt-4 ${errorClass}`}>
          {error}
        </div>
      )}

      {peliculaId && (
        <div className="mt-4 rounded-md bg-success-soft px-4 py-3 text-sm text-success">
          {t("createMovie.success")}{" "}
          <Link to={`/movies/${peliculaId}`} className="font-medium underline underline-offset-2">
            {t("createMovie.view")}
          </Link>
        </div>
      )}
    </section>
  );
}
