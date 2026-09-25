import { API_URL, getErrorMessage } from "@/lib/api";
import type { Actor, ActorFormData } from "@/lib/actors/types";

const ACTORS_URL = `${API_URL}/actors`;

export async function getActors(): Promise<Actor[]> {
  const res = await fetch(ACTORS_URL);
  if (!res.ok) throw new Error(await getErrorMessage(res));
  return res.json();
}

export async function getActor(id: string): Promise<Actor> {
  const res = await fetch(`${ACTORS_URL}/${id}`);
  if (!res.ok) throw new Error(await getErrorMessage(res));
  return res.json();
}

export async function createActor(actor: ActorFormData): Promise<Actor> {
  const res = await fetch(ACTORS_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(actor),
  });
  if (!res.ok) throw new Error(await getErrorMessage(res));
  return res.json();
}

export async function updateActor(id: string, actor: ActorFormData): Promise<Actor> {
  const res = await fetch(`${ACTORS_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(actor),
  });
  if (!res.ok) throw new Error(await getErrorMessage(res));
  return res.json();
}

export async function deleteActor(id: string): Promise<void> {
  const res = await fetch(`${ACTORS_URL}/${id}`, { method: "DELETE" });
  if (!res.ok) throw new Error(await getErrorMessage(res));
}

export async function addMovieToActor(actorId: string, movieId: string): Promise<void> {
  const res = await fetch(`${ACTORS_URL}/${actorId}/movies/${movieId}`, { method: "POST" });
  if (!res.ok) throw new Error(await getErrorMessage(res));
}
