import type { Actor } from "@/lib/actors/types";

export interface Movie {
  id: string;
  title: string;
  poster: string;
  duration: number;
  country: string;
  releaseDate: string;
  popularity: number;
}

export interface Genre {
  id: string;
  type: string;
}

export interface Director {
  id: string;
  name: string;
  photo: string;
  nationality: string;
}

export interface YoutubeTrailer {
  id: string;
  name: string;
  url: string;
  duration: number;
  channel: string;
}

export interface Platform {
  id: string;
  name: string;
  url: string;
}

export interface MovieDetail extends Movie {
  director: Director | null;
  genre: Genre | null;
  actors: Actor[];
  platforms: Platform[];
  youtubeTrailer: YoutubeTrailer | null;
}

export type MovieFormData = {
  title: string;
  poster: string;
  duration: string;
  country: string;
  releaseDate: string;
  popularity: string;
  genreId: string;
  directorId: string;
};

export type TrailerFormData = {
  name: string;
  url: string;
  duration: string;
  channel: string;
};

export type NewMovie = Omit<Movie, "id"> & {
  genre: { id: string };
  director: { id: string };
  youtubeTrailer: { id: string };
};
