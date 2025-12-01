import { useEffect, useState, useCallback } from "react";
import type { Bird } from "../../types/Bird";
import {
  fetchBirdsPage,
  fetchWikimediaImage,
} from "../../services/ebirdService";
import SearchBar from "../layout/elements/SearchBar";
import noimage from "../../assets/images/noimage.png";
import BirdModal from "../layout/modals/BirdModal";

const PAGE_SIZE = 8;
const MAX_PAGE_BUTTONS = 5;
const IMAGE_BATCH_SIZE = 2;

const BirdCard = ({
  bird,
  onClick,
}: {
  bird: Bird;
  onClick: (b: Bird) => void;
}) => (
  <div
    onClick={() => onClick(bird)}
    className="border rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow cursor-pointer"
    style={{
      backgroundColor: "var(--color-card-dark)",
      borderColor: "var(--color-border-dark)",
      color: "var(--color-text)",
    }}
  >
    {bird.imageUrl && (
      <img
        src={bird.imageUrl ?? noimage}
        alt={bird.commonName}
        loading="lazy"
        onError={(e) => {
          e.currentTarget.src = noimage;
        }}
        className="w-full h-48 object-contain rounded-lg mb-4 bg-gray-800"
      />
    )}

    <h2 className="text-xl sm:text-2xl font-semibold mb-2">
      {bird.commonName}
    </h2>
    <p
      className="italic mb-4 text-sm"
      style={{ color: "var(--color-text-secondary)" }}
    >
      {bird.scientificName}
    </p>
    <p className="text-sm space-y-1">
      <span>
        <span className="font-medium">Order: </span>
        {bird.order || "Unknown"}
      </span>
      <br />
      <span>
        <span className="font-medium">Category: </span>
        {bird.category || "Unknown"}
      </span>
    </p>
  </div>
);

