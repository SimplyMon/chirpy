import type { Bird } from "../types/Bird";

const API_KEY = "bhtro1sfhc8n";
const BASE_URL = "https://api.ebird.org/v2/ref/taxonomy/ebird";

interface EbirdApiBird {
  speciesCode: string;
  comName?: string;
  sciName?: string;
  category?: string;
  order?: string;
  family?: string;
}

let cachedBirds: Bird[] | null = null;

export const fetchBirdsPage = async (
  page: number,
  pageSize: number,
  searchTerm = ""
): Promise<{ birds: Bird[]; total: number }> => {
  if (!cachedBirds) {
    const res = await fetch(`${BASE_URL}?fmt=json`, {
      headers: { "X-eBirdApiToken": API_KEY },
    });
    if (!res.ok) throw new Error("Failed to fetch birds");

    const data: EbirdApiBird[] = await res.json();
    cachedBirds = data.map((item) => ({
      speciesCode: item.speciesCode,
      commonName: item.comName ?? "Unknown",
      scientificName: item.sciName ?? "Unknown",
      category: item.category,
      order: item.order,
      family: item.family,
    }));
  }

  let filtered = cachedBirds;
  if (searchTerm.trim()) {
    filtered = cachedBirds.filter((b) =>
      b.commonName.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }

  const total = filtered.length;
  const start = (page - 1) * pageSize;
  const birds = filtered.slice(start, start + pageSize);

  return { birds, total };
};
