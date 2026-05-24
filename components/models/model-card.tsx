"use client";

import Link from "next/link";
import { ArrowUpRight, TrendingDown, TrendingUp, Minus } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CompareToggle } from "@/components/compare/compare-toggle";
import { LICENSE_LABELS, type LLMModel } from "@/types/model";
import { formatContextWindow, formatUSD } from "@/lib/utils";
import { useCompare } from "@/lib/compare-context";

const TREND_ICON = {
  up: TrendingUp,
  down: TrendingDown,
  stable: Minus
} as const;

const TREND_COLOR = {
  up: "text-emerald-400",
  down: "text-red-400",
  stable: "text-muted-foreground"
} as const;

export function ModelCard({
  model,
  index = 0
}: {
  model: LLMModel;
  index?: number;
}) {
  const Trend = TREND_ICON[model.trend ?? "stable"];
  const trendColor = TREND_COLOR[model.trend ?? "stable"];
  const { isSelected } = useCompare();
  const inCompare = isSelected(model.id);

  return (
    <div
      className="animate-fade-in-up [animation-fill-mode:both]"
      style={{ animationDelay: `${Math.min(index, 11) * 30}ms` }}
    >
      <Link href={`/models/${model.id}`} className="block group">
        <Card
          className={`relative h-full overflow-hidden transition-all duration-300 group-hover:-translate-y-0.5 group-hover:border-white/15 ${
            inCompare ? "ring-1 ring-indigo-400/40 shadow-lg shadow-indigo-500/10" : ""
          }`}
        >
          <CardContent className="p-5">
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-3 min-w-0">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-white/5 text-xl transition-transform duration-300 group-hover:scale-105">
                  <span aria-hidden>{model.creatorLogo}</span>
                </div>
                <div className="min-w-0">
                  <h3 className="font-display text-base font-semibold leading-tight truncate">
                    {model.name}
                  </h3>
                  <p className="text-xs text-muted-foreground">{model.creator}</p>
                </div>
              </div>

              <div className="flex items-center gap-1.5">
                <CompareToggle modelId={model.id} />
                <ArrowUpRight className="h-4 w-4 text-muted-foreground transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-foreground" />
              </div>
            </div>

            <p className="mt-4 line-clamp-2 text-sm text-muted-foreground">
              {model.description}
            </p>

            <div className="mt-5 grid grid-cols-3 gap-3 border-t border-white/5 pt-4 text-xs">
              <div>
                <div className="text-[10px] uppercase tracking-wide text-muted-foreground">
                  Параметры
                </div>
                <div className="font-mono text-sm">{model.parameters}</div>
              </div>
              <div>
                <div className="text-[10px] uppercase tracking-wide text-muted-foreground">
                  Контекст
                </div>
                <div className="font-mono text-sm">
                  {formatContextWindow(model.contextWindow)}
                </div>
              </div>
              <div>
                <div className="text-[10px] uppercase tracking-wide text-muted-foreground">
                  MMLU
                </div>
                <div
                  className={`font-mono text-sm ${trendColor} inline-flex items-center gap-1`}
                >
                  {model.benchmarks.mmlu.toFixed(1)}
                  <Trend className="h-3 w-3" />
                </div>
              </div>
            </div>

            <div className="mt-4 flex flex-wrap items-center gap-1.5">
              <Badge variant="accent">{LICENSE_LABELS[model.license]}</Badge>
              {model.pricing ? (
                <Badge variant="outline">
                  <span className="font-mono">
                    {formatUSD(model.pricing.inputPerMillion)}/M in
                  </span>
                </Badge>
              ) : (
                <Badge variant="outline">Local-only</Badge>
              )}
              {model.tags.slice(0, 2).map((t) => (
                <Badge key={t} variant="default" className="bg-white/[0.06]">
                  {t}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      </Link>
    </div>
  );
}
