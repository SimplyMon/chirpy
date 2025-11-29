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

async function fetchWikimediaImage(
  scientificName: string
): Promise<string | null> {
  if (imageCache.has(scientificName)) return imageCache.get(scientificName)!;

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

    if (page.original?.source) {
      imageCache.set(scientificName, page.original.source);
      return page.original.source;
    }
  } catch (err) {
    console.warn("Failed to fetch Wikimedia image:", err);
  }

  return null;
}

// Utility for limiting concurrent promises
async function mapWithConcurrency<T, R>(
  arr: T[],
  concurrency: number,
  fn: (item: T) => Promise<R>
): Promise<R[]> {
  const result: R[] = [];
  const executing: Promise<void>[] = [];

  for (const item of arr) {
    const p = fn(item).then((res) => {
      result.push(res);
      return;
    });
    executing.push(p);

    if (executing.length >= concurrency) {
      // Wait for any promise to settle
      await Promise.race(executing);
      // Remove settled promises by filtering out those that are resolved
      // Since Promise doesn't expose settled state, we can remove the first resolved promise
      executing.splice(0, executing.length - concurrency + 1);
    }
  }

  await Promise.all(executing);
  return result;
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

  // Filter once
  if (!cachedBirds) {
    throw new Error("Birds data not loaded");
  }
  const filtered = cachedBirds.filter((b) =>
    searchTerm.trim()
      ? (b.comName ?? "").toLowerCase().includes(searchTerm.toLowerCase())
      : true
  );

  // Sort once
  filtered.sort((a, b) => (a.comName ?? "").localeCompare(b.comName ?? ""));

  const total = filtered.length;
  const pageBirds = filtered.slice((page - 1) * pageSize, page * pageSize);

  // Limit concurrent image fetches to 4 to improve mobile performance
  const birdsWithImages: Bird[] = await mapWithConcurrency(
    pageBirds,
    4,
    async (item) => {
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
    }
  );

  return { birds: birdsWithImages, total };
};
