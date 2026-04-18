import type { Bird, BirdDetails, ConservationStatus } from "../types/Bird";

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
const detailsCache: Record<string, BirdDetails> = {};

const TAXONOMY_STORAGE_KEY = "chirpy:ebirdTaxonomy:v2";
const IMAGE_STORAGE_KEY = "chirpy:images:v1";

const safeStorage = {
  get<T>(key: string): T | null {
    try {
      const raw = localStorage.getItem(key);
      return raw ? (JSON.parse(raw) as T) : null;
    } catch {
      return null;
    }
  },
  set(key: string, value: unknown) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch {
      // quota/disabled — ignore
    }
  },
};

const persistedImages =
  safeStorage.get<Record<string, string>>(IMAGE_STORAGE_KEY);
if (persistedImages) Object.assign(imageCache, persistedImages);

try {
  localStorage.removeItem("chirpy:audio:v1");
  localStorage.removeItem("chirpy:audio:v2");
} catch {
  // ignore
}

export async function fetchWikimediaImage(
  scientificName: string,
): Promise<string | null> {
  if (scientificName in imageCache) return imageCache[scientificName] ?? null;

  const search = encodeURIComponent(scientificName);
  try {
    const res = await fetch(
      `https://en.wikipedia.org/w/api.php?origin=*&action=query&format=json&generator=search&gsrsearch=${search}&gsrlimit=1&prop=pageimages&piprop=original`,
    );
    const data = await res.json();
    const pages = data.query?.pages;
    if (!pages) return null;

    const page = Object.values(pages)[0] as WikimediaPage;
    if (page?.original?.source) {
      imageCache[scientificName] = page.original.source;
      safeStorage.set(IMAGE_STORAGE_KEY, imageCache);
      return page.original.source;
    }
  } catch (err) {
    console.warn("Failed to fetch Wikimedia image:", err);
  }

  return null;
}

const IUCN_CODE_MAP: Record<string, ConservationStatus> = {
  Q211005: "LC",
  Q719675: "NT",
  Q278113: "VU",
  Q11394: "EN",
  Q219127: "CR",
  Q239509: "EW",
  Q237350: "EX",
  Q3245512: "DD",
};

interface WikidataEntity {
  claims?: Record<
    string,
    Array<{ mainsnak?: { datavalue?: { value?: unknown } } }>
  >;
  sitelinks?: Record<string, { url?: string }>;
}

function extractQuantity(
  entity: WikidataEntity,
  property: string,
  unit: string,
): string | null {
  const claim = entity.claims?.[property]?.[0]?.mainsnak?.datavalue?.value as
    | { amount?: string }
    | undefined;
  if (!claim?.amount) return null;
  const num = parseFloat(claim.amount);
  if (Number.isNaN(num)) return null;
  return `${num} ${unit}`;
}

async function fetchWikidataEntity(
  scientificName: string,
): Promise<WikidataEntity | null> {
  try {
    const searchRes = await fetch(
      `https://www.wikidata.org/w/api.php?action=wbsearchentities&search=${encodeURIComponent(
        scientificName,
      )}&language=en&format=json&origin=*&limit=1`,
    );
    const searchJson = await searchRes.json();
    const entityId = searchJson.search?.[0]?.id;
    if (!entityId) return null;

    const entityRes = await fetch(
      `https://www.wikidata.org/wiki/Special:EntityData/${entityId}.json`,
    );
    if (!entityRes.ok) return null;
    const entityJson = await entityRes.json();
    return entityJson.entities?.[entityId] ?? null;
  } catch {
    return null;
  }
}

function extractDiet(summary: string): string | null {
  const sentence = summary
    .split(/\.\s+/)
    .find((s) => /(feed|feeds|diet|eats|preys|forages|consume)/i.test(s));
  return sentence ? sentence.trim() + "." : null;
}

function extractHabitat(summary: string): string | null {
  const match = summary.match(
    /(habitat|lives in|found in|native to|inhabits)[^.]+/i,
  );
  return match ? match[0] + "." : null;
}

function extractRegion(summary: string): string | null {
  const match = summary.match(
    /(Africa|Asia|Europe|North America|South America|Australia|Oceania|Antarctica|worldwide|cosmopolitan|tropics|temperate)/i,
  );
  return match ? match[0] : null;
}

