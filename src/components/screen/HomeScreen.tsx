import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { Birds } from "../layout/elements/Home/Birds";
import { HeroText } from "../layout/elements/Home/HeroText";
import { HeroImage } from "../layout/elements/Home/HeroImage";
import { BackgroundEffects } from "../layout/elements/Home/backgroundEffects";
import { fetchTotalSpeciesCount } from "../../services/ebirdService";
import { FAQS } from "../../data/faqs";

const FAQ_PREVIEW = FAQS.flatMap((c) => c.items).slice(0, 4);

const RESOURCES = [
  {
    icon: "fa-question-circle",
    title: "FAQ",
    text: "Fast answers to the things people ask most — accounts, data, favorites, and privacy.",
    link: "/faq",
    cta: "Browse FAQ",
    accent: "var(--color-success)",
  },
  {
    icon: "fa-book-open",
    title: "Blog",
    text: "Short reads on birding basics, conservation, photography ethics, and bird science.",
    link: "/blog",
    cta: "Read articles",
    accent: "var(--color-primary)",
  },
  {
    icon: "fa-life-ring",
    title: "Support",
    text: "Hit a snag or have a suggestion? Reach out — messages go straight to a real human.",
    link: "/support",
    cta: "Get in touch",
    accent: "#f59e0b",
  },
];

const FEATURES = [
  {
    icon: "fa-search",
    title: "Explore 11,000+ Species",
    text: "Browse the world's birds from Aardvark-sized Ostriches to palm-sized hummingbirds, sourced from the Cornell Lab eBird taxonomy.",
    accent: "var(--color-success)",
  },
  {
    icon: "fa-graduation-cap",
    title: "Learn Through Play",
    text: "Test yourself with the photo quiz — identify species, build streaks, and climb your personal best score.",
    accent: "var(--color-primary)",
  },
  {
    icon: "fa-heart",
    title: "Build Your Life List",
    text: "Heart your favorites and create a personal collection of birds you've spotted, studied, or simply fallen in love with.",
    accent: "#ef4444",
  },
  {
    icon: "fa-shield-alt",
    title: "Conservation Aware",
    text: "Every bird shows its IUCN Red List status, so you understand which species need our help — and why.",
    accent: "#f59e0b",
  },
];

const STEPS = [
  {
    number: "01",
    title: "Browse or Search",
    text: "Use the search bar, filter by family, or just scroll. The whole taxonomy is at your fingertips.",
  },
  {
    number: "02",
    title: "Open a Bird",
    text: "Tap any card to see habitat, diet, size, region, conservation status, and a curious fun fact.",
  },
  {
    number: "03",
    title: "Save & Quiz Yourself",
    text: "Heart the birds you love, then play the photo quiz to see how many you can name from sight.",
  },
];

