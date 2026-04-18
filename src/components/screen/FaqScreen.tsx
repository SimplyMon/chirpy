import { useState } from "react";
import { Link } from "react-router-dom";
import { FAQS } from "../../data/faqs";

export function FaqScreen() {
  const [openId, setOpenId] = useState<string | null>(null);
  const [query, setQuery] = useState("");

  const trimmed = query.trim().toLowerCase();
  const filtered = FAQS.map((cat) => ({
    ...cat,
    items: trimmed
      ? cat.items.filter(
          (i) =>
            i.q.toLowerCase().includes(trimmed) ||
            i.a.toLowerCase().includes(trimmed)
        )
      : cat.items,
  })).filter((cat) => cat.items.length > 0);

  return (
    <main
      className="relative overflow-hidden min-h-screen"
      style={{
        background:
          "linear-gradient(135deg, rgba(17,24,39,0.95) 0%, rgba(31,41,55,0.95) 100%)",
      }}
    >
      <div
        className="absolute top-10 right-10 w-48 h-48 rounded-full mix-blend-screen filter blur-3xl opacity-20"
        style={{ backgroundColor: "var(--color-success)" }}
      />

      <section className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-12 text-center">
        <span
          className="inline-block text-xs font-bold tracking-widest uppercase mb-4 px-3 py-1 rounded-full"
          style={{
            backgroundColor: "rgba(16, 185, 129, 0.15)",
            color: "var(--color-success)",
            border: "1px solid var(--color-success)",
          }}
        >
          Help Center
        </span>
        <h1
          className="text-4xl sm:text-5xl font-extrabold mb-4"
          style={{ color: "var(--color-text)" }}
        >
          Frequently Asked Questions
        </h1>
        <p
          className="text-base sm:text-lg max-w-2xl mx-auto mb-8"
          style={{ color: "var(--color-text-secondary)" }}
        >
          Quick answers to the things people most often ask about Chirpy.
        </p>

        <div className="relative max-w-xl mx-auto">
          <i
            className="fas fa-search absolute left-4 top-1/2 -translate-y-1/2 text-sm pointer-events-none"
            style={{ color: "var(--color-text-secondary)" }}
          />
          <input
            type="text"
            placeholder="Search questions..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="border rounded-full py-3 pl-11 pr-11 w-full
              bg-(--color-card-dark)
              text-(--color-text)
              placeholder-(--color-text-secondary)
              border-(--color-border-dark)
              focus:outline-none focus:ring-2 focus:ring-(--color-success)
              focus:border-(--color-success)"
          />
          {query && (
            <button
              onClick={() => setQuery("")}
              aria-label="Clear search"
              className="absolute right-3 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full flex items-center justify-center"
              style={{
                backgroundColor: "var(--color-border-dark)",
                color: "var(--color-text)",
              }}
            >
              <i className="fas fa-times text-xs" />
            </button>
          )}
        </div>
      </section>

      <section className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        {filtered.length === 0 ? (
          <div
            className="text-center py-16 rounded-2xl border"
            style={{
              backgroundColor: "var(--color-card-dark)",
              borderColor: "var(--color-border-dark)",
            }}
          >
            <i
              className="fas fa-search text-4xl mb-3 opacity-50"
              style={{ color: "var(--color-text-secondary)" }}
            />
            <p style={{ color: "var(--color-text-secondary)" }}>
              No questions match "{query}". Try a different keyword or{" "}
              <Link
                to="/support"
                className="underline"
                style={{ color: "var(--color-success)" }}
              >
                contact support
              </Link>
              .
            </p>
          </div>
        ) : (
          <div className="space-y-10">
            {filtered.map((cat) => (
              <div key={cat.id}>
                <div className="flex items-center gap-3 mb-5">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center"
                    style={{
                      backgroundColor: "rgba(16, 185, 129, 0.15)",
                      color: "var(--color-success)",
                    }}
                  >
                    <i className={`fas ${cat.icon}`} />
                  </div>
                  <h2
                    className="text-2xl font-bold"
                    style={{ color: "var(--color-text)" }}
                  >
                    {cat.title}
                  </h2>
                </div>
                <div className="space-y-3">
                  {cat.items.map((item) => {
                    const id = `${cat.id}-${item.q}`;
                    const isOpen = openId === id;
                    return (
                      <div
                        key={id}
                        className="rounded-2xl border overflow-hidden transition-colors"
                        style={{
                          backgroundColor: "var(--color-card-dark)",
                          borderColor: isOpen
                            ? "var(--color-success)"
                            : "var(--color-border-dark)",
                        }}
                      >
                        <button
                          onClick={() => setOpenId(isOpen ? null : id)}
                          className="w-full flex items-center justify-between gap-4 p-5 text-left"
                        >
                          <span
                            className="font-semibold"
                            style={{ color: "var(--color-text)" }}
                          >
                            {item.q}
                          </span>
                          <i
                            className={`fas fa-chevron-down transition-transform shrink-0 ${
                              isOpen ? "rotate-180" : ""
                            }`}
                            style={{ color: "var(--color-success)" }}
                          />
                        </button>
                        {isOpen && (
                          <div
                            className="px-5 pb-5 text-sm leading-relaxed animate-fade-in"
                            style={{ color: "var(--color-text-secondary)" }}
                          >
                            {item.a}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        )}
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
            className="fas fa-comments text-4xl mb-3"
            style={{ color: "var(--color-primary)" }}
          />
          <h2
            className="text-2xl font-bold mb-2"
            style={{ color: "var(--color-text)" }}
          >
            Still have questions?
          </h2>
          <p
            className="mb-5"
            style={{ color: "var(--color-text-secondary)" }}
          >
            Can't find what you're looking for? Reach out and we'll get back to you.
          </p>
          <Link
            to="/support"
            className="inline-block px-6 py-3 rounded-full font-semibold transition-transform hover:scale-105"
            style={{
              backgroundColor: "var(--color-success)",
              color: "#ffffff",
            }}
          >
            Contact Support
          </Link>
        </div>
      </section>
    </main>
  );
}
