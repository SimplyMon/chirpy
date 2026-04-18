import { useState } from "react";
import { Link } from "react-router-dom";

const HELP_TOPICS = [
  {
    icon: "fa-question-circle",
    title: "Check the FAQ",
    text: "Most common questions are answered already — accounts, data sources, favorites, and privacy.",
    link: "/faq",
    linkLabel: "Browse FAQ",
    accent: "var(--color-success)",
  },
  {
    icon: "fa-book-open",
    title: "Read the Blog",
    text: "Long-form guides on birding basics, conservation, and bird science from our archive.",
    link: "/blog",
    linkLabel: "Open Blog",
    accent: "var(--color-primary)",
  },
  {
    icon: "fa-bug",
    title: "Report a Bug",
    text: "Spotted something broken — a missing photo, a wrong fact, a UI quirk? Let us know below.",
    link: "#contact",
    linkLabel: "Send report",
    accent: "#ef4444",
  },
  {
    icon: "fa-lightbulb",
    title: "Suggest a Feature",
    text: "Got an idea that would make Chirpy better? We read every suggestion.",
    link: "#contact",
    linkLabel: "Share idea",
    accent: "#f59e0b",
  },
];

const CONTACT_CHANNELS = [
  {
    icon: "fa-envelope",
    label: "Email",
    value: "mon.dev005@gmail.com",
    href: "mailto:mon.dev005@gmail.com",
  },
  {
    icon: "fa-phone",
    label: "Phone",
    value: "09927199525",
    href: "tel:+639927199525",
  },
  {
    icon: "fa-clock",
    label: "Response time",
    value: "Within 48 hours",
    href: null,
  },
];

