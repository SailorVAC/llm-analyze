"use client";

import { Search } from "lucide-react";
import { ModelCard } from "./model-card";
import type { LLMModel } from "@/types/model";

export function ModelGrid({ models }: { models: LLMModel[] }) {
  if (models.length === 0) {
    return (
      <div className="flex h-72 flex-col items-center justify-center rounded-xl border border-dashed border-white/10 bg-white/[0.02] text-center px-6 animate-fade-in-up">
        <div className="rounded-full bg-white/5 p-3 mb-3">
          <Search className="h-5 w-5 text-muted-foreground" />
        </div>
        <h3 className="font-display text-base font-semibold">Ничего не нашлось</h3>
        <p className="mt-1 max-w-sm text-sm text-muted-foreground">
          Попробуйте смягчить фильтры — например, расширить диапазон параметров или
          снять ограничение по контекстному окну.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
      {models.map((m, i) => (
        <ModelCard key={m.id} model={m} index={i} />
      ))}
    </div>
  );
}
