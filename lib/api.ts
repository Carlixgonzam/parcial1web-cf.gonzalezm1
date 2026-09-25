export const API_URL = "http://localhost:3000/api/v1";

export async function getErrorMessage(res: Response): Promise<string> {
  try {
    const data = await res.json();
    return Array.isArray(data.message) ? data.message.join(", ") : data.message;
  } catch {
    return `Error ${res.status}`;
  }
}