export function HomeScreen() {
  const [totalSpecies, setTotalSpecies] = useState<number | null>(null);

  useEffect(() => {
    fetchTotalSpeciesCount()
      .then(setTotalSpecies)
      .catch(() => setTotalSpecies(null));
  }, []);

  return (
    <main>
      <section
        className="relative overflow-hidden"
        style={{
          background: `linear-gradient(135deg, rgba(17,24,39,0.9) 0%, rgba(31,41,55,0.95) 100%)`,
        }}
      >
        <Birds />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32 flex flex-col-reverse lg:flex-row items-center gap-10 relative z-10">
          <HeroText />
          <HeroImage />
        </div>
        <BackgroundEffects />
      </section>

      <section
        className="py-16 px-4 sm:px-6 lg:px-8 border-t border-b"
        style={{
          backgroundColor: "var(--color-card-dark)",
          borderColor: "var(--color-border-dark)",
        }}
      >
        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <Stat
            value={totalSpecies !== null ? totalSpecies.toLocaleString() : "..."}
            label="Bird Species"
            icon="fa-feather"
          />
          <Stat value="12" label="Top Families" icon="fa-dove" />
          <Stat value="∞" label="Photos & Facts" icon="fa-image" />
          <Stat value="100%" label="Free & Open" icon="fa-heart" />
        </div>
      </section>

      <section
        className="py-20 px-4 sm:px-6 lg:px-8"
        style={{ backgroundColor: "var(--color-bg-dark)" }}
      >
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <span
              className="inline-block text-xs font-bold tracking-widest uppercase mb-3 px-3 py-1 rounded-full"
              style={{
                backgroundColor: "rgba(16, 185, 129, 0.15)",
                color: "var(--color-success)",
                border: "1px solid var(--color-success)",
              }}
            >
              Why Chirpy
            </span>
            <h2
              className="text-3xl sm:text-4xl font-extrabold mb-3"
              style={{ color: "var(--color-text)" }}
            >
              A better way to meet the birds
            </h2>
            <p
              className="max-w-2xl mx-auto text-base sm:text-lg"
              style={{ color: "var(--color-text-secondary)" }}
            >
              Chirpy blends real scientific data with a fun, visual experience —
              so curiosity turns into knowledge naturally.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {FEATURES.map((f) => (
              <div
                key={f.title}
                className="rounded-2xl p-6 border transition-transform hover:-translate-y-1"
                style={{
                  backgroundColor: "var(--color-card-dark)",
                  borderColor: "var(--color-border-dark)",
                }}
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 text-xl"
                  style={{
                    backgroundColor: `color-mix(in srgb, ${f.accent} 15%, transparent)`,
                    color: f.accent,
                  }}
                >
                  <i className={`fas ${f.icon}`} />
                </div>
                <h3
                  className="font-bold text-lg mb-2"
                  style={{ color: "var(--color-text)" }}
                >
                  {f.title}
                </h3>
                <p
                  className="text-sm leading-relaxed"
                  style={{ color: "var(--color-text-secondary)" }}
                >
                  {f.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section
        className="py-20 px-4 sm:px-6 lg:px-8"
        style={{ backgroundColor: "var(--color-card-dark)" }}
      >
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <h2
              className="text-3xl sm:text-4xl font-extrabold mb-3"
              style={{ color: "var(--color-text)" }}
            >
              How it works
            </h2>
            <p
              className="text-base sm:text-lg"
              style={{ color: "var(--color-text-secondary)" }}
            >
              Three easy steps to get birding.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative">
            {STEPS.map((s, i) => (
              <div
                key={s.number}
                className="rounded-2xl p-6 border relative"
                style={{
                  backgroundColor: "var(--color-bg-dark)",
                  borderColor: "var(--color-border-dark)",
                }}
              >
                <div
                  className="text-5xl font-extrabold mb-3 opacity-30"
                  style={{ color: "var(--color-success)" }}
                >
                  {s.number}
                </div>
                <h3
                  className="font-bold text-lg mb-2"
                  style={{ color: "var(--color-text)" }}
                >
                  {s.title}
                </h3>
                <p
                  className="text-sm leading-relaxed"
                  style={{ color: "var(--color-text-secondary)" }}
                >
                  {s.text}
                </p>
                {i < STEPS.length - 1 && (
                  <div
                    className="hidden md:block absolute top-1/2 -right-3 w-6 h-0.5"
                    style={{ backgroundColor: "var(--color-border-dark)" }}
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section
        className="py-20 px-4 sm:px-6 lg:px-8"
        style={{ backgroundColor: "var(--color-bg-dark)" }}
      >
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <span
              className="inline-block text-xs font-bold tracking-widest uppercase mb-3 px-3 py-1 rounded-full"
              style={{
                backgroundColor: "rgba(59, 130, 246, 0.15)",
                color: "var(--color-primary)",
                border: "1px solid var(--color-primary)",
              }}
            >
              Resources
            </span>
            <h2
              className="text-3xl sm:text-4xl font-extrabold mb-3"
              style={{ color: "var(--color-text)" }}
            >
              Dig a little deeper
            </h2>
            <p
              className="max-w-2xl mx-auto text-base sm:text-lg"
              style={{ color: "var(--color-text-secondary)" }}
            >
              Guides, stories, and a direct line to us — everything you need to
              keep learning.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-16">
            {RESOURCES.map((r) => (
              <Link
                key={r.title}
                to={r.link}
                className="rounded-2xl p-6 border transition-transform hover:-translate-y-1 flex flex-col"
                style={{
                  backgroundColor: "var(--color-card-dark)",
                  borderColor: "var(--color-border-dark)",
                }}
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 text-xl"
                  style={{
                    backgroundColor: `color-mix(in srgb, ${r.accent} 15%, transparent)`,
                    color: r.accent,
                  }}
                >
                  <i className={`fas ${r.icon}`} />
                </div>
                <h3
                  className="font-bold text-lg mb-2"
                  style={{ color: "var(--color-text)" }}
                >
                  {r.title}
                </h3>
                <p
                  className="text-sm leading-relaxed mb-4 flex-1"
                  style={{ color: "var(--color-text-secondary)" }}
                >
                  {r.text}
                </p>
                <span
                  className="text-sm font-semibold flex items-center gap-1"
                  style={{ color: r.accent }}
                >
                  {r.cta}
                  <i className="fas fa-arrow-right text-xs" />
                </span>
              </Link>
            ))}
          </div>

          <div
            className="rounded-2xl p-6 sm:p-8 border"
            style={{
              backgroundColor: "var(--color-card-dark)",
              borderColor: "var(--color-border-dark)",
            }}
          >
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between mb-6 gap-2">
              <div>
                <h3
                  className="text-2xl font-bold mb-1"
                  style={{ color: "var(--color-text)" }}
                >
                  Frequently asked
                </h3>
                <p
                  className="text-sm"
                  style={{ color: "var(--color-text-secondary)" }}
                >
                  Quick answers to questions we hear a lot.
                </p>
              </div>
              <Link
                to="/faq"
                className="text-sm font-semibold flex items-center gap-1 whitespace-nowrap"
                style={{ color: "var(--color-success)" }}
              >
                See all FAQs
                <i className="fas fa-arrow-right text-xs" />
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {FAQ_PREVIEW.map((f) => (
                <div
                  key={f.q}
                  className="rounded-xl p-5 border"
                  style={{
                    backgroundColor: "var(--color-bg-dark)",
                    borderColor: "var(--color-border-dark)",
                  }}
                >
                  <div className="flex items-start gap-3 mb-2">
                    <i
                      className="fas fa-circle-question mt-1"
                      style={{ color: "var(--color-success)" }}
                    />
                    <p
                      className="font-semibold leading-snug"
                      style={{ color: "var(--color-text)" }}
                    >
                      {f.q}
                    </p>
                  </div>
                  <p
                    className="text-sm leading-relaxed pl-6"
                    style={{ color: "var(--color-text-secondary)" }}
                  >
                    {f.a}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section
        className="py-20 px-4 sm:px-6 lg:px-8"
        style={{
          background:
            "linear-gradient(135deg, rgba(16,185,129,0.15) 0%, rgba(17,24,39,0.95) 100%)",
        }}
      >
        <div className="max-w-4xl mx-auto text-center">
          <i
            className="fas fa-feather text-5xl mb-4"
            style={{ color: "var(--color-success)" }}
          />
          <h2
            className="text-3xl sm:text-4xl font-extrabold mb-3"
            style={{ color: "var(--color-text)" }}
          >
            Ready to meet some birds?
          </h2>
          <p
            className="text-base sm:text-lg mb-8 max-w-2xl mx-auto"
            style={{ color: "var(--color-text-secondary)" }}
          >
            Dive into the encyclopedia, take the quiz, or just start with today's
            Bird of the Day. No signup, no cost — just birds.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link
              to="/birds"
              className="px-6 py-3 rounded-full font-semibold transition-transform hover:scale-105"
              style={{
                backgroundColor: "var(--color-success)",
                color: "#ffffff",
              }}
            >
              <i className="fas fa-binoculars mr-2" />
              Start Exploring
            </Link>
            <Link
              to="/about"
              className="px-6 py-3 rounded-full font-semibold transition-transform hover:scale-105 border"
              style={{
                backgroundColor: "var(--color-card-dark)",
                color: "var(--color-text)",
                borderColor: "var(--color-border-dark)",
              }}
            >
              Learn More
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

function Stat({
  value,
  label,
  icon,
}: {
  value: string;
  label: string;
  icon: string;
}) {
  return (
    <div className="flex flex-col items-center gap-2">
      <div
        className="w-12 h-12 rounded-full flex items-center justify-center mb-1"
        style={{
          backgroundColor: "rgba(16, 185, 129, 0.15)",
          color: "var(--color-success)",
        }}
      >
        <i className={`fas ${icon} text-xl`} />
      </div>
      <div
        className="text-3xl sm:text-4xl font-extrabold"
        style={{ color: "var(--color-text)" }}
      >
        {value}
      </div>
      <div
        className="text-xs sm:text-sm uppercase tracking-wide font-semibold"
        style={{ color: "var(--color-text-secondary)" }}
      >
        {label}
      </div>
    </div>
  );
}