function extractFunFact(summary: string): string | null {
  const sentences = summary
    .split(/\.\s+/)
    .map((s) => s.trim())
    .filter((s) => s.length > 60);

  const generic = [
    "it is a species",
    "this species is",
    "it belongs to",
    "the family",
    "the genus",
  ];
  const interesting = [
    "migrates",
    "nests",
    "feeds",
    "calls",
    "sings",
    "dances",
    "colorful",
    "rare",
    "unique",
    "remarkable",
    "lifespan",
    "speed",
    "fastest",
    "largest",
    "smallest",
    "only",
  ];

  const meaningful = sentences.filter(
    (s) => !generic.some((g) => s.toLowerCase().includes(g)),
  );
  const quirky = meaningful.find((s) =>
    interesting.some((k) => s.toLowerCase().includes(k)),
  );
  const chosen = quirky ?? meaningful[0];
  return chosen ? chosen + "." : null;
}

export async function fetchBirdDetails(
  scientificName: string,
): Promise<BirdDetails> {
  if (detailsCache[scientificName]) return detailsCache[scientificName];

  const empty: BirdDetails = {
    summary: null,
    habitat: null,
    region: null,
    diet: null,
    funFact: null,
    conservation: "UNKNOWN",
    mass: null,
    length: null,
    wikipediaUrl: null,
  };

  try {
    const [summaryRes, entity] = await Promise.all([
      fetch(
        `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(
          scientificName,
        )}`,
      ).then((r) => (r.ok ? r.json() : null)),
      fetchWikidataEntity(scientificName),
    ]);

    const extract: string = summaryRes?.extract ?? "";
    const wikipediaUrl: string | null =
      summaryRes?.content_urls?.desktop?.page ?? null;

    let conservation: ConservationStatus = "UNKNOWN";
    let mass: string | null = null;
    let length: string | null = null;

    if (entity) {
      const statusId = entity.claims?.P141?.[0]?.mainsnak?.datavalue?.value as
        | { id?: string }
        | undefined;
      if (statusId?.id && IUCN_CODE_MAP[statusId.id]) {
        conservation = IUCN_CODE_MAP[statusId.id];
      }
      mass = extractQuantity(entity, "P2067", "g");
      length = extractQuantity(entity, "P2043", "cm");
    }

    const details: BirdDetails = {
      summary: extract || null,
      habitat: extractHabitat(extract),
      region: extractRegion(extract),
      diet: extractDiet(extract),
      funFact: extractFunFact(extract),
      conservation,
      mass,
      length,
      wikipediaUrl,
    };

    detailsCache[scientificName] = details;
    return details;
  } catch (err) {
    console.warn("Failed to fetch bird details:", err);
    return empty;
  }
}

function toBird(item: EbirdApiBird): Bird {
  return {
    speciesCode: item.speciesCode,
    commonName: item.comName ?? "Unknown",
    scientificName: item.sciName ?? "Unknown",
    category: item.category,
    order: item.order,
    family: item.family,
    imageUrl: undefined,
  };
}

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

function parseCsvLine(line: string): string[] {
  const fields: string[] = [];
  let field = "";
  let inQuotes = false;
  for (let i = 0; i < line.length; i++) {
    const c = line[i];
    if (c === '"') {
      if (inQuotes && line[i + 1] === '"') {
        field += '"';
        i++;
      } else {
        inQuotes = !inQuotes;
      }
    } else if (c === "," && !inQuotes) {
      fields.push(field);
      field = "";
    } else {
      field += c;
    }
  }
  fields.push(field);
  return fields;
}

function parseTaxonomyCsv(csv: string): EbirdApiBird[] {
  const lines = csv.split(/\r?\n/);
  if (lines.length < 2) return [];
  const header = parseCsvLine(lines[0]);
  const col = (name: string) => header.indexOf(name);
  const iSci = col("SCIENTIFIC_NAME");
  const iCom = col("COMMON_NAME");
  const iCode = col("SPECIES_CODE");
  const iCat = col("CATEGORY");
  const iOrd = col("ORDER");
  const iFam = col("FAMILY_COM_NAME");

  const out: EbirdApiBird[] = [];
  for (let i = 1; i < lines.length; i++) {
    if (!lines[i]) continue;
    const f = parseCsvLine(lines[i]);
    if (!f[iCode]) continue;
    out.push({
      speciesCode: f[iCode],
      sciName: f[iSci] || undefined,
      comName: f[iCom] || undefined,
      category: f[iCat] || undefined,
      order: f[iOrd] || undefined,
      family: f[iFam] || undefined,
    });
  }
  return out;
}

