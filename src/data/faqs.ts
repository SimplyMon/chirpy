export interface FaqItem {
  q: string;
  a: string;
}

export interface FaqCategory {
  id: string;
  title: string;
  icon: string;
  items: FaqItem[];
}

export const FAQS: FaqCategory[] = [
  {
    id: "getting-started",
    title: "Getting Started",
    icon: "fa-rocket",
    items: [
      {
        q: "Do I need an account to use Chirpy?",
        a: "No. Chirpy is free and requires no signup. Your favorites and quiz scores are stored locally in your browser.",
      },
      {
        q: "Is Chirpy free forever?",
        a: "Yes. There are no subscriptions, ads, or paid tiers. Chirpy is a personal project built to share the joy of birding.",
      },
      {
        q: "Does Chirpy work offline?",
        a: "After your first visit, the bird taxonomy is cached locally, so you can browse the list even without internet. Photos and detailed info still need a connection.",
      },
    ],
  },
  {
    id: "features",
    title: "Using the App",
    icon: "fa-compass",
    items: [
      {
        q: "How do I save a bird as a favorite?",
        a: "Tap the heart icon on any bird card or inside the bird detail view. Favorites are filterable via the Favorites button next to the search bar.",
      },
      {
        q: "What is the Quiz mode?",
        a: "Quiz mode shows a bird photo and four name options. Guess correctly to build your streak and score — your best is saved locally.",
      },
      {
        q: "Can I filter birds by family or category?",
        a: "Yes. Use the chip row under the search bar to quickly filter by common bird families like Warblers, Ducks, or Owls.",
      },
      {
        q: "Why is my search showing no results?",
        a: "Search matches common name, scientific name, and family name. Double-check spelling, or try a broader term — for example, search 'eagle' instead of a specific subspecies.",
      },
    ],
  },
  {
    id: "data",
    title: "Data & Sources",
    icon: "fa-database",
    items: [
      {
        q: "Where does the bird data come from?",
        a: "Species come from the Cornell Lab's eBird taxonomy. Descriptions come from Wikipedia. Conservation status, body mass, and size come from Wikidata. Photos come from Wikimedia Commons.",
      },
      {
        q: "How often is the data updated?",
        a: "Chirpy fetches live data on first visit. Clear your browser storage or hit refresh to re-sync the taxonomy.",
      },
      {
        q: "Why do some birds not have photos or info?",
        a: "We pull from free, open sources. If Wikimedia hasn't got a photo for a species, or Wikipedia doesn't have an article under that scientific name, those fields may be empty.",
      },
    ],
  },
  {
    id: "privacy",
    title: "Privacy",
    icon: "fa-shield-alt",
    items: [
      {
        q: "Do you track my activity?",
        a: "No. Chirpy has no analytics, no cookies (beyond local storage for your favorites), and no third-party trackers.",
      },
      {
        q: "Where are my favorites stored?",
        a: "They live in your browser's localStorage. They never leave your device.",
      },
      {
        q: "Is my search history recorded?",
        a: "Never. Searches are not logged anywhere — not even in your browser's storage.",
      },
    ],
  },
];
