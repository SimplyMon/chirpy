export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  readTime: string;
  date: string;
  icon: string;
  accent: string;
  body: string[];
}

export const BLOG_POSTS: BlogPost[] = [
  {
    id: "why-birds-matter",
    title: "Why Birds Matter More Than You Think",
    excerpt:
      "Birds are the planet's most visible indicators of ecosystem health. Here's why paying attention to them changes everything.",
    category: "Conservation",
    readTime: "4 min read",
    date: "Jan 10, 2025",
    icon: "fa-leaf",
    accent: "var(--color-success)",
    body: [
      "Birds are everywhere — backyards, cities, forests, oceans. Because they live in nearly every habitat on Earth, they're among the first species to show us when something is off.",
      "When a songbird population drops, it often signals insect decline, pesticide use, or habitat fragmentation long before other signs appear. Scientists use birds as bioindicators precisely because they're sensitive, widespread, and easy to count.",
      "The good news: most threats facing birds are reversible. Native plants, pesticide-free gardens, and window decals save millions of birds each year. Small actions compound — and they start with noticing.",
    ],
  },
  {
    id: "beginner-birding",
    title: "A Beginner's Guide to Bird Watching",
    excerpt:
      "You don't need expensive gear or a life list. All you need is curiosity and five quiet minutes a day.",
    category: "Getting Started",
    readTime: "5 min read",
    date: "Dec 20, 2024",
    icon: "fa-binoculars",
    accent: "var(--color-primary)",
    body: [
      "Birding has a reputation for being serious, expensive, and a little intimidating. It doesn't have to be any of those things.",
      "Start by watching the birds that already visit your space. Learn three — just three — well. Their shape, their call, how they move. Those three become anchors for every new species you meet later.",
      "Keep a small notebook. Sketch badly. Guess wrong. The mistakes teach more than any field guide. And when you're ready, grab a cheap pair of 8x42 binoculars. That's it. You're a birder now.",
    ],
  },
  {
    id: "iucn-explained",
    title: "IUCN Red List, Explained",
    excerpt:
      "Least Concern, Vulnerable, Endangered — what do those labels actually mean, and why do they matter for the birds you love?",
    category: "Science",
    readTime: "6 min read",
    date: "Mar 27, 2025",
    icon: "fa-shield-alt",
    accent: "#f59e0b",
    body: [
      "Every bird in Chirpy carries an IUCN Red List status. It's a single letter or two — LC, NT, VU, EN, CR — and it tells you how close a species is to vanishing.",
      "The categories aren't arbitrary. Scientists assess population size, geographic range, and trend direction against agreed thresholds. A Vulnerable bird isn't just rare — it faces a measurable risk of extinction within decades.",
      "Knowing a species' status changes how you see it. A familiar backyard visitor labeled 'Near Threatened' means the ordinary is slipping away, quietly. Awareness is the first step toward protection.",
    ],
  },
  {
    id: "photographing-birds",
    title: "The Ethics of Bird Photography",
    excerpt:
      "Getting the shot matters less than getting it right. A short guide to photographing birds without disturbing them.",
    category: "Photography",
    readTime: "4 min read",
    date: "Mar 20, 2025",
    icon: "fa-camera",
    accent: "#ef4444",
    body: [
      "The best bird photo is one the bird doesn't know you took. Baiting, playback calls, and flushing birds for flight shots all stress animals that are already managing survival on a thin margin.",
      "Use a long lens. Stay low. Move slowly. If the bird changes its behavior because of you — stops feeding, turns its head, takes off — you're too close.",
      "A missed shot is fine. A stressed bird is not. The rule of thumb: would this photo be worth it if the bird abandoned its nest because of you? If no, back up.",
    ],
  },
  {
    id: "urban-birds",
    title: "The Surprising Birds of the City",
    excerpt:
      "Pigeons, sparrows, and crows aren't the whole story. Cities hide peregrines, warblers, and migratory visitors if you know where to look.",
    category: "Urban Birding",
    readTime: "5 min read",
    date: "Mar 13, 2025",
    icon: "fa-city",
    accent: "var(--color-success)",
    body: [
      "Skyscrapers have become cliffs. Parks have become forests. Cities are some of the richest birding habitats on the planet — you just have to learn to see them that way.",
      "Peregrine falcons nest on window ledges. Warblers stop in tiny urban parks during migration. Swifts scream over evening commutes. Every city has its cast of characters.",
      "Try a lunch-break birding walk. Pick one park. Return weekly. Within a month, you'll know the residents, the visitors, and the rare ones that turn everyone's head.",
    ],
  },
  {
    id: "song-vs-call",
    title: "Song vs Call: What Birds Are Actually Saying",
    excerpt:
      "Birds don't just sing to sound pretty. Every chirp, trill, and squawk has a job — and learning the difference unlocks a whole new layer.",
    category: "Science",
    readTime: "5 min read",
    date: "Mar 06, 2025",
    icon: "fa-music",
    accent: "var(--color-primary)",
    body: [
      "A song is typically long, musical, and sung by males to claim territory or attract mates. A call is short, functional, and used by any bird to alert, contact, or beg.",
      "Learning the difference helps you ID birds you can't see. A trilling song from the treetops is probably a territorial male warbler. A sharp 'chip' from low shrubs is an alarm — something's watching.",
      "Start with the five most common birds near you. Learn their songs and their calls separately. Suddenly the woods aren't random noise — they're a conversation.",
    ],
  },
];
