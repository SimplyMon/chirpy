import { useCallback, useEffect, useState } from "react";

const STORAGE_KEY = "chirpy:favorites:v1";

const readFavorites = (): string[] => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as string[]) : [];
  } catch {
    return [];
  }
};

const writeFavorites = (ids: string[]) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(ids));
  } catch {
    // ignore
  }
};

export function useFavorites() {
  const [favorites, setFavorites] = useState<string[]>(() => readFavorites());

  useEffect(() => {
    const handleStorage = (e: StorageEvent) => {
      if (e.key === STORAGE_KEY) setFavorites(readFavorites());
    };
    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, []);

  const toggleFavorite = useCallback((speciesCode: string) => {
    setFavorites((prev) => {
      const next = prev.includes(speciesCode)
        ? prev.filter((id) => id !== speciesCode)
        : [...prev, speciesCode];
      writeFavorites(next);
      return next;
    });
  }, []);

  const isFavorite = useCallback(
    (speciesCode: string) => favorites.includes(speciesCode),
    [favorites]
  );

  return { favorites, toggleFavorite, isFavorite };
}
