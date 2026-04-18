import { Link } from "react-router-dom";
import bro1 from "../../assets/images/bro1.svg";
import bro from "../../assets/images/bro.svg";

const SOURCES = [
  {
    icon: "fa-database",
    name: "eBird Taxonomy",
    org: "Cornell Lab of Ornithology",
    desc: "The authoritative species list that powers every bird in Chirpy.",
    link: "https://ebird.org",
  },
  {
    icon: "fa-book-open",
    name: "Wikipedia",
    org: "Wikimedia Foundation",
    desc: "Habitat, diet, summaries, and the 'Did you know?' facts come from here.",
    link: "https://en.wikipedia.org",
  },
  {
    icon: "fa-project-diagram",
    name: "Wikidata",
    org: "Wikimedia Foundation",
    desc: "Structured data for conservation status, body mass, and size metrics.",
    link: "https://www.wikidata.org",
  },
  {
    icon: "fa-image",
    name: "Wikimedia Commons",
    org: "Community Contributors",
    desc: "Every bird photo is sourced from Commons — open and free to explore.",
    link: "https://commons.wikimedia.org",
  },
];

const VALUES = [
  {
    icon: "fa-heart",
    title: "Built with Love",
    text: "Inspired by Piko, my albino cockatiel. Every feature exists because a real bird made me wonder.",
  },
  {
    icon: "fa-unlock-alt",
    title: "Free Forever",
    text: "No accounts, no paywalls, no ads. Chirpy is a gift to anyone curious about birds.",
  },
  {
    icon: "fa-leaf",
    title: "Conservation First",
    text: "Every bird carries its IUCN status, because appreciation and protection go together.",
  },
];

