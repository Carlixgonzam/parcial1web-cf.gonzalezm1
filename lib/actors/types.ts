export interface Actor {
  id: string;
  name: string;
  photo: string;
  nationality: string;
  birthDate: string;
  biography: string;
  movies?: { id: string; title: string }[];
}

export type ActorFormData = Omit<Actor, "id" | "movies">;
