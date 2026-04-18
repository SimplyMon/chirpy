import React, { useCallback } from "react";
import type { ChangeEvent } from "react";

interface Props {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  disabled?: boolean;
}

const SearchBar: React.FC<Props> = React.memo(
  ({ searchTerm, setSearchTerm, disabled = false }) => {
    const handleChange = useCallback(
      (e: ChangeEvent<HTMLInputElement>) => {
        if (disabled) return;
        setSearchTerm(e.target.value);
      },
      [setSearchTerm, disabled]
    );

    const clear = useCallback(() => {
      if (!disabled) setSearchTerm("");
    }, [setSearchTerm, disabled]);

    return (
      <div className="relative w-full">
        <i
          className="fas fa-search absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none text-sm"
          style={{ color: "var(--color-text-secondary)" }}
        />
        <input
          type="text"
          placeholder={disabled ? "Loading birds..." : "Search birds by name, family, or species..."}
          value={searchTerm}
          onChange={handleChange}
          disabled={disabled}
          className={`border rounded-full py-3 pl-11 pr-11 w-full
                      bg-(--color-card-dark)
                      text-(--color-text)
                      placeholder-(--color-text-secondary)
                      border-(--color-border-dark)
                      focus:outline-none focus:ring-2 focus:ring-(--color-success)
                      focus:border-(--color-success)
                      transition-colors
                      ${disabled ? "opacity-50 cursor-not-allowed" : ""}`}
        />
        {searchTerm && !disabled && (
          <button
            onClick={clear}
            aria-label="Clear search"
            className="absolute right-3 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full flex items-center justify-center transition-colors"
            style={{
              backgroundColor: "var(--color-border-dark)",
              color: "var(--color-text)",
            }}
          >
            <i className="fas fa-times text-xs" />
          </button>
        )}
      </div>
    );
  }
);

SearchBar.displayName = "SearchBar";

export default SearchBar;
