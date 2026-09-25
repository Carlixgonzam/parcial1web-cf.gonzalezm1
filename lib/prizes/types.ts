export type PrizeStatus = "won" | "nominated";

export interface Prize {
  id: string;
  name: string;
  category: string;
  year: number;
  status: PrizeStatus;
}

export interface PrizeWithMovies extends Prize {
  movies: { id: string }[];
}

export type PrizeFormData = {
  name: string;
  category: string;
  year: string;
  status: PrizeStatus;
};