export function SupportScreen() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setForm({ name: "", email: "", subject: "", message: "" });
    setTimeout(() => setSubmitted(false), 4500);
  };

  return (
    <main
      className="relative overflow-hidden min-h-screen"
      style={{
        background:
          "linear-gradient(135deg, rgba(17,24,39,0.95) 0%, rgba(31,41,55,0.95) 100%)",
      }}
    >
      <div
        className="absolute top-20 right-10 w-56 h-56 rounded-full mix-blend-screen filter blur-3xl opacity-20"
        style={{ backgroundColor: "var(--color-success)" }}
      />
      <div
        className="absolute bottom-40 left-10 w-48 h-48 rounded-full mix-blend-screen filter blur-3xl opacity-20"
        style={{ backgroundColor: "var(--color-primary)" }}
      />

      <section className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-10 text-center">
        <span
          className="inline-block text-xs font-bold tracking-widest uppercase mb-4 px-3 py-1 rounded-full"
          style={{
            backgroundColor: "rgba(16, 185, 129, 0.15)",
            color: "var(--color-success)",
            border: "1px solid var(--color-success)",
          }}
        >
          Support
        </span>
        <h1
          className="text-4xl sm:text-5xl font-extrabold mb-4"
          style={{ color: "var(--color-text)" }}
        >
          How can we help?
        </h1>
        <p
          className="text-base sm:text-lg max-w-2xl mx-auto"
          style={{ color: "var(--color-text-secondary)" }}
        >
          Whether you've hit a snag, have a suggestion, or just want to say hi
          — we're listening.
        </p>
      </section>

      <section className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {HELP_TOPICS.map((t) => {
            const isInternal = t.link.startsWith("/");
            const content = (
              <>
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 text-xl"
                  style={{
                    backgroundColor: `color-mix(in srgb, ${t.accent} 15%, transparent)`,
                    color: t.accent,
                  }}
                >
                  <i className={`fas ${t.icon}`} />
                </div>
                <h3
                  className="font-bold text-lg mb-2"
                  style={{ color: "var(--color-text)" }}
                >
                  {t.title}
                </h3>
                <p
                  className="text-sm leading-relaxed mb-4 flex-1"
                  style={{ color: "var(--color-text-secondary)" }}
                >
                  {t.text}
                </p>
                <span
                  className="text-sm font-semibold flex items-center gap-1"
                  style={{ color: t.accent }}
                >
                  {t.linkLabel}
                  <i className="fas fa-arrow-right text-xs" />
                </span>
              </>
            );
            const base =
              "rounded-2xl p-6 border transition-transform hover:-translate-y-1 flex flex-col text-left h-full";
            const style = {
              backgroundColor: "var(--color-card-dark)",
              borderColor: "var(--color-border-dark)",
            };
            return isInternal ? (
              <Link key={t.title} to={t.link} className={base} style={style}>
                {content}
              </Link>
            ) : (
              <a key={t.title} href={t.link} className={base} style={style}>
                {content}
              </a>
            );
          })}
        </div>
      </section>

      <section
        id="contact"
        className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-20"
      >
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div
            className="lg:col-span-1 rounded-2xl p-6 border"
            style={{
              backgroundColor: "var(--color-card-dark)",
              borderColor: "var(--color-border-dark)",
            }}
          >
            <h3
              className="text-xl font-bold mb-5"
              style={{ color: "var(--color-text)" }}
            >
              Reach out directly
            </h3>
            <div className="space-y-4">
              {CONTACT_CHANNELS.map((c) => (
                <div key={c.label} className="flex items-start gap-3">
                  <div
                    className="w-10 h-10 shrink-0 rounded-xl flex items-center justify-center"
                    style={{
                      backgroundColor: "rgba(16, 185, 129, 0.15)",
                      color: "var(--color-success)",
                    }}
                  >
                    <i className={`fas ${c.icon}`} />
                  </div>
                  <div className="min-w-0">
                    <div
                      className="text-xs uppercase tracking-wide font-semibold mb-1"
                      style={{ color: "var(--color-text-secondary)" }}
                    >
                      {c.label}
                    </div>
                    {c.href ? (
                      <a
                        href={c.href}
                        className="text-sm break-all hover:underline"
                        style={{ color: "var(--color-text)" }}
                      >
                        {c.value}
                      </a>
                    ) : (
                      <div
                        className="text-sm"
                        style={{ color: "var(--color-text)" }}
                      >
                        {c.value}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
            <div
              className="mt-6 pt-6 border-t text-sm leading-relaxed"
              style={{
                borderColor: "var(--color-border-dark)",
                color: "var(--color-text-secondary)",
              }}
            >
              Chirpy is a personal project — messages come straight to a human,
              not a ticketing system.
            </div>
          </div>

          <form
            onSubmit={handleSubmit}
            className="lg:col-span-2 rounded-2xl p-6 border"
            style={{
              backgroundColor: "var(--color-card-dark)",
              borderColor: "var(--color-border-dark)",
            }}
          >
            <h3
              className="text-xl font-bold mb-5"
              style={{ color: "var(--color-text)" }}
            >
              Send us a message
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
              <FormField
                label="Your name"
                value={form.name}
                onChange={(v) => setForm({ ...form, name: v })}
                placeholder="Jane Birder"
                required
              />
              <FormField
                label="Email"
                type="email"
                value={form.email}
                onChange={(v) => setForm({ ...form, email: v })}
                placeholder="you@example.com"
                required
              />
            </div>
            <div className="mb-4">
              <FormField
                label="Subject"
                value={form.subject}
                onChange={(v) => setForm({ ...form, subject: v })}
                placeholder="What's this about?"
                required
              />
            </div>
            <div className="mb-5">
              <label
                className="block text-xs font-semibold uppercase tracking-wide mb-2"
                style={{ color: "var(--color-text-secondary)" }}
              >
                Message
              </label>
              <textarea
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                required
                rows={5}
                placeholder="Tell us what's going on..."
                className="w-full rounded-xl border px-4 py-3 text-sm focus:outline-none focus:ring-2 resize-y"
                style={{
                  backgroundColor: "var(--color-bg-dark)",
                  color: "var(--color-text)",
                  borderColor: "var(--color-border-dark)",
                }}
              />
            </div>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <p
                className="text-xs"
                style={{ color: "var(--color-text-secondary)" }}
              >
                We typically respond within 48 hours.
              </p>
              <button
                type="submit"
                className="px-6 py-3 rounded-full font-semibold transition-transform hover:scale-105"
                style={{
                  backgroundColor: "var(--color-success)",
                  color: "#ffffff",
                }}
              >
                <i className="fas fa-paper-plane mr-2" />
                Send message
              </button>
            </div>

            {submitted && (
              <div
                className="mt-5 rounded-xl p-4 border text-sm flex items-center gap-3"
                style={{
                  backgroundColor: "rgba(16, 185, 129, 0.1)",
                  borderColor: "var(--color-success)",
                  color: "var(--color-success)",
                }}
              >
                <i className="fas fa-check-circle" />
                Thanks — your message has been queued. We'll get back to you
                soon.
              </div>
            )}
          </form>
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
            className="fas fa-dove text-4xl mb-3"
            style={{ color: "var(--color-success)" }}
          />
          <h2
            className="text-2xl font-bold mb-2"
            style={{ color: "var(--color-text)" }}
          >
            While you wait — go meet some birds
          </h2>
          <p
            className="mb-5"
            style={{ color: "var(--color-text-secondary)" }}
          >
            The encyclopedia has 11,000+ species ready to explore.
          </p>
          <Link
            to="/birds"
            className="inline-block px-6 py-3 rounded-full font-semibold transition-transform hover:scale-105"
            style={{
              backgroundColor: "var(--color-success)",
              color: "#ffffff",
            }}
          >
            <i className="fas fa-binoculars mr-2" />
            Open the Encyclopedia
          </Link>
        </div>
      </section>
    </main>
  );
}

function FormField({
  label,
  type = "text",
  value,
  onChange,
  placeholder,
  required,
}: {
  label: string;
  type?: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label
        className="block text-xs font-semibold uppercase tracking-wide mb-2"
        style={{ color: "var(--color-text-secondary)" }}
      >
        {label}
      </label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        required={required}
        className="w-full rounded-xl border px-4 py-3 text-sm focus:outline-none focus:ring-2"
        style={{
          backgroundColor: "var(--color-bg-dark)",
          color: "var(--color-text)",
          borderColor: "var(--color-border-dark)",
        }}
      />
    </div>
  );
}
