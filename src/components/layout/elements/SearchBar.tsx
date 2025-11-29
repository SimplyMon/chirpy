import React, { useCallback } from "react";
import type { ChangeEvent } from "react";

interface Props {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
}

const SearchBar: React.FC<Props> = React.memo(
  ({ searchTerm, setSearchTerm }) => {
    const handleChange = useCallback(
      (e: ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);
      },
      [setSearchTerm]
    );

    return (
      <input
        type="text"
        placeholder="Search birds..."
        value={searchTerm}
        onChange={handleChange}
        className="border rounded py-2 px-4 w-full
                   bg-(--color-card-dark)
                   text-(--color-text)
                   placeholder-(--color-text-secondary)
                   border-(--color-border-dark)
                   focus:outline-none focus:ring-2 focus:ring-(--color-primary) focus:border-(--color-primary) transition-colors"
      />
    );
  }
);

SearchBar.displayName = "SearchBar";

export default SearchBar;
