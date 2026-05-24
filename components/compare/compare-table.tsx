"use client";

import Link from "next/link";
import { X } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { COMPARE_PALETTE } from "@/lib/palette";
import {
  DEPLOYMENT_LABELS,
  LICENSE_LABELS,
  type LLMModel
} from "@/types/model";
import { formatNumber, formatUSD } from "@/lib/utils";

type Row = {
  label: string;
  render: (m: LLMModel) => React.ReactNode;
  highlight?: "max" | "min";
  numeric?: (m: LLMModel) => number;
};

const ROWS: Row[] = [
  {
    label: "Разработчик",
    render: (m) => (
      <span className="inline-flex items-center gap-1.5">
        <span aria-hidden>{m.creatorLogo}</span> {m.creator}
      </span>
    )
  },
  { label: "Дата релиза", render: (m) => <span className="font-mono">{m.releaseDate}</span> },
  { label: "Параметры", render: (m) => <span className="font-mono">{m.parameters}</span> },
  {
    label: "Контекст",
    render: (m) => <span className="font-mono">{formatNumber(m.contextWindow)}</span>,
    highlight: "max",
    numeric: (m) => m.contextWindow
  },
  {
    label: "Лицензия",
    render: (m) => (
      <Badge variant="outline" className="text-[10px]">
        {LICENSE_LABELS[m.license]}
      </Badge>
    )
  },
  {
    label: "MMLU",
    render: (m) => <span className="font-mono">{m.benchmarks.mmlu.toFixed(1)}</span>,
    highlight: "max",
    numeric: (m) => m.benchmarks.mmlu
  },
  {
    label: "HumanEval",
    render: (m) => <span className="font-mono">{m.benchmarks.humaneval.toFixed(1)}</span>,
    highlight: "max",
    numeric: (m) => m.benchmarks.humaneval
  },
  {
    label: "GSM8K",
    render: (m) => <span className="font-mono">{m.benchmarks.gsm8k.toFixed(1)}</span>,
    highlight: "max",
    numeric: (m) => m.benchmarks.gsm8k
  },
  {
    label: "TruthfulQA",
    render: (m) => <span className="font-mono">{m.benchmarks.truthfulqa.toFixed(1)}</span>,
    highlight: "max",
    numeric: (m) => m.benchmarks.truthfulqa
  },
  {
    label: "MT-Bench",
    render: (m) => <span className="font-mono">{m.benchmarks.mtBench.toFixed(2)}</span>,
    highlight: "max",
    numeric: (m) => m.benchmarks.mtBench
  },
  {
    label: "Цена $/M in",
    render: (m) =>
      m.pricing ? (
        <span className="font-mono">{formatUSD(m.pricing.inputPerMillion)}</span>
      ) : (
        <span className="text-muted-foreground">—</span>
      ),
    highlight: "min",
    numeric: (m) => m.pricing?.inputPerMillion ?? Number.POSITIVE_INFINITY
  },
  {
    label: "Цена $/M out",
    render: (m) =>
      m.pricing ? (
        <span className="font-mono">{formatUSD(m.pricing.outputPerMillion)}</span>
      ) : (
        <span className="text-muted-foreground">—</span>
      ),
    highlight: "min",
    numeric: (m) => m.pricing?.outputPerMillion ?? Number.POSITIVE_INFINITY
  },
  {
    label: "Способы запуска",
    render: (m) => (
      <div className="flex flex-wrap gap-1">
        {m.deploymentOptions.map((d) => (
          <Badge key={d} variant="default" className="text-[10px] bg-white/[0.06]">
            {DEPLOYMENT_LABELS[d]}
          </Badge>
        ))}
      </div>
    )
  }
];

interface Props {
  models: LLMModel[];
  onRemove: (id: string) => void;
}

export function CompareTable({ models, onRemove }: Props) {
  return (
    <div className="overflow-x-auto rounded-xl border border-white/[0.08] bg-white/[0.02]">
      <table className="w-full text-sm">
        <thead className="border-b border-white/10 text-left text-xs uppercase tracking-wide text-muted-foreground">
          <tr>
            <th className="sticky left-0 z-10 bg-[#141414]/95 backdrop-blur-xl px-4 py-3 font-medium w-44">
              Параметр
            </th>
            {models.map((m, i) => (
              <th key={m.id} className="px-4 py-3 font-normal min-w-[200px]">
                <div className="flex items-start justify-between gap-2">
                  <Link
                    href={`/models/${m.id}`}
                    className="group inline-flex items-center gap-2 text-foreground hover:text-gradient"
                  >
                    <span
                      className="h-2 w-2 rounded-full"
                      style={{
                        background: COMPARE_PALETTE[i % COMPARE_PALETTE.length]
                      }}
                    />
                    <span className="font-medium normal-case tracking-normal">
                      {m.name}
                    </span>
                  </Link>
                  <button
                    type="button"
                    aria-label={`Убрать ${m.name}`}
                    onClick={() => onRemove(m.id)}
                    className="rounded-md p-1 text-muted-foreground transition-colors hover:bg-white/5 hover:text-foreground"
                  >
                    <X className="h-3.5 w-3.5" />
                  </button>
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {ROWS.map((row, ri) => {
            const numeric = row.numeric;
            let bestId: string | null = null;
            if (numeric && row.highlight && models.length > 1) {
              const sorted = [...models].sort((a, b) =>
                row.highlight === "max"
                  ? numeric(b) - numeric(a)
                  : numeric(a) - numeric(b)
              );
              const best = sorted[0];
              const bestVal = numeric(best);
              if (Number.isFinite(bestVal)) bestId = best.id;
            }
            return (
              <tr
                key={row.label}
                className="border-b border-white/[0.04] last:border-0 hover:bg-white/[0.02] transition-colors animate-fade-in-up"
                style={{ animationDelay: `${ri * 20}ms` }}
              >
                <td className="sticky left-0 z-10 bg-[#141414]/95 backdrop-blur-xl px-4 py-3 text-xs uppercase tracking-wide text-muted-foreground">
                  {row.label}
                </td>
                {models.map((m) => {
                  const isBest = bestId === m.id;
                  return (
                    <td
                      key={m.id}
                      className={`px-4 py-3 ${
                        isBest
                          ? "bg-emerald-500/[0.06] text-emerald-200"
                          : ""
                      }`}
                    >
                      {row.render(m)}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
