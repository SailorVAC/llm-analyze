"use client";

import { useCallback, useMemo } from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { FiltersPanel } from "./filters-panel";
import { ModelGrid } from "./model-grid";
import {
  DEFAULT_FILTERS,
  applyFilters,
  parseFilters,
  serializeFilters,
  type ModelFilters
} from "@/lib/filters";
import type { LLMModel } from "@/types/model";

export function ExploreView({ models }: { models: LLMModel[] }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const filters: ModelFilters = useMemo(
    () => parseFilters(new URLSearchParams(searchParams.toString())),
    [searchParams]
  );

  const creators = useMemo(
    () => Array.from(new Set(models.map((m) => m.creator))).sort(),
    [models]
  );

  const filtered = useMemo(() => applyFilters(models, filters), [models, filters]);

  const updateUrl = useCallback(
    (next: ModelFilters) => {
      const params = serializeFilters(next);
      const qs = params.toString();
      router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
    },
    [pathname, router]
  );

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-[280px_1fr]">
      <FiltersPanel
        filters={filters}
        creators={creators}
        totalCount={models.length}
        filteredCount={filtered.length}
        onChange={updateUrl}
        onReset={() => updateUrl(DEFAULT_FILTERS)}
      />
      <ModelGrid models={filtered} />
    </div>
  );
}
