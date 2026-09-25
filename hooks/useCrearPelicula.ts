"use client";

import { useEffect, useState } from "react";
import { useTranslation } from "@/hooks/useTranslation";
import { addMovieToActor, createActor } from "@/lib/actors/api";
import type { ActorFormData } from "@/lib/actors/types";
import { addPrizeToMovie, createMovie, createYoutubeTrailer, getDirectors, getGenres } from "@/lib/movies/api";
import type { Director, Genre, MovieFormData, TrailerFormData } from "@/lib/movies/types";
import { createPrize } from "@/lib/prizes/api";
import type { PrizeFormData } from "@/lib/prizes/types";

const initialMovie: MovieFormData = {
  title: "",
  poster: "",
  duration: "",
  country: "",
  releaseDate: "",
  popularity: "",
  genreId: "",
  directorId: "",
};

const initialTrailer: TrailerFormData = { name: "", url: "", duration: "", channel: "" };

const initialActor: ActorFormData = { name: "", photo: "", nationality: "", birthDate: "", biography: "" };

const initialPrize: PrizeFormData = { name: "", category: "", year: "", status: "won" };

type FieldEvent = React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>;

export function useCrearPelicula() {
  const { t } = useTranslation();
  const [movie, setMovie] = useState<MovieFormData>(initialMovie);
  const [trailer, setTrailer] = useState<TrailerFormData>(initialTrailer);
  const [actor, setActor] = useState<ActorFormData>(initialActor);
  const [prize, setPrize] = useState<PrizeFormData>(initialPrize);

  const [genres, setGenres] = useState<Genre[]>([]);
  const [directors, setDirectors] = useState<Director[]>([]);

  const [pasos, setPasos] = useState<string[]>([]);
  const [peliculaId, setPeliculaId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    getGenres()
      .then((data) => setGenres(data))
      .catch(() => setError(t("createMovie.genresError")));
    getDirectors()
      .then((data) => setDirectors(data))
      .catch(() => setError(t("createMovie.directorsError")));
  }, []);

  const handleMovieChange = (e: FieldEvent) => setMovie({ ...movie, [e.target.name]: e.target.value });
  const handleTrailerChange = (e: FieldEvent) => setTrailer({ ...trailer, [e.target.name]: e.target.value });
  const handleActorChange = (e: FieldEvent) => setActor({ ...actor, [e.target.name]: e.target.value });
  const handlePrizeChange = (e: FieldEvent) => setPrize({ ...prize, [e.target.name]: e.target.value });

  const agregarPaso = (paso: string) => setPasos((prev) => [...prev, paso]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setPasos([]);
    setPeliculaId(null);
    setSaving(true);
    try {
      const nuevoTrailer = await createYoutubeTrailer({
        name: trailer.name,
        url: trailer.url,
        duration: Number(trailer.duration),
        channel: trailer.channel,
      });
      agregarPaso(t("createMovie.step.trailer", { name: nuevoTrailer.name }));

      const nuevaPelicula = await createMovie({
        title: movie.title,
        poster: movie.poster,
        duration: Number(movie.duration),
        country: movie.country,
        releaseDate: movie.releaseDate,
        popularity: Number(movie.popularity),
        genre: { id: movie.genreId },
        director: { id: movie.directorId },
        youtubeTrailer: { id: nuevoTrailer.id },
      });
      agregarPaso(t("createMovie.step.movie", { title: nuevaPelicula.title }));

      const nuevoActor = await createActor(actor);
      agregarPaso(t("createMovie.step.actor", { name: nuevoActor.name }));

      await addMovieToActor(nuevoActor.id, nuevaPelicula.id);
      agregarPaso(t("createMovie.step.actorMovie", { name: nuevoActor.name }));

      const nuevoPremio = await createPrize({
        name: prize.name,
        category: prize.category,
        year: Number(prize.year),
        status: prize.status,
      });
      agregarPaso(t("createMovie.step.prize", { name: nuevoPremio.name }));

      await addPrizeToMovie(nuevaPelicula.id, nuevoPremio.id);
      agregarPaso(t("createMovie.step.moviePrize", { title: nuevaPelicula.title }));
      setPeliculaId(nuevaPelicula.id);

      setMovie(initialMovie);
      setTrailer(initialTrailer);
      setActor(initialActor);
      setPrize(initialPrize);
    } catch (err) {
      setError(err instanceof Error ? err.message : t("createMovie.error"));
    } finally {
      setSaving(false);
    }
  };

  return {
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
  };
}
