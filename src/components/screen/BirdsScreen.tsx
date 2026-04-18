import { useCallback, useEffect, useMemo, useState } from "react";
import type { Bird } from "../../types/Bird";
import {
  fetchBirdsPage,
  fetchTopFamilies,
  fetchWikimediaImage,
} from "../../services/ebirdService";
import { useFavorites } from "../../hooks/useFavorites";
import SearchBar from "../layout/elements/SearchBar";
import CategoryFilter from "../layout/elements/CategoryFilter";
import BirdsHero from "../layout/elements/BirdsHero";
import noimage from "../../assets/images/noimage.png";
import BirdModal from "../layout/modals/BirdModal";
import QuizModal from "../layout/modals/QuizModal";

const PAGE_SIZE = 8;
const MAX_PAGE_BUTTONS = 5;

const BirdCard = ({
  bird,
  onClick,
  isFavorite,
  onToggleFavorite,
}: {
  bird: Bird;
  onClick: (b: Bird) => void;
  isFavorite: boolean;
  onToggleFavorite: (code: string) => void;
}) => {
  const [pulse, setPulse] = useState(false);

  const handleFav = (e: React.MouseEvent) => {
    e.stopPropagation();
    onToggleFavorite(bird.speciesCode);
    setPulse(true);
    setTimeout(() => setPulse(false), 350);
  };

  return (
    <div
      onClick={() => onClick(bird)}
      className="bird-card border rounded-2xl overflow-hidden shadow-lg cursor-pointer flex flex-col"
      style={{
        backgroundColor: "var(--color-card-dark)",
        borderColor: "var(--color-border-dark)",
        color: "var(--color-text)",
      }}
    >
      <div className="relative h-48 overflow-hidden bg-gray-800">
        {bird.imageUrl ? (
          <img
            src={bird.imageUrl}
            alt={bird.commonName}
            loading="lazy"
            onError={(e) => (e.currentTarget.src = noimage)}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full shimmer" />
        )}

        <button
          onClick={handleFav}
          aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
          className={`absolute top-3 right-3 w-9 h-9 rounded-full flex items-center justify-center backdrop-blur-sm transition-colors ${
            pulse ? "fav-pulse" : ""
          }`}
          style={{
            backgroundColor: "rgba(17, 24, 39, 0.7)",
            color: isFavorite ? "#ef4444" : "#f9fafb",
          }}
        >
          <i className={`${isFavorite ? "fas" : "far"} fa-heart`} />
        </button>

        {bird.category && (
          <span
            className="absolute bottom-3 left-3 text-xs font-semibold uppercase tracking-wide px-2.5 py-1 rounded-full backdrop-blur-sm"
            style={{
              backgroundColor: "rgba(16, 185, 129, 0.85)",
              color: "#ffffff",
            }}
          >
            {bird.category}
          </span>
        )}
      </div>

      <div className="p-5 flex-1 flex flex-col">
        <h2 className="text-xl font-bold mb-1 truncate">{bird.commonName}</h2>
        <p
          className="italic text-sm mb-3 truncate"
          style={{ color: "var(--color-text-secondary)" }}
        >
          {bird.scientificName}
        </p>

        <div
          className="mt-auto pt-3 border-t text-xs space-y-1"
          style={{ borderColor: "var(--color-border-dark)" }}
        >
          <p className="flex items-center gap-2">
            <i
              className="fas fa-sitemap w-4"
              style={{ color: "var(--color-success)" }}
            />
            <span style={{ color: "var(--color-text-secondary)" }}>
              {bird.order || "Unknown order"}
            </span>
          </p>
          <p className="reveal-on-hover flex items-center gap-2">
            <i
              className="fas fa-dove w-4"
              style={{ color: "var(--color-success)" }}
            />
            <span style={{ color: "var(--color-text-secondary)" }}>
              {bird.family || "Unknown family"}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export function BirdsScreen() {
  const [birds, setBirds] = useState<Bird[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [family, setFamily] = useState("");
  const [families, setFamilies] = useState<string[]>([]);
  const [favoritesOnly, setFavoritesOnly] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [totalBirds, setTotalBirds] = useState(0);

  const [selectedBird, setSelectedBird] = useState<Bird | null>(null);
  const [showQuiz, setShowQuiz] = useState(false);

  const { favorites, toggleFavorite, isFavorite } = useFavorites();

  useEffect(() => {
    fetchTopFamilies()
      .then(setFamilies)
      .catch(() => setFamilies([]));
  }, []);

  const fetchBirdImages = useCallback(async (birdsToUpdate: Bird[]) => {
    await Promise.all(
      birdsToUpdate.map(async (bird) => {
        const imageUrl = await fetchWikimediaImage(bird.scientificName);
        setBirds((prev) => {
          const idx = prev.findIndex((b) => b.speciesCode === bird.speciesCode);
          if (idx === -1) return prev;
          const next = [...prev];
          next[idx] = {
            ...next[idx],
            imageUrl:
              imageUrl ??
              `https://via.placeholder.com/400x300?text=${encodeURIComponent(
                bird.commonName
              )}`,
          };
          return next;
        });
      })
    );
  }, []);

  useEffect(() => {
    if (favoritesOnly) return;
    const load = async () => {
      setLoading(true);
      setError(null);
      try {
        const { birds: pageBirds, total } = await fetchBirdsPage(
          currentPage,
          PAGE_SIZE,
          searchTerm,
          family
        );
        setBirds(pageBirds);
        setTotalBirds(total);
        fetchBirdImages(pageBirds);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Unknown error");
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [currentPage, searchTerm, family, favoritesOnly, fetchBirdImages]);

  useEffect(() => {
    if (!favoritesOnly) return;
    let cancelled = false;
    const load = async () => {
      if (favorites.length === 0) {
        setBirds([]);
        setTotalBirds(0);
        setLoading(false);
        return;
      }
      setLoading(true);
      setError(null);
      try {
        // Pull everything, then keep favorites — taxonomy is already cached
        const { birds: all } = await fetchBirdsPage(1, 100000, "", "");
        const favBirds = all.filter((b) => favorites.includes(b.speciesCode));
        if (cancelled) return;
        setBirds(favBirds);
        setTotalBirds(favBirds.length);
        fetchBirdImages(favBirds);
      } catch (err) {
        if (!cancelled)
          setError(err instanceof Error ? err.message : "Unknown error");
      } finally {
        if (!cancelled) setLoading(false);
      }
    };
    load();
    return () => {
      cancelled = true;
    };
  }, [favoritesOnly, favorites, fetchBirdImages]);

  const totalPages = Math.max(1, Math.ceil(totalBirds / PAGE_SIZE));

  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages) setCurrentPage(page);
  };

  const pageButtons = useMemo(() => {
    const buttons: number[] = [];
    let start = Math.max(currentPage - Math.floor(MAX_PAGE_BUTTONS / 2), 1);
    let end = start + MAX_PAGE_BUTTONS - 1;
    if (end > totalPages) {
      end = totalPages;
      start = Math.max(end - MAX_PAGE_BUTTONS + 1, 1);
    }
    for (let i = start; i <= end; i++) buttons.push(i);
    return buttons;
  }, [currentPage, totalPages]);

  const showPagination = !favoritesOnly && totalBirds > PAGE_SIZE;

  return (
    <section
      style={{
        backgroundColor: "var(--color-bg-dark)",
        color: "var(--color-text)",
      }}
      className="pt-28 w-full px-4 sm:px-6 lg:px-12 min-h-screen pb-20"
    >
      <div className="max-w-7xl mx-auto">
        <BirdsHero
          onSelect={(b) => setSelectedBird(b)}
          onStartQuiz={() => setShowQuiz(true)}
        />

        <div className="mb-6 max-w-3xl mx-auto flex flex-col sm:flex-row items-stretch gap-3">
          <div className="flex-1">
            <SearchBar
              searchTerm={searchTerm}
              setSearchTerm={(term) => {
                if (!loading) {
                  setSearchTerm(term);
                  setCurrentPage(1);
                }
              }}
              disabled={loading}
            />
          </div>
          <button
            onClick={() => {
              setFavoritesOnly((v) => !v);
              setCurrentPage(1);
            }}
            className="shrink-0 px-5 py-3 rounded-full text-sm font-semibold transition-all border hover:scale-105 flex items-center justify-center gap-2"
            style={{
              backgroundColor: favoritesOnly
                ? "#ef4444"
                : "var(--color-card-dark)",
              color: favoritesOnly ? "#ffffff" : "var(--color-text)",
              borderColor: favoritesOnly ? "#ef4444" : "var(--color-border-dark)",
            }}
          >
            <i className={`${favoritesOnly ? "fas" : "far"} fa-heart`} />
            <span>Favorites</span>
            <span
              className="px-2 py-0.5 rounded-full text-xs"
              style={{
                backgroundColor: favoritesOnly
                  ? "rgba(255,255,255,0.25)"
                  : "var(--color-bg-dark)",
              }}
            >
              {favorites.length}
            </span>
          </button>
        </div>

        {!favoritesOnly && families.length > 0 && (
          <div className="mb-8">
            <CategoryFilter
              categories={families}
              active={family}
              onChange={(f) => {
                setFamily(f);
                setCurrentPage(1);
              }}
              disabled={loading}
            />
          </div>
        )}

        {loading ? (
          <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
            {Array.from({ length: PAGE_SIZE }).map((_, i) => (
              <div
                key={i}
                className="border rounded-2xl overflow-hidden shadow-lg"
                style={{
                  backgroundColor: "var(--color-card-dark)",
                  borderColor: "var(--color-border-dark)",
                }}
              >
                <div className="w-full h-48 shimmer" />
                <div className="p-5 space-y-3">
                  <div className="h-5 w-3/4 rounded shimmer" />
                  <div className="h-4 w-1/2 rounded shimmer" />
                  <div className="h-3 w-full rounded shimmer" />
                </div>
              </div>
            ))}
          </div>
        ) : error ? (
          <div
            className="p-8 max-w-xl mx-auto rounded-2xl border text-center"
            style={{
              borderColor: "#ef4444",
              backgroundColor: "rgba(239, 68, 68, 0.08)",
            }}
          >
            <i
              className="fas fa-exclamation-triangle text-4xl mb-3"
              style={{ color: "#ef4444" }}
            />
            <h2 className="text-2xl font-semibold mb-2">
              Something went wrong
            </h2>
            <p style={{ color: "var(--color-text-secondary)" }}>{error}</p>
          </div>
        ) : birds.length === 0 ? (
          <div className="text-center py-16">
            <img
              src={noimage}
              alt=""
              className="w-32 h-32 mx-auto mb-4 opacity-40"
            />
            <h3 className="text-2xl font-semibold mb-2">
              {favoritesOnly
                ? "No favorites yet"
                : `No birds found for "${searchTerm}"`}
            </h3>
            <p style={{ color: "var(--color-text-secondary)" }}>
              {favoritesOnly
                ? "Tap the heart on any bird to save it here."
                : "Try another name, family, or category."}
            </p>
          </div>
        ) : (
          <>
            <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
              {birds.map((bird) => (
                <BirdCard
                  key={bird.speciesCode}
                  bird={bird}
                  onClick={setSelectedBird}
                  isFavorite={isFavorite(bird.speciesCode)}
                  onToggleFavorite={toggleFavorite}
                />
              ))}
            </div>

            {showPagination && (
              <div className="flex flex-wrap justify-center items-center mt-12 gap-2 sm:gap-3">
                <button
                  onClick={() => goToPage(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="px-4 py-2 rounded-lg border disabled:opacity-40 disabled:cursor-not-allowed transition-colors hover:border-green-500"
                  style={{
                    borderColor: "var(--color-border-dark)",
                    backgroundColor: "var(--color-card-dark)",
                    color: "var(--color-text)",
                  }}
                >
                  <i className="fas fa-chevron-left mr-2" />
                  Previous
                </button>

                {pageButtons.map((page) => (
                  <button
                    key={page}
                    onClick={() => goToPage(page)}
                    className="w-10 h-10 rounded-lg border transition-colors font-semibold"
                    style={{
                      borderColor:
                        page === currentPage
                          ? "var(--color-success)"
                          : "var(--color-border-dark)",
                      backgroundColor:
                        page === currentPage
                          ? "var(--color-success)"
                          : "var(--color-card-dark)",
                      color:
                        page === currentPage ? "#ffffff" : "var(--color-text)",
                    }}
                  >
                    {page}
                  </button>
                ))}

                <button
                  onClick={() => goToPage(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="px-4 py-2 rounded-lg border disabled:opacity-40 disabled:cursor-not-allowed transition-colors hover:border-green-500"
                  style={{
                    borderColor: "var(--color-border-dark)",
                    backgroundColor: "var(--color-card-dark)",
                    color: "var(--color-text)",
                  }}
                >
                  Next
                  <i className="fas fa-chevron-right ml-2" />
                </button>
              </div>
            )}

            {!favoritesOnly && (
              <p
                className="text-center mt-6 text-sm"
                style={{ color: "var(--color-text-secondary)" }}
              >
                Showing {(currentPage - 1) * PAGE_SIZE + 1}–
                {Math.min(currentPage * PAGE_SIZE, totalBirds)} of{" "}
                {totalBirds.toLocaleString()} birds
              </p>
            )}
          </>
        )}
      </div>

      {selectedBird && (
        <BirdModal
          bird={selectedBird}
          onClose={() => setSelectedBird(null)}
          onSelectSimilar={setSelectedBird}
          isFavorite={isFavorite(selectedBird.speciesCode)}
          onToggleFavorite={toggleFavorite}
        />
      )}

      {showQuiz && <QuizModal onClose={() => setShowQuiz(false)} />}
    </section>
  );
}
