"use client";

import * as React from "react";

const STORAGE_KEY = "llm-hub:compare";
export const MAX_COMPARE = 6;

interface CompareContextValue {
  selected: string[];
  isSelected: (id: string) => boolean;
  toggle: (id: string) => void;
  remove: (id: string) => void;
  clear: () => void;
  setSelected: (ids: string[]) => void;
  canAddMore: boolean;
}

const CompareContext = React.createContext<CompareContextValue | null>(null);

export function CompareProvider({ children }: { children: React.ReactNode }) {
  const [selected, setSelectedState] = React.useState<string[]>([]);

  // Hydrate from localStorage on mount
  React.useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as unknown;
        if (Array.isArray(parsed) && parsed.every((x) => typeof x === "string")) {
          setSelectedState(parsed.slice(0, MAX_COMPARE));
        }
      }
    } catch {
      // ignore
    }
  }, []);

  // Persist on change
  React.useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(selected));
    } catch {
      // ignore
    }
  }, [selected]);

  const value = React.useMemo<CompareContextValue>(
    () => ({
      selected,
      isSelected: (id) => selected.includes(id),
      toggle: (id) =>
        setSelectedState((prev) => {
          if (prev.includes(id)) return prev.filter((x) => x !== id);
          if (prev.length >= MAX_COMPARE) return prev;
          return [...prev, id];
        }),
      remove: (id) =>
        setSelectedState((prev) => prev.filter((x) => x !== id)),
      clear: () => setSelectedState([]),
      setSelected: (ids) =>
        setSelectedState(Array.from(new Set(ids)).slice(0, MAX_COMPARE)),
      canAddMore: selected.length < MAX_COMPARE
    }),
    [selected]
  );

  return (
    <CompareContext.Provider value={value}>{children}</CompareContext.Provider>
  );
}

export function useCompare(): CompareContextValue {
  const ctx = React.useContext(CompareContext);
  if (!ctx) throw new Error("useCompare must be used within CompareProvider");
  return ctx;
}
