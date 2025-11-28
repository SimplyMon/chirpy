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
        className="border p-2 w-full rounded"
      />
    );
  }
);

SearchBar.displayName = "SearchBar";

export default SearchBar;
