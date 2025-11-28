import { useEffect, useState } from "react";
import type { Bird } from "../../types/Bird";
import { fetchBirdsPage } from "../../services/ebirdService";
import SearchBar from "../elements/SearchBar";
import noimage from "../../assets/images/noimage.png";

const PAGE_SIZE = 12;
const MAX_PAGE_BUTTONS = 5;

export function BirdsScreen() {
  const [birds, setBirds] = useState<Bird[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [totalBirds, setTotalBirds] = useState(0);

  useEffect(() => {
    const loadBirds = async () => {
      setLoading(true);
      setError(null);
      try {
        const { birds, total } = await fetchBirdsPage(
          currentPage,
          PAGE_SIZE,
          searchTerm
        );
        setBirds(birds);
        setTotalBirds(total);
      } catch (err: Error | unknown) {
        setError(
          err instanceof Error ? err.message : "An unknown error occurred"
        );
      } finally {
        setLoading(false);
      }
    };

    loadBirds();
  }, [currentPage, searchTerm]);

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
      style={{ backgroundColor: "var(--bg-light)" }}
      className="pt-28 w-full px-4 sm:px-6 lg:px-12 min-h-screen"
    >
      <h1
        style={{ color: "var(--text-primary)" }}
        className="text-4xl sm:text-5xl font-extrabold mb-8 text-center tracking-tight"
      >
        Bird Encyclopedia
      </h1>

      <div className="mb-10 max-w-3xl mx-auto">
        <SearchBar
          searchTerm={searchTerm}
          setSearchTerm={(term) => {
            setSearchTerm(term);
            setCurrentPage(1);
          }}
        />
      </div>

      {loading ? (
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          {Array.from({ length: PAGE_SIZE }).map((_, i) => (
            <div
              key={i}
              className="border rounded-xl p-6 shadow-lg animate-pulse"
              style={{
                backgroundColor: "var(--bg-card)",
                borderColor: "var(--border)",
              }}
            >
              <div
                className="h-6 w-3/4 mb-4 rounded"
                style={{ backgroundColor: "var(--text-secondary)" }}
              />
              <div
                className="h-4 w-1/2 mb-4 rounded"
                style={{ backgroundColor: "var(--text-secondary)" }}
              />
              <div className="space-y-2">
                <div
                  className="h-3 w-full rounded"
                  style={{ backgroundColor: "var(--text-secondary)" }}
                />
                <div
                  className="h-3 w-5/6 rounded"
                  style={{ backgroundColor: "var(--text-secondary)" }}
                />
                <div
                  className="h-3 w-2/3 rounded"
                  style={{ backgroundColor: "var(--text-secondary)" }}
                />
              </div>
            </div>
          ))}
        </div>
      ) : error ? (
        <div
          className="p-6 max-w-3xl mx-auto rounded-lg border"
          style={{
            borderColor: "var(--border)",
            backgroundColor: "var(--bg-card)",
            color: "red",
          }}
        >
          <h2 className="text-2xl font-semibold mb-2">Error</h2>
          <p>{error}</p>
        </div>
      ) : birds.length === 0 ? (
        <p
          style={{ color: "var(--text-secondary)" }}
          className="mt-6 text-center text-lg"
        >
          No birds found for "
          <span className="font-semibold">{searchTerm}</span>"
        </p>
      ) : (
        <>
          <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
            {birds.map((bird) => (
              <div
                key={bird.speciesCode}
                className="border rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300"
                style={{
                  backgroundColor: "var(--bg-card)",
                  borderColor: "var(--border)",
                  color: "var(--text-primary)",
                }}
              >
                {bird.imageUrl && (
                  <img
                    src={bird.imageUrl || noimage}
                    alt={bird.commonName}
                    onError={(e) => {
                      e.currentTarget.src = noimage;
                    }}
                    className="w-full h-48 object-contain rounded-lg mb-4 bg-gray-100"
                  />
                )}

                <h2 className="text-xl sm:text-2xl font-semibold mb-2">
                  {bird.commonName}
                </h2>
                <p
                  className="italic mb-4 text-sm"
                  style={{ color: "var(--text-secondary)" }}
                >
                  {bird.scientificName}
                </p>
                <p className="text-sm space-y-1">
                  <span>
                    <span className="font-medium">Family: </span>
                    {bird.family || "Unknown"}
                  </span>
                  <br />
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
            ))}
          </div>

          <div className="flex flex-wrap justify-center items-center mt-12 gap-2 sm:gap-3">
            {/* Previous Button */}
            <button
              onClick={() => goToPage(currentPage - 1)}
              disabled={currentPage === 1}
              className="
      px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg
      border transition
      disabled:opacity-40 disabled:cursor-not-allowed
      hover:scale-105 hover:bg-opacity-80
    "
              style={{
                backgroundColor: "var(--bg-card)",
                color: "var(--text-primary)",
                borderColor: "var(--border)",
              }}
            >
              Previous
            </button>

            {/* Page Buttons */}
            {getPageButtons().map((page) => (
              <button
                key={page}
                onClick={() => goToPage(page)}
                className={`
        px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg border transition
        hover:scale-105 hover:bg-opacity-80
      `}
                style={{
                  backgroundColor:
                    currentPage === page
                      ? "var(--accent-bird)"
                      : "var(--bg-card)",
                  color:
                    currentPage === page
                      ? "var(--bg-light)"
                      : "var(--text-primary)",
                  borderColor: "var(--border)",
                }}
              >
                {page}
              </button>
            ))}

            {/* Ellipsis */}
            {totalPages > getPageButtons()[getPageButtons().length - 1] && (
              <span
                className="px-2 text-lg"
                style={{ color: "var(--text-secondary)" }}
              >
                …
              </span>
            )}

            {/* Next Button */}
            <button
              onClick={() => goToPage(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="
      px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg
      border transition
      disabled:opacity-40 disabled:cursor-not-allowed
      hover:scale-105 hover:bg-opacity-80
    "
              style={{
                backgroundColor: "var(--bg-card)",
                color: "var(--text-primary)",
                borderColor: "var(--border)",
              }}
            >
              Next
            </button>
          </div>
        </>
      )}
    </section>
  );
}
