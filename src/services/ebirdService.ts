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

interface WikimediaPage {
  pageid: number;
  ns: number;
  title: string;
  original?: {
    source: string;
    width: number;
    height: number;
  };
}

let cachedBirds: EbirdApiBird[] | null = null;

const imageCache: Record<string, string> = {};

async function fetchWikimediaImage(
  scientificName: string
): Promise<string | null> {
  if (imageCache[scientificName]) {
    return imageCache[scientificName];
  }

  const search = encodeURIComponent(scientificName);

  try {
    const searchRes = await fetch(
      `https://en.wikipedia.org/w/api.php?origin=*&action=query&format=json&list=search&srsearch=${search}&srlimit=1`
    );
    const searchData = await searchRes.json();
    const pages = searchData.query?.search;
    if (!pages?.length) return null;

    const pageTitle = pages[0].title;

    const pageRes = await fetch(
      `https://en.wikipedia.org/w/api.php?origin=*&action=query&format=json&prop=pageimages&titles=${encodeURIComponent(
        pageTitle
      )}&piprop=original`
    );
    const pageData = await pageRes.json();
    const page = Object.values(pageData.query.pages)[0] as WikimediaPage;

    if (page.original && page.original.source) {
      imageCache[scientificName] = page.original.source;
      return page.original.source;
    }
  } catch (err) {
    console.warn("Failed to fetch Wikimedia image:", err);
  }

  return null;
}

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

    cachedBirds = await res.json();
  }

  let filtered = cachedBirds!;
  if (searchTerm.trim()) {
    filtered = cachedBirds!.filter((b) =>
      (b.comName ?? "").toLowerCase().includes(searchTerm.toLowerCase())
    );
  }

  const total = filtered.length;
  const start = (page - 1) * pageSize;
  const pageBirds = filtered.slice(start, start + pageSize);

  const birdsWithImages: Bird[] = await Promise.all(
    pageBirds.map(async (item) => {
      const sciName = item.sciName ?? item.comName ?? "Bird";
      const imageUrl = await fetchWikimediaImage(sciName);
      return {
        speciesCode: item.speciesCode,
        commonName: item.comName ?? "Unknown",
        scientificName: item.sciName ?? "Unknown",
        category: item.category,
        order: item.order,
        family: item.family,
        imageUrl:
          imageUrl ??
          `https://via.placeholder.com/400x300?text=${encodeURIComponent(
            item.comName ?? "Bird"
          )}`,
      };
    })
  );

  return { birds: birdsWithImages, total };
};
