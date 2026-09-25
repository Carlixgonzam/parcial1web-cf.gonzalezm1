"use client";

import { FormField } from "@/components/FormField";
import { inputClass, labelClass } from "@/components/styles";
import { useTranslation } from "@/hooks/useTranslation";
import type { Director, Genre, MovieFormData } from "@/lib/movies/types";

type MovieFieldsProps = {
  movie: MovieFormData;
  genres: Genre[];
  directors: Director[];
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
};

export function MovieFields({ movie, genres, directors, onChange }: MovieFieldsProps) {
  const { t } = useTranslation();

  return (
    <>
      <FormField id="movie-title" name="title" label={t("fields.title")} value={movie.title} onChange={onChange} />
      <FormField
        id="movie-poster"
        name="poster"
        label={t("fields.poster")}
        type="url"
        placeholder="https://..."
        value={movie.poster}
        onChange={onChange}
      />
      <div className="grid gap-4 sm:grid-cols-2">
        <FormField
          id="movie-duration"
          name="duration"
          label={t("fields.durationMinutes")}
          type="number"
          min={1}
          value={movie.duration}
          onChange={onChange}
        />
        <FormField
          id="movie-popularity"
          name="popularity"
          label={t("fields.popularity")}
          type="number"
          min={0}
          value={movie.popularity}
          onChange={onChange}
        />
        <FormField id="movie-country" name="country" label={t("fields.country")} value={movie.country} onChange={onChange} />
        <FormField
          id="movie-releaseDate"
          name="releaseDate"
          label={t("fields.releaseDate")}
          type="date"
          value={movie.releaseDate}
          onChange={onChange}
        />
      </div>

      <div>
        <label htmlFor="movie-genreId" className={labelClass}>
          {t("fields.genre")}
        </label>
        <select id="movie-genreId" name="genreId" value={movie.genreId} onChange={onChange} required className={inputClass}>
          <option value="">{t("fields.selectGenre")}</option>
          {genres.map((genre) => (
            <option key={genre.id} value={genre.id}>
              {genre.type}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label htmlFor="movie-directorId" className={labelClass}>
          {t("fields.director")}
        </label>
        <select
          id="movie-directorId"
          name="directorId"
          value={movie.directorId}
          onChange={onChange}
          required
          className={inputClass}
        >
          <option value="">{t("fields.selectDirector")}</option>
          {directors.map((director) => (
            <option key={director.id} value={director.id}>
              {director.name}
            </option>
          ))}
        </select>
      </div>
    </>
  );
}
