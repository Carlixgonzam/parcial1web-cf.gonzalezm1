import { API_URL, getErrorMessage } from "@/lib/api";
import type { Prize, PrizeWithMovies } from "@/lib/prizes/types";

export async function getPrizes(): Promise<PrizeWithMovies[]> {
  const res = await fetch(`${API_URL}/prizes`);
  if (!res.ok) throw new Error(await getErrorMessage(res));
  return res.json();
}

export async function createPrize(prize: Omit<Prize, "id">): Promise<Prize> {
  const res = await fetch(`${API_URL}/prizes`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(prize),
  });
  if (!res.ok) throw new Error(await getErrorMessage(res));
  return res.json();
}
