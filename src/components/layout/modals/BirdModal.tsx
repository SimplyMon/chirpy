import { useEffect, useState } from "react";
import noimage from "../../../assets/images/noimage.png";
import type { Bird, BirdDetails } from "../../../types/Bird";
import {
  fetchBirdDetails,
  fetchSimilarBirds,
  fetchWikimediaImage,
} from "../../../services/ebirdService";
import ConservationBadge from "../elements/ConservationBadge";

interface BirdModalProps {
  bird: Bird;
  onClose: () => void;
  onSelectSimilar?: (bird: Bird) => void;
  isFavorite?: boolean;
  onToggleFavorite?: (speciesCode: string) => void;
}

const emptyDetails: BirdDetails = {
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

export default function BirdModal({
  bird,
  onClose,
  onSelectSimilar,
  isFavorite = false,
  onToggleFavorite,
}: BirdModalProps) {
  const [details, setDetails] = useState<BirdDetails>(emptyDetails);
  const [loading, setLoading] = useState(true);
  const [similar, setSimilar] = useState<Bird[]>([]);
  const [similarWithImages, setSimilarWithImages] = useState<Bird[]>([]);

  useEffect(() => {
    let cancelled = false;
    setDetails(emptyDetails);
    setSimilar([]);
    setSimilarWithImages([]);
    setLoading(true);

    Promise.all([
      fetchBirdDetails(bird.scientificName),
      fetchSimilarBirds(bird, 4),
    ]).then(([d, s]) => {
      if (cancelled) return;
      setDetails(d);
      setSimilar(s);
      setSimilarWithImages(s);
      setLoading(false);

      // Lazy-load similar bird images
      s.forEach(async (sb) => {
        const url = await fetchWikimediaImage(sb.scientificName);
        if (cancelled) return;
        setSimilarWithImages((prev) => {
          const idx = prev.findIndex(
            (b) => b.speciesCode === sb.speciesCode
          );
          if (idx === -1) return prev;
          const next = [...prev];
          next[idx] = { ...next[idx], imageUrl: url ?? undefined };
          return next;
        });
      });
    });

    return () => {
      cancelled = true;
    };
  }, [bird]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4 animate-fade-in"
      onClick={onClose}
    >
      <div
        className="rounded-3xl shadow-2xl overflow-y-auto max-h-[90vh] w-full max-w-5xl relative animate-slide-up modal-scrollbar"
        style={{
          backgroundColor: "var(--color-card-dark)",
          color: "var(--color-text)",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-10 h-10 rounded-full flex items-center justify-center z-10 backdrop-blur-sm transition-transform hover:scale-110"
          style={{
            backgroundColor: "rgba(17, 24, 39, 0.7)",
            color: "#f9fafb",
          }}
          aria-label="Close"
        >
          <i className="fas fa-times" />
        </button>

        <div className="grid md:grid-cols-2 gap-0">
          <div className="relative h-64 md:h-auto md:min-h-[460px] bg-gray-900">
            {bird.imageUrl ? (
              <img
                src={bird.imageUrl}
                alt={bird.commonName}
                className="w-full h-full object-cover"
                onError={(e) => (e.currentTarget.src = noimage)}
              />
            ) : (
              <div className="w-full h-full shimmer" />
            )}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background:
                  "linear-gradient(to top, rgba(31,41,55,0.9) 0%, transparent 35%)",
              }}
            />
            <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between gap-3">
              <div className="min-w-0">
                <h2 className="text-2xl md:text-3xl font-extrabold leading-tight drop-shadow-lg">
                  {bird.commonName}
                </h2>
                <p className="italic text-sm opacity-90 drop-shadow">
                  {bird.scientificName}
                </p>
              </div>
              {onToggleFavorite && (
                <button
                  onClick={() => onToggleFavorite(bird.speciesCode)}
                  aria-label={
                    isFavorite ? "Remove from favorites" : "Add to favorites"
                  }
                  className="w-11 h-11 rounded-full flex items-center justify-center backdrop-blur-sm shrink-0 transition-transform hover:scale-110"
                  style={{
                    backgroundColor: "rgba(17, 24, 39, 0.7)",
                    color: isFavorite ? "#ef4444" : "#f9fafb",
                  }}
                >
                  <i
                    className={`${isFavorite ? "fas" : "far"} fa-heart text-lg`}
                  />
                </button>
              )}
            </div>
          </div>

          <div className="p-6 md:p-8 flex flex-col gap-5">
            <div className="flex flex-wrap gap-2">
              {loading ? (
                <div className="h-6 w-24 rounded-full shimmer" />
              ) : (
                <ConservationBadge
                  status={details.conservation}
                  size="md"
                />
              )}
              {bird.category && (
                <span
                  className="inline-flex items-center text-xs font-semibold uppercase tracking-wide px-3 py-1 rounded-full"
                  style={{
                    backgroundColor: "rgba(59, 130, 246, 0.15)",
                    color: "var(--color-primary)",
                    border: "1px solid var(--color-primary)",
                  }}
                >
                  {bird.category}
                </span>
              )}
            </div>

            <div className="grid grid-cols-2 gap-3 text-sm">
              <Stat
                icon="fa-sitemap"
                label="Order"
                value={bird.order || "Unknown"}
              />
              <Stat
                icon="fa-dove"
                label="Family"
                value={bird.family || "Unknown"}
              />
              <Stat
                icon="fa-weight-hanging"
                label="Weight"
                value={loading ? null : details.mass || "—"}
              />
              <Stat
                icon="fa-ruler"
                label="Length"
                value={loading ? null : details.length || "—"}
              />
            </div>

            <div className="space-y-3 text-sm">
              <InfoRow
                icon="fa-tree"
                color="var(--color-success)"
                label="Habitat"
                value={details.habitat}
                loading={loading}
              />
              <InfoRow
                icon="fa-globe"
                color="var(--color-primary)"
                label="Region"
                value={details.region}
                loading={loading}
              />
              <InfoRow
                icon="fa-utensils"
                color="#f59e0b"
                label="Diet"
                value={details.diet}
                loading={loading}
              />
            </div>

            {!loading && details.funFact && (
              <div
                className="p-4 rounded-xl border"
                style={{
                  backgroundColor: "rgba(16, 185, 129, 0.12)",
                  borderColor: "var(--color-success)",
                }}
              >
                <p
                  className="flex items-center gap-2 font-bold mb-1"
                  style={{ color: "var(--color-success)" }}
                >
                  <i className="fas fa-lightbulb" />
                  Did you know?
                </p>
                <p
                  className="text-sm"
                  style={{ color: "var(--color-text)" }}
                >
                  {details.funFact}
                </p>
              </div>
            )}

            {!loading && details.summary && (
              <details className="text-sm">
                <summary
                  className="cursor-pointer font-semibold mb-2"
                  style={{ color: "var(--color-text)" }}
                >
                  Read more
                </summary>
                <p
                  className="text-justify leading-relaxed mt-2"
                  style={{ color: "var(--color-text-secondary)" }}
                >
                  {details.summary}
                </p>
                {details.wikipediaUrl && (
                  <a
                    href={details.wikipediaUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 mt-2 text-sm font-semibold"
                    style={{ color: "var(--color-primary)" }}
                  >
                    Read full article on Wikipedia{" "}
                    <i className="fas fa-external-link-alt text-xs" />
                  </a>
                )}
              </details>
            )}
          </div>
        </div>

        {similar.length > 0 && (
          <div
            className="px-6 md:px-8 pb-8 pt-2 border-t"
            style={{ borderColor: "var(--color-border-dark)" }}
          >
            <h3 className="text-lg font-bold mt-6 mb-4 flex items-center gap-2">
              <i
                className="fas fa-feather-alt"
                style={{ color: "var(--color-success)" }}
              />
              Similar Birds
              <span
                className="text-xs font-normal"
                style={{ color: "var(--color-text-secondary)" }}
              >
                (from family {bird.family})
              </span>
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {similarWithImages.map((sb) => (
                <button
                  key={sb.speciesCode}
                  onClick={() => onSelectSimilar?.(sb)}
                  className="bird-card rounded-xl overflow-hidden border text-left"
                  style={{
                    backgroundColor: "var(--color-bg-dark)",
                    borderColor: "var(--color-border-dark)",
                  }}
                >
                  <div className="h-24 bg-gray-800 overflow-hidden">
                    {sb.imageUrl ? (
                      <img
                        src={sb.imageUrl}
                        alt={sb.commonName}
                        className="w-full h-full object-cover"
                        onError={(e) => (e.currentTarget.src = noimage)}
                      />
                    ) : (
                      <div className="w-full h-full shimmer" />
                    )}
                  </div>
                  <div className="p-2">
                    <p className="text-xs font-semibold truncate">
                      {sb.commonName}
                    </p>
                    <p
                      className="text-[10px] italic truncate"
                      style={{ color: "var(--color-text-secondary)" }}
                    >
                      {sb.scientificName}
                    </p>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function Stat({
  icon,
  label,
  value,
}: {
  icon: string;
  label: string;
  value: string | null;
}) {
  return (
    <div
      className="rounded-lg p-3 border"
      style={{
        backgroundColor: "var(--color-bg-dark)",
        borderColor: "var(--color-border-dark)",
      }}
    >
      <div
        className="text-[10px] uppercase tracking-wide font-semibold flex items-center gap-1.5 mb-1"
        style={{ color: "var(--color-text-secondary)" }}
      >
        <i className={`fas ${icon}`} style={{ color: "var(--color-success)" }} />
        {label}
      </div>
      {value === null ? (
        <div className="h-4 w-16 rounded shimmer" />
      ) : (
        <p
          className="text-sm font-semibold truncate"
          style={{ color: "var(--color-text)" }}
        >
          {value}
        </p>
      )}
    </div>
  );
}

function InfoRow({
  icon,
  color,
  label,
  value,
  loading,
}: {
  icon: string;
  color: string;
  label: string;
  value: string | null;
  loading: boolean;
}) {
  return (
    <div className="flex gap-3 items-start">
      <i
        className={`fas ${icon} mt-0.5`}
        style={{ color, minWidth: "16px" }}
      />
      <div className="flex-1 min-w-0">
        <p
          className="font-semibold text-xs uppercase tracking-wide"
          style={{ color: "var(--color-text-secondary)" }}
        >
          {label}
        </p>
        {loading ? (
          <div className="h-4 w-full rounded shimmer mt-1" />
        ) : (
          <p style={{ color: "var(--color-text)" }}>
            {value ?? (
              <span
                className="italic"
                style={{ color: "var(--color-text-secondary)" }}
              >
                Not available
              </span>
            )}
          </p>
        )}
      </div>
    </div>
  );
}