export function AboutScreen() {
  return (
    <main
      className="relative overflow-hidden"
      style={{
        background: `linear-gradient(135deg, rgba(17,24,39,0.95) 0%, rgba(31,41,55,0.95) 100%)`,
      }}
    >
      <div
        className="absolute top-10 left-10 w-40 h-40 rounded-full mix-blend-screen filter blur-3xl opacity-20 animate-pulse"
        style={{ backgroundColor: "var(--color-success)" }}
      />
      <div
        className="absolute bottom-20 right-10 w-60 h-60 rounded-full mix-blend-screen filter blur-3xl opacity-15 animate-pulse"
        style={{ backgroundColor: "var(--color-primary)" }}
      />

      <section className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-16 text-center">
        <span
          className="inline-block text-xs font-bold tracking-widest uppercase mb-4 px-3 py-1 rounded-full"
          style={{
            backgroundColor: "rgba(16, 185, 129, 0.15)",
            color: "var(--color-success)",
            border: "1px solid var(--color-success)",
          }}
        >
          About Chirpy
        </span>
        <h1
          className="text-4xl sm:text-6xl font-extrabold mb-4 tracking-tight"
          style={{ color: "var(--color-text)" }}
        >
          A love letter to the birds
        </h1>
        <p
          className="text-base sm:text-xl max-w-3xl mx-auto leading-relaxed"
          style={{ color: "var(--color-text-secondary)" }}
        >
          Chirpy is a learning platform for anyone curious about birds — from
          first-time spotters to lifelong birders. It's a quiet corner of the
          web where science meets curiosity.
        </p>
      </section>

      <section className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-16">
          <div className="w-full lg:w-1/2 flex justify-center">
            <img
              src={bro1}
              alt="Why I Built This"
              className="w-full max-w-md rounded-2xl transition-transform duration-500 hover:scale-105"
            />
          </div>
          <div className="w-full lg:w-1/2">
            <span
              className="text-xs font-bold tracking-widest uppercase"
              style={{ color: "var(--color-success)" }}
            >
              The Story
            </span>
            <h2
              className="text-3xl sm:text-4xl font-bold mt-2 mb-5"
              style={{ color: "var(--color-text)" }}
            >
              Why Chirpy exists
            </h2>
            <p
              className="text-base sm:text-lg leading-relaxed mb-4"
              style={{ color: "var(--color-text-secondary)" }}
            >
              Birds have always fascinated me — especially my albino cockatiel,{" "}
              <strong style={{ color: "var(--color-text)" }}>Piko</strong>.
              Watching him tilt his head at every new sound made me realize how
              much personality is packed into a single little bird.
            </p>
            <p
              className="text-base sm:text-lg leading-relaxed"
              style={{ color: "var(--color-text-secondary)" }}
            >
              I wanted a place that made learning about birds feel like
              discovery, not homework. Chirpy is that place — a mix of real
              data, great photos, and the kind of fun facts you'd tell a friend.
            </p>
          </div>
        </div>
      </section>

      <section className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h2
            className="text-3xl sm:text-4xl font-bold mb-3"
            style={{ color: "var(--color-text)" }}
          >
            What we believe
          </h2>
          <p
            className="text-base sm:text-lg"
            style={{ color: "var(--color-text-secondary)" }}
          >
            The principles that shape every part of this app.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {VALUES.map((v) => (
            <div
              key={v.title}
              className="rounded-2xl p-6 border"
              style={{
                backgroundColor: "var(--color-card-dark)",
                borderColor: "var(--color-border-dark)",
              }}
            >
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 text-xl"
                style={{
                  backgroundColor: "rgba(16, 185, 129, 0.15)",
                  color: "var(--color-success)",
                }}
              >
                <i className={`fas ${v.icon}`} />
              </div>
              <h3
                className="font-bold text-lg mb-2"
                style={{ color: "var(--color-text)" }}
              >
                {v.title}
              </h3>
              <p
                className="text-sm leading-relaxed"
                style={{ color: "var(--color-text-secondary)" }}
              >
                {v.text}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex flex-col lg:flex-row-reverse items-center gap-10 lg:gap-16">
          <div className="w-full lg:w-1/2 flex justify-center">
            <img
              src={bro}
              alt="How This Started"
              className="w-full max-w-md rounded-2xl transition-transform duration-500 hover:scale-105"
            />
          </div>
          <div className="w-full lg:w-1/2">
            <span
              className="text-xs font-bold tracking-widest uppercase"
              style={{ color: "var(--color-primary)" }}
            >
              The Craft
            </span>
            <h2
              className="text-3xl sm:text-4xl font-bold mt-2 mb-5"
              style={{ color: "var(--color-text)" }}
            >
              How it was built
            </h2>
            <p
              className="text-base sm:text-lg leading-relaxed mb-4"
              style={{ color: "var(--color-text-secondary)" }}
            >
              Chirpy is a React + TypeScript single-page app. The taxonomy
              loads once and gets cached locally, so it stays fast and works
              offline after your first visit.
            </p>
            <p
              className="text-base sm:text-lg leading-relaxed"
              style={{ color: "var(--color-text-secondary)" }}
            >
              Every piece of data comes from free, open sources. No tracking,
              no analytics, no accounts — just birds.
            </p>
          </div>
        </div>
      </section>

      <section className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h2
            className="text-3xl sm:text-4xl font-bold mb-3"
            style={{ color: "var(--color-text)" }}
          >
            Powered by open data
          </h2>
          <p
            className="text-base sm:text-lg"
            style={{ color: "var(--color-text-secondary)" }}
          >
            Huge thanks to the organizations and contributors who make Chirpy
            possible.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {SOURCES.map((s) => (
            <a
              key={s.name}
              href={s.link}
              target="_blank"
              rel="noopener noreferrer"
              className="flex gap-4 rounded-2xl p-5 border transition-transform hover:-translate-y-1"
              style={{
                backgroundColor: "var(--color-card-dark)",
                borderColor: "var(--color-border-dark)",
              }}
            >
              <div
                className="w-12 h-12 shrink-0 rounded-xl flex items-center justify-center text-xl"
                style={{
                  backgroundColor: "rgba(59, 130, 246, 0.15)",
                  color: "var(--color-primary)",
                }}
              >
                <i className={`fas ${s.icon}`} />
              </div>
              <div className="min-w-0">
                <h3
                  className="font-bold text-lg"
                  style={{ color: "var(--color-text)" }}
                >
                  {s.name}
                </h3>
                <p
                  className="text-xs mb-1"
                  style={{ color: "var(--color-success)" }}
                >
                  {s.org}
                </p>
                <p
                  className="text-sm leading-relaxed"
                  style={{ color: "var(--color-text-secondary)" }}
                >
                  {s.desc}
                </p>
              </div>
            </a>
          ))}
        </div>
      </section>

      <section className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
        <i
          className="fas fa-dove text-5xl mb-4"
          style={{ color: "var(--color-success)" }}
        />
        <h2
          className="text-3xl sm:text-4xl font-bold mb-3"
          style={{ color: "var(--color-text)" }}
        >
          Come meet the birds
        </h2>
        <p
          className="text-base sm:text-lg mb-8"
          style={{ color: "var(--color-text-secondary)" }}
        >
          Thousands of species are a click away. Start with whatever catches
          your eye.
        </p>
        <Link
          to="/birds"
          className="inline-block px-8 py-3 rounded-full font-semibold transition-transform hover:scale-105"
          style={{
            backgroundColor: "var(--color-success)",
            color: "#ffffff",
          }}
        >
          <i className="fas fa-binoculars mr-2" />
          Open the Encyclopedia
        </Link>
      </section>
    </main>
  );
}
