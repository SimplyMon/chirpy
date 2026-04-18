import { useEffect, useState } from "react";
import type { Bird } from "../../../types/Bird";
import {
  fetchRandomBird,
  fetchTotalSpeciesCount,
  fetchWikimediaImage,
} from "../../../services/ebirdService";
import noimage from "../../../assets/images/noimage.png";

interface Props {
  onSelect: (bird: Bird) => void;
  onStartQuiz: () => void;
}

const DAILY_KEY = "chirpy:birdOfTheDay:v1";

interface DailyEntry {
  date: string;
  bird: Bird;
}

const todayKey = () => new Date().toISOString().slice(0, 10);

const readDaily = (): DailyEntry | null => {
  try {
    const raw = localStorage.getItem(DAILY_KEY);
    return raw ? (JSON.parse(raw) as DailyEntry) : null;
  } catch {
    return null;
  }
};

const writeDaily = (entry: DailyEntry) => {
  try {
    localStorage.setItem(DAILY_KEY, JSON.stringify(entry));
  } catch {
    // ignore
  }
};

export default function BirdsHero({ onSelect, onStartQuiz }: Props) {
  const [bird, setBird] = useState<Bird | null>(null);
  const [total, setTotal] = useState<number | null>(null);

  useEffect(() => {
    let cancelled = false;

    const load = async () => {
      const cached = readDaily();
      let todayBird: Bird;

      if (cached && cached.date === todayKey()) {
        todayBird = cached.bird;
      } else {
        todayBird = await fetchRandomBird();
        writeDaily({ date: todayKey(), bird: todayBird });
      }

      if (!todayBird.imageUrl) {
        const img = await fetchWikimediaImage(todayBird.scientificName);
        if (img) {
          todayBird = { ...todayBird, imageUrl: img };
          writeDaily({ date: todayKey(), bird: todayBird });
        }
      }

      if (!cancelled) setBird(todayBird);

      const count = await fetchTotalSpeciesCount();
      if (!cancelled) setTotal(count);
    };

    load();
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <div className="relative overflow-hidden rounded-3xl mb-10 border"
      style={{
        borderColor: "var(--color-border-dark)",
        background:
          "linear-gradient(135deg, rgba(16, 185, 129, 0.15), rgba(31, 41, 55, 0.6))",
      }}
    >
      <div className="grid md:grid-cols-2 gap-6 p-6 md:p-10">
        <div className="flex flex-col justify-center gap-5">
          <div>
            <span
              className="inline-block text-xs font-bold tracking-widest uppercase mb-3 px-3 py-1 rounded-full"
              style={{
                backgroundColor: "rgba(16, 185, 129, 0.15)",
                color: "var(--color-success)",
                border: "1px solid var(--color-success)",
              }}
            >
              Bird of the Day
            </span>
            <h1
              className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-2"
              style={{ color: "var(--color-text)" }}
            >
              {bird?.commonName ?? "Discover a new bird"}
            </h1>
            <p
              className="italic text-lg"
              style={{ color: "var(--color-text-secondary)" }}
            >
              {bird?.scientificName ?? "Loading a surprise pick..."}
            </p>
          </div>

          <p
            className="text-sm max-w-md"
            style={{ color: "var(--color-text-secondary)" }}
          >
            Explore{" "}
            <span
              className="font-bold"
              style={{ color: "var(--color-success)" }}
            >
              {total !== null ? total.toLocaleString() : "..."}
            </span>{" "}
            species from the global eBird taxonomy. Learn calls, habitats, and
            conservation stories.
          </p>

          <div className="flex flex-wrap gap-3">
            <button
              disabled={!bird}
              onClick={() => bird && onSelect(bird)}
              className="px-5 py-2.5 rounded-full font-semibold text-sm transition-transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
              style={{
                backgroundColor: "var(--color-success)",
                color: "#ffffff",
              }}
            >
              <i className="fas fa-feather mr-2" />
              Meet Today's Bird
            </button>
            <button
              onClick={onStartQuiz}
              className="px-5 py-2.5 rounded-full font-semibold text-sm transition-transform hover:scale-105 border"
              style={{
                backgroundColor: "var(--color-card-dark)",
                color: "var(--color-text)",
                borderColor: "var(--color-border-dark)",
              }}
            >
              <i className="fas fa-graduation-cap mr-2" />
              Play Quiz
            </button>
          </div>
        </div>

        <div className="relative aspect-video md:aspect-auto md:h-72 rounded-2xl overflow-hidden shadow-xl">
          {bird?.imageUrl ? (
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
                "linear-gradient(to top, rgba(17,24,39,0.6) 0%, transparent 40%)",
            }}
          />
        </div>
      </div>
    </div>
  );
}
