"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from "recharts";
import type { LLMModel } from "@/types/model";
import { COMPARE_PALETTE } from "@/lib/palette";

type MetricKey = keyof LLMModel["benchmarks"];

const METRIC_LABELS: Record<MetricKey, string> = {
  mmlu: "MMLU",
  humaneval: "HumanEval",
  gsm8k: "GSM8K",
  truthfulqa: "TruthfulQA",
  mtBench: "MT-Bench"
};

export function CompareBars({
  models,
  metric
}: {
  models: LLMModel[];
  metric: MetricKey;
}) {
  const data = models.map((m, i) => ({
    name: m.name,
    short: m.name.split(" ").slice(0, 2).join(" "),
    value: m.benchmarks[metric],
    color: COMPARE_PALETTE[i % COMPARE_PALETTE.length]
  }));

  const max = metric === "mtBench" ? 10 : 100;

  return (
    <div className="h-[260px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          margin={{ top: 8, right: 12, bottom: 6, left: -8 }}
          barCategoryGap="22%"
        >
          <CartesianGrid stroke="rgba(255,255,255,0.05)" vertical={false} />
          <XAxis
            dataKey="short"
            tick={{ fill: "#A1A1AA", fontSize: 10 }}
            axisLine={{ stroke: "rgba(255,255,255,0.08)" }}
            tickLine={false}
            interval={0}
          />
          <YAxis
            domain={[0, max]}
            tick={{ fill: "rgba(255,255,255,0.4)", fontSize: 10 }}
            axisLine={false}
            tickLine={false}
            width={32}
          />
          <Tooltip
            cursor={{ fill: "rgba(255,255,255,0.04)" }}
            contentStyle={{
              background: "rgba(20, 20, 20, 0.95)",
              border: "1px solid rgba(255,255,255,0.08)",
              borderRadius: 8,
              fontSize: 12
            }}
            labelStyle={{ color: "#FAFAFA" }}
            formatter={(v: number) => [v.toFixed(2), METRIC_LABELS[metric]]}
          />
          <Bar
            dataKey="value"
            radius={[6, 6, 0, 0]}
            isAnimationActive
            animationDuration={500}
          >
            {data.map((d, i) => (
              <Cell key={i} fill={d.color} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
