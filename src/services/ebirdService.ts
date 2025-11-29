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
const imageCache = new Map<string, string>();

/**
 * Fetch Wikimedia image for a bird, with caching.
 */
export async function fetchWikimediaImage(
  scientificName: string
): Promise<string | null> {
  if (imageCache.has(scientificName)) return imageCache.get(scientificName)!;

  try {
    const searchRes = await fetch(
      `https://en.wikipedia.org/w/api.php?origin=*&action=query&format=json&list=search&srsearch=${encodeURIComponent(
        scientificName
      )}&srlimit=1`
    );
    const searchData = await searchRes.json();
    const pageTitle = searchData.query?.search?.[0]?.title;
    if (!pageTitle) return null;

    const pageRes = await fetch(
      `https://en.wikipedia.org/w/api.php?origin=*&action=query&format=json&prop=pageimages&titles=${encodeURIComponent(
        pageTitle
      )}&piprop=original`
    );
    const pageData = await pageRes.json();
    const page = Object.values(pageData.query.pages)[0] as WikimediaPage;

    if (page.original?.source) {
      imageCache.set(scientificName, page.original.source);
      return page.original.source;
    }
  } catch (err) {
    console.warn("Failed to fetch Wikimedia image:", err);
  }

  return null;
}

/**
 * Fetch bird metadata for a page, without images.
 */
export async function fetchBirdsPage(
  page: number,
  pageSize: number,
  searchTerm = ""
): Promise<{ birds: Bird[]; total: number }> {
  if (!cachedBirds) {
    const res = await fetch(`${BASE_URL}?fmt=json`, {
      headers: { "X-eBirdApiToken": API_KEY },
    });
    if (!res.ok) throw new Error("Failed to fetch birds");
    cachedBirds = await res.json();
  }

  const filtered = cachedBirds!.filter((b) =>
    searchTerm.trim()
      ? (b.comName ?? "").toLowerCase().includes(searchTerm.toLowerCase())
      : true
  );

  filtered.sort((a, b) => (a.comName ?? "").localeCompare(b.comName ?? ""));

  const total = filtered.length;
  const pageBirds = filtered.slice((page - 1) * pageSize, page * pageSize);

  // Return without images; imageUrl will be loaded lazily in React
  const birdsWithoutImages: Bird[] = pageBirds.map((b) => ({
    speciesCode: b.speciesCode,
    commonName: b.comName ?? "Unknown",
    scientificName: b.sciName ?? "Unknown",
    category: b.category,
    order: b.order,
    family: b.family,
    imageUrl: undefined,
  }));

  return { birds: birdsWithoutImages, total };
}