async function fetchTaxonomyWithRetry(
  maxAttempts = 4,
): Promise<EbirdApiBird[]> {
  let lastErr: unknown;
  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    try {
      const res = await fetch(`${BASE_URL}?fmt=csv&cat=species&locale=en`, {
        headers: { "X-eBirdApiToken": API_KEY },
      });
      if (!res.ok) throw new Error(`eBird responded ${res.status}`);
      const csv = await res.text();
      const parsed = parseTaxonomyCsv(csv);
      if (parsed.length === 0) throw new Error("empty taxonomy");
      return parsed;
    } catch (err) {
      lastErr = err;
      if (attempt < maxAttempts) await sleep(500 * attempt);
    }
  }
  throw new Error(
    `Could not reach eBird after ${maxAttempts} attempts: ${
      lastErr instanceof Error ? lastErr.message : "unknown error"
    }`,
  );
}

let taxonomyPromise: Promise<EbirdApiBird[]> | null = null;
let sortedBirds: EbirdApiBird[] | null = null;
let topFamilies: string[] | null = null;

function buildIndexes(list: EbirdApiBird[]) {
  sortedBirds = [...list].sort((a, b) =>
    (a.comName ?? "").localeCompare(b.comName ?? ""),
  );
  const counts = new Map<string, number>();
  for (const b of list) {
    if (!b.family) continue;
    counts.set(b.family, (counts.get(b.family) ?? 0) + 1);
  }
  topFamilies = Array.from(counts.entries())
    .sort((a, b) => b[1] - a[1])
    .slice(0, 12)
    .map(([family]) => family);
}

async function loadTaxonomy(): Promise<EbirdApiBird[]> {
  if (cachedBirds) return cachedBirds;
  if (taxonomyPromise) return taxonomyPromise;

  const persisted = safeStorage.get<EbirdApiBird[]>(TAXONOMY_STORAGE_KEY);
  if (persisted && persisted.length > 0) {
    cachedBirds = persisted;
    buildIndexes(persisted);
    return cachedBirds;
  }

  taxonomyPromise = fetchTaxonomyWithRetry().then((fetched) => {
    cachedBirds = fetched;
    safeStorage.set(TAXONOMY_STORAGE_KEY, fetched);
    buildIndexes(fetched);
    taxonomyPromise = null;
    return fetched;
  });
  return taxonomyPromise;
}

export const fetchBirdsPage = async (
  page: number,
  pageSize: number,
  searchTerm = "",
  family = "",
): Promise<{ birds: Bird[]; total: number }> => {
  await loadTaxonomy();
  const all = sortedBirds ?? [];

  const trimmedSearch = searchTerm.trim().toLowerCase();
  const filtered = all.filter((b) => {
    if (family && b.family !== family) return false;
    if (!trimmedSearch) return true;
    return (
      (b.comName ?? "").toLowerCase().includes(trimmedSearch) ||
      (b.sciName ?? "").toLowerCase().includes(trimmedSearch) ||
      (b.family ?? "").toLowerCase().includes(trimmedSearch)
    );
  });

  const total = filtered.length;
  const start = (page - 1) * pageSize;
  const birds = filtered.slice(start, start + pageSize).map(toBird);

  return { birds, total };
};

export async function fetchTopFamilies(): Promise<string[]> {
  await loadTaxonomy();
  return topFamilies ?? [];
}

export async function fetchTotalSpeciesCount(): Promise<number> {
  const all = await loadTaxonomy();
  return all.length;
}

export async function fetchSimilarBirds(
  bird: Bird,
  limit = 4,
): Promise<Bird[]> {
  const all = await loadTaxonomy();
  if (!bird.family) return [];
  return all
    .filter(
      (b) => b.family === bird.family && b.speciesCode !== bird.speciesCode,
    )
    .slice(0, limit)
    .map(toBird);
}

export async function fetchRandomBird(): Promise<Bird> {
  const all = await loadTaxonomy();
  const species = all.filter((b) => b.category === "species");
  const pool = species.length ? species : all;
  const pick = pool[Math.floor(Math.random() * pool.length)];
  return toBird(pick);
}

export async function fetchQuizOptions(count = 4): Promise<Bird[]> {
  const all = await loadTaxonomy();
  const species = all.filter((b) => b.category === "species");
  const pool = species.length ? species : all;
  const picks: EbirdApiBird[] = [];
  const used = new Set<string>();
  while (picks.length < count && used.size < pool.length) {
    const pick = pool[Math.floor(Math.random() * pool.length)];
    if (!used.has(pick.speciesCode)) {
      used.add(pick.speciesCode);
      picks.push(pick);
    }
  }
  return picks.map(toBird);
}
