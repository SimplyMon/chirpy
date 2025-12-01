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

    return (
      <input
        type="text"
        placeholder={disabled ? "Loading..." : "Search birds..."}
        value={searchTerm}
        onChange={handleChange}
        disabled={disabled}
        className={`border rounded py-2 px-4 w-full
                    bg-(--color-card-dark)
                    text-(--color-text)
                    placeholder-(--color-text-secondary)
                    border-(--color-border-dark)
                    focus:outline-none focus:ring-2 focus:ring-(--color-primary)
                    focus:border-(--color-primary)
                    transition-colors
                    ${disabled ? "opacity-50 cursor-not-allowed" : ""}`}
      />
    );
  }
);

SearchBar.displayName = "SearchBar";

export default SearchBar;