export function BirdsScreen() {
  const [birds, setBirds] = useState<Bird[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [totalBirds, setTotalBirds] = useState(0);

  const [selectedBird, setSelectedBird] = useState<Bird | null>(null);
  const [showModal, setShowModal] = useState(false);

  const openModal = (bird: Bird) => {
    setSelectedBird(bird);
    setShowModal(true);
  };

  const closeModal = () => {
    setSelectedBird(null);
    setShowModal(false);
  };

  const fetchBirdImages = useCallback(async (birdsToUpdate: Bird[]) => {
    for (let i = 0; i < birdsToUpdate.length; i += IMAGE_BATCH_SIZE) {
      const batch = birdsToUpdate.slice(i, i + IMAGE_BATCH_SIZE);

      await Promise.all(
        batch.map(async (bird, idx) => {
          const imageUrl = await fetchWikimediaImage(bird.scientificName);

          setBirds((prev) => {
            const newBirds = [...prev];
            const updateIndex = i + idx;

            // 🔥 FIX: Prevent crash if index doesn't exist
            if (!newBirds[updateIndex]) return newBirds;

            newBirds[updateIndex] = {
              ...newBirds[updateIndex],
              imageUrl:
                imageUrl ??
                `https://via.placeholder.com/400x300?text=${encodeURIComponent(
                  bird.commonName
                )}`,
            };

            return newBirds;
          });
        })
      );
    }
  }, []);

  useEffect(() => {
    const loadBirds = async () => {
      setLoading(true);
      setError(null);

      try {
        const { birds: pageBirds, total } = await fetchBirdsPage(
          currentPage,
          PAGE_SIZE,
          searchTerm
        );

        setBirds(pageBirds);
        setTotalBirds(total);

        fetchBirdImages(pageBirds);
      } catch (err: Error | unknown) {
        const errorMessage =
          err instanceof Error ? err.message : "An unknown error occurred";
        setError(errorMessage);
      } finally {
        setLoading(false);
      }
    };

    loadBirds();
  }, [currentPage, searchTerm, fetchBirdImages]);

  const totalPages = Math.ceil(totalBirds / PAGE_SIZE);

  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages) setCurrentPage(page);
  };

  const getPageButtons = () => {
    const buttons = [];
    let startPage = Math.max(currentPage - Math.floor(MAX_PAGE_BUTTONS / 2), 1);
    let endPage = startPage + MAX_PAGE_BUTTONS - 1;

    if (endPage > totalPages) {
      endPage = totalPages;
      startPage = Math.max(endPage - MAX_PAGE_BUTTONS + 1, 1);
    }

    for (let i = startPage; i <= endPage; i++) buttons.push(i);
    return buttons;
  };

  return (
    <section
      style={{
        backgroundColor: "var(--color-bg-dark)",
        color: "var(--color-text)",
      }}
      className="pt-28 w-full px-4 sm:px-6 lg:px-12 min-h-screen"
    >
      <h1
        style={{ color: "var(--color-text)" }}
        className="text-4xl sm:text-5xl font-extrabold mb-8 text-center tracking-tight"
      >
        Bird Encyclopedia
      </h1>

      <div className="mb-10 max-w-3xl mx-auto">
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

      {loading ? (
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          {Array.from({ length: PAGE_SIZE }).map((_, i) => (
            <div
              key={i}
              className="border rounded-xl p-6 shadow-lg animate-pulse"
              style={{
                backgroundColor: "var(--color-card-dark)",
                borderColor: "var(--color-border-dark)",
              }}
            >
              <div className="w-full h-48 mb-4 rounded-lg bg-gray-700" />
              <div className="h-6 w-3/4 mb-2 rounded bg-gray-600" />
              <div className="h-4 w-1/2 mb-4 rounded bg-gray-500" />
              <div className="space-y-2">
                <div className="h-3 w-full rounded bg-gray-600" />
                <div className="h-3 w-5/6 rounded bg-gray-600" />
              </div>
            </div>
          ))}
        </div>
      ) : error ? (
        <div
          className="p-6 max-w-3xl mx-auto rounded-lg border"
          style={{
            borderColor: "var(--color-border-dark)",
            backgroundColor: "var(--color-card-dark)",
            color: "#f87171",
          }}
        >
          <h2 className="text-2xl font-semibold mb-2">Error</h2>
          <p>{error}</p>
        </div>
      ) : birds.length === 0 ? (
        <p
          style={{ color: "var(--color-text-secondary)" }}
          className="mt-6 text-center text-lg"
        >
          No birds found for "
          <span className="font-semibold">{searchTerm}</span>"
        </p>
      ) : (
        <>
          <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
            {birds.map((bird) => (
              <BirdCard
                key={bird.speciesCode}
                bird={bird}
                onClick={openModal}
              />
            ))}
          </div>

          <div className="flex flex-wrap justify-center items-center mt-12 gap-2 sm:gap-3">
            <button
              onClick={() => goToPage(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-4 py-2 rounded-lg border disabled:opacity-50 disabled:cursor-not-allowed"
              style={{
                borderColor: "var(--color-border-dark)",
                backgroundColor: "var(--color-card-dark)",
                color: "var(--color-text)",
              }}
            >
              Previous
            </button>

            {getPageButtons().map((page) => (
              <button
                key={page}
                onClick={() => goToPage(page)}
                className={`px-3 py-2 rounded-lg border transition-colors ${
                  page === currentPage ? "font-bold" : ""
                }`}
                style={{
                  borderColor: "var(--color-border-dark)",
                  backgroundColor:
                    page === currentPage
                      ? "var(--color-success)"
                      : "var(--color-card-dark)",
                  color: page === currentPage ? "white" : "var(--color-text)",
                }}
              >
                {page}
              </button>
            ))}

            <button
              onClick={() => goToPage(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="px-4 py-2 rounded-lg border disabled:opacity-50 disabled:cursor-not-allowed"
              style={{
                borderColor: "var(--color-border-dark)",
                backgroundColor: "var(--color-card-dark)",
                color: "var(--color-text)",
              }}
            >
              Next
            </button>
          </div>
        </>
      )}

      {showModal && selectedBird && (
        <BirdModal bird={selectedBird} onClose={closeModal} />
      )}
    </section>
  );
}
