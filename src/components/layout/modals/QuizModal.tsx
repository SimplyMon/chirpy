import { useCallback, useEffect, useState } from "react";
import type { Bird } from "../../../types/Bird";
import {
  fetchQuizOptions,
  fetchWikimediaImage,
} from "../../../services/ebirdService";
import noimage from "../../../assets/images/noimage.png";

interface Props {
  onClose: () => void;
}

interface Round {
  answer: Bird;
  options: Bird[];
  imageUrl: string | null;
}

const OPTIONS_PER_ROUND = 4;

export default function QuizModal({ onClose }: Props) {
  const [round, setRound] = useState<Round | null>(null);
  const [loading, setLoading] = useState(true);
  const [picked, setPicked] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [best, setBest] = useState(() => {
    try {
      return parseInt(localStorage.getItem("chirpy:quizBest:v1") ?? "0", 10);
    } catch {
      return 0;
    }
  });

  const loadRound = useCallback(async () => {
    setLoading(true);
    setPicked(null);

    let options: Bird[] = [];
    let image: string | null = null;

    for (let attempt = 0; attempt < 5; attempt++) {
      options = await fetchQuizOptions(OPTIONS_PER_ROUND);
      const answer = options[Math.floor(Math.random() * options.length)];
      image = await fetchWikimediaImage(answer.scientificName);
      if (image) {
        setRound({ answer, options, imageUrl: image });
        setLoading(false);
        return;
      }
    }

    const answer = options[0];
    setRound({ answer, options, imageUrl: null });
    setLoading(false);
  }, []);

  useEffect(() => {
    loadRound();
  }, [loadRound]);

  const handlePick = (speciesCode: string) => {
    if (picked || !round) return;
    setPicked(speciesCode);
    if (speciesCode === round.answer.speciesCode) {
      setScore((s) => s + 1);
      setStreak((s) => {
        const next = s + 1;
        if (next > best) {
          setBest(next);
          try {
            localStorage.setItem("chirpy:quizBest:v1", String(next));
          } catch {
            // ignore
          }
        }
        return next;
      });
    } else {
      setStreak(0);
    }
  };

  const isCorrect = picked && round && picked === round.answer.speciesCode;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4 animate-fade-in"
      onClick={onClose}
    >
      <div
        className="rounded-2xl shadow-2xl max-w-2xl w-full p-6 md:p-8 animate-slide-up max-h-[90vh] overflow-y-auto modal-scrollbar"
        style={{
          backgroundColor: "var(--color-card-dark)",
          color: "var(--color-text)",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-extrabold flex items-center gap-2">
              <i
                className="fas fa-graduation-cap"
                style={{ color: "var(--color-success)" }}
              />
              Bird Quiz
            </h2>
            <p
              className="text-sm"
              style={{ color: "var(--color-text-secondary)" }}
            >
              Name the bird from its photo
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-2xl"
            style={{ color: "var(--color-text-secondary)" }}
            aria-label="Close quiz"
          >
            <i className="fas fa-times" />
          </button>
        </div>

        <div className="flex gap-2 mb-5 text-sm font-semibold flex-wrap">
          <span
            className="px-3 py-1 rounded-full"
            style={{
              backgroundColor: "rgba(16,185,129,0.15)",
              color: "var(--color-success)",
            }}
          >
            Score: {score}
          </span>
          <span
            className="px-3 py-1 rounded-full"
            style={{
              backgroundColor: "rgba(59,130,246,0.15)",
              color: "var(--color-primary)",
            }}
          >
            Streak: {streak}
          </span>
          <span
            className="px-3 py-1 rounded-full"
            style={{
              backgroundColor: "rgba(245,158,11,0.15)",
              color: "#f59e0b",
            }}
          >
            Best: {best}
          </span>
        </div>

        <div
          className="relative rounded-2xl overflow-hidden mb-5 aspect-video"
          style={{ backgroundColor: "rgba(0,0,0,0.3)" }}
        >
          {loading ? (
            <div className="w-full h-full shimmer" />
          ) : (
            <img
              src={round?.imageUrl ?? noimage}
              alt="Which bird is this?"
              className="w-full h-full object-cover"
              onError={(e) => (e.currentTarget.src = noimage)}
            />
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-5">
          {loading || !round
            ? Array.from({ length: OPTIONS_PER_ROUND }).map((_, i) => (
                <div key={i} className="h-14 rounded-xl shimmer" />
              ))
            : round.options.map((opt) => {
                const selected = picked === opt.speciesCode;
                const correct = opt.speciesCode === round.answer.speciesCode;
                let bg = "var(--color-bg-dark)";
                let border = "var(--color-border-dark)";
                if (picked) {
                  if (correct) {
                    bg = "rgba(16,185,129,0.2)";
                    border = "var(--color-success)";
                  } else if (selected) {
                    bg = "rgba(239,68,68,0.2)";
                    border = "#ef4444";
                  }
                }
                return (
                  <button
                    key={opt.speciesCode}
                    onClick={() => handlePick(opt.speciesCode)}
                    disabled={!!picked}
                    className="px-4 py-3 rounded-xl text-left font-medium transition-all border hover:scale-[1.02] disabled:cursor-default"
                    style={{
                      backgroundColor: bg,
                      borderColor: border,
                      color: "var(--color-text)",
                    }}
                  >
                    {opt.commonName}
                  </button>
                );
              })}
        </div>

        {picked && round && (
          <div
            className="p-4 rounded-xl mb-5 border animate-fade-in"
            style={{
              backgroundColor: isCorrect
                ? "rgba(16,185,129,0.1)"
                : "rgba(239,68,68,0.1)",
              borderColor: isCorrect ? "var(--color-success)" : "#ef4444",
            }}
          >
            <p className="font-bold mb-1">
              {isCorrect ? "Nice spotting!" : "Not quite."}
            </p>
            <p
              className="text-sm"
              style={{ color: "var(--color-text-secondary)" }}
            >
              The answer was{" "}
              <span
                className="font-semibold italic"
                style={{ color: "var(--color-text)" }}
              >
                {round.answer.commonName}
              </span>{" "}
              ({round.answer.scientificName}).
            </p>
          </div>
        )}

        <div className="flex gap-3">
          <button
            onClick={loadRound}
            className="flex-1 px-5 py-3 rounded-xl font-semibold transition-transform hover:scale-[1.02]"
            style={{
              backgroundColor: "var(--color-success)",
              color: "#ffffff",
            }}
          >
            {picked ? "Next Bird" : "Skip"}
          </button>
          <button
            onClick={onClose}
            className="px-5 py-3 rounded-xl font-semibold border"
            style={{
              backgroundColor: "var(--color-bg-dark)",
              color: "var(--color-text)",
              borderColor: "var(--color-border-dark)",
            }}
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
}
