import { API_URL, getErrorMessage } from "@/lib/api";
import type { Director, Genre, Movie, MovieDetail, NewMovie, YoutubeTrailer } from "@/lib/movies/types";
import type { Prize } from "@/lib/prizes/types";

export async function getMovies(): Promise<MovieDetail[]> {
  const res = await fetch(`${API_URL}/movies`);
  if (!res.ok) throw new Error(await getErrorMessage(res));
  return res.json();
}

export async function getMovie(id: string): Promise<MovieDetail> {
  const res = await fetch(`${API_URL}/movies/${id}`);
  if (!res.ok) throw new Error(await getErrorMessage(res));
  return res.json();
}

export async function getMoviePrizes(movieId: string): Promise<Prize[]> {
  const res = await fetch(`${API_URL}/movies/${movieId}/prizes`);
  if (!res.ok) throw new Error(await getErrorMessage(res));
  return res.json();
}

export async function getGenres(): Promise<Genre[]> {
  const res = await fetch(`${API_URL}/genres`);
  if (!res.ok) throw new Error(await getErrorMessage(res));
  return res.json();
}

export async function getDirectors(): Promise<Director[]> {
  const res = await fetch(`${API_URL}/directors`);
  if (!res.ok) throw new Error(await getErrorMessage(res));
  return res.json();
}

export async function createYoutubeTrailer(trailer: Omit<YoutubeTrailer, "id">): Promise<YoutubeTrailer> {
  const res = await fetch(`${API_URL}/youtube-trailers`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(trailer),
  });
  if (!res.ok) throw new Error(await getErrorMessage(res));
  return res.json();
}

export async function createMovie(movie: NewMovie): Promise<Movie> {
  const res = await fetch(`${API_URL}/movies`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(movie),
  });
  if (!res.ok) throw new Error(await getErrorMessage(res));
  return res.json();
}

export async function addPrizeToMovie(movieId: string, prizeId: string): Promise<void> {
  const res = await fetch(`${API_URL}/movies/${movieId}/prizes/${prizeId}`, { method: "POST" });
  if (!res.ok) throw new Error(await getErrorMessage(res));
}
