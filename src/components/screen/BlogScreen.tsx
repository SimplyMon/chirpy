import { useState } from "react";
import { Link } from "react-router-dom";
import { BLOG_POSTS, type BlogPost } from "../../data/blog";

export function BlogScreen() {
  const [selected, setSelected] = useState<BlogPost | null>(null);

  const categories = Array.from(new Set(BLOG_POSTS.map((p) => p.category)));

  return (
    <main
      className="relative overflow-hidden min-h-screen"
      style={{
        background:
          "linear-gradient(135deg, rgba(17,24,39,0.95) 0%, rgba(31,41,55,0.95) 100%)",
      }}
    >
      <div
        className="absolute top-20 left-10 w-56 h-56 rounded-full mix-blend-screen filter blur-3xl opacity-20"
        style={{ backgroundColor: "var(--color-primary)" }}
      />
      <div
        className="absolute bottom-40 right-10 w-48 h-48 rounded-full mix-blend-screen filter blur-3xl opacity-20"
        style={{ backgroundColor: "var(--color-success)" }}
      />

      <section className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-10 text-center">
        <span
          className="inline-block text-xs font-bold tracking-widest uppercase mb-4 px-3 py-1 rounded-full"
          style={{
            backgroundColor: "rgba(59, 130, 246, 0.15)",
            color: "var(--color-primary)",
            border: "1px solid var(--color-primary)",
          }}
        >
          The Chirpy Blog
        </span>
        <h1
          className="text-4xl sm:text-5xl font-extrabold mb-4"
          style={{ color: "var(--color-text)" }}
        >
          Stories from the field
        </h1>
        <p
          className="text-base sm:text-lg max-w-2xl mx-auto"
          style={{ color: "var(--color-text-secondary)" }}
        >
          Short reads on birds, birding, and the science that makes watching
          them endlessly rewarding.
        </p>
      </section>

      <section className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-6">
        <div className="flex flex-wrap justify-center gap-2">
          {categories.map((c) => (
            <span
              key={c}
              className="px-3 py-1 rounded-full text-xs font-semibold border"
              style={{
                backgroundColor: "var(--color-card-dark)",
                color: "var(--color-text-secondary)",
                borderColor: "var(--color-border-dark)",
              }}
            >
              {c}
            </span>
          ))}
        </div>
      </section>

      <section className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-20 pt-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {BLOG_POSTS.map((post) => (
            <button
              key={post.id}
              onClick={() => setSelected(post)}
              className="text-left rounded-2xl p-6 border transition-transform hover:-translate-y-1 hover:shadow-xl flex flex-col"
              style={{
                backgroundColor: "var(--color-card-dark)",
                borderColor: "var(--color-border-dark)",
              }}
            >
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 text-xl"
                style={{
                  backgroundColor: `color-mix(in srgb, ${post.accent} 15%, transparent)`,
                  color: post.accent,
                }}
              >
                <i className={`fas ${post.icon}`} />
              </div>
              <div className="flex items-center gap-2 text-xs mb-2">
                <span
                  className="font-semibold uppercase tracking-wide"
                  style={{ color: post.accent }}
                >
                  {post.category}
                </span>
                <span style={{ color: "var(--color-text-secondary)" }}>•</span>
                <span style={{ color: "var(--color-text-secondary)" }}>
                  {post.readTime}
                </span>
              </div>
              <h2
                className="text-xl font-bold mb-2 leading-snug"
                style={{ color: "var(--color-text)" }}
              >
                {post.title}
              </h2>
              <p
                className="text-sm leading-relaxed mb-4 flex-1"
                style={{ color: "var(--color-text-secondary)" }}
              >
                {post.excerpt}
              </p>
              <div
                className="flex items-center justify-between pt-4 border-t text-xs"
                style={{ borderColor: "var(--color-border-dark)" }}
              >
                <span style={{ color: "var(--color-text-secondary)" }}>
                  {post.date}
                </span>
                <span
                  className="font-semibold flex items-center gap-1"
                  style={{ color: "var(--color-success)" }}
                >
                  Read
                  <i className="fas fa-arrow-right text-xs" />
                </span>
              </div>
            </button>
          ))}
        </div>
      </section>

      <section className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div
          className="rounded-2xl p-8 text-center border"
          style={{
            backgroundColor: "var(--color-card-dark)",
            borderColor: "var(--color-border-dark)",
          }}
        >
          <i
            className="fas fa-envelope-open-text text-4xl mb-3"
            style={{ color: "var(--color-success)" }}
          />
          <h2
            className="text-2xl font-bold mb-2"
            style={{ color: "var(--color-text)" }}
          >
            Want more bird stories?
          </h2>
          <p
            className="mb-5"
            style={{ color: "var(--color-text-secondary)" }}
          >
            New reads land every week. Have a topic you'd love to see covered?
          </p>
          <Link
            to="/support"
            className="inline-block px-6 py-3 rounded-full font-semibold transition-transform hover:scale-105"
            style={{
              backgroundColor: "var(--color-success)",
              color: "#ffffff",
            }}
          >
            Suggest a topic
          </Link>
        </div>
      </section>

      {selected && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ backgroundColor: "rgba(0,0,0,0.7)" }}
          onClick={() => setSelected(null)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-2xl w-full max-h-[90vh] overflow-y-auto rounded-2xl border p-8"
            style={{
              backgroundColor: "var(--color-card-dark)",
              borderColor: "var(--color-border-dark)",
            }}
          >
            <button
              onClick={() => setSelected(null)}
              aria-label="Close"
              className="absolute top-4 right-4 w-9 h-9 rounded-full flex items-center justify-center"
              style={{
                backgroundColor: "var(--color-border-dark)",
                color: "var(--color-text)",
              }}
            >
              <i className="fas fa-times" />
            </button>
            <div
              className="w-14 h-14 rounded-xl flex items-center justify-center mb-5 text-2xl"
              style={{
                backgroundColor: `color-mix(in srgb, ${selected.accent} 15%, transparent)`,
                color: selected.accent,
              }}
            >
              <i className={`fas ${selected.icon}`} />
            </div>
            <div className="flex items-center gap-2 text-xs mb-3">
              <span
                className="font-semibold uppercase tracking-wide"
                style={{ color: selected.accent }}
              >
                {selected.category}
              </span>
              <span style={{ color: "var(--color-text-secondary)" }}>•</span>
              <span style={{ color: "var(--color-text-secondary)" }}>
                {selected.date}
              </span>
              <span style={{ color: "var(--color-text-secondary)" }}>•</span>
              <span style={{ color: "var(--color-text-secondary)" }}>
                {selected.readTime}
              </span>
            </div>
            <h2
              className="text-3xl font-extrabold mb-5 leading-tight"
              style={{ color: "var(--color-text)" }}
            >
              {selected.title}
            </h2>
            <div className="space-y-4">
              {selected.body.map((p, i) => (
                <p
                  key={i}
                  className="text-base leading-relaxed"
                  style={{ color: "var(--color-text-secondary)" }}
                >
                  {p}
                </p>
              ))}
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
