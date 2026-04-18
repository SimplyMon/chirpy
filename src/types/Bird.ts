export interface Bird {
  speciesCode: string;
  commonName: string;
  scientificName: string;
  category?: string;
  order?: string;
  family?: string;
  imageUrl?: string;
}

export interface BirdDetails {
  summary: string | null;
  habitat: string | null;
  region: string | null;
  diet: string | null;
  funFact: string | null;
  conservation: ConservationStatus;
  mass: string | null;
  length: string | null;
  wikipediaUrl: string | null;
}

export type ConservationStatus =
  | "LC"
  | "NT"
  | "VU"
  | "EN"
  | "CR"
  | "EW"
  | "EX"
  | "DD"
  | "UNKNOWN";
