"use client";

import {
  PolarAngleAxis,
  PolarGrid,
  PolarRadiusAxis,
  Radar,
  RadarChart,
  ResponsiveContainer,
  Tooltip,
  Legend
} from "recharts";
import type { LLMModel } from "@/types/model";
import { COMPARE_PALETTE } from "@/lib/palette";

const METRICS = [
  { key: "mmlu", label: "MMLU" },
  { key: "humaneval", label: "HumanEval" },
  { key: "gsm8k", label: "GSM8K" },
  { key: "truthfulqa", label: "TruthfulQA" },
  { key: "mtBench", label: "MT-Bench" }
] as const;

export function CompareRadar({ models }: { models: LLMModel[] }) {
  const data = METRICS.map((m) => {
    const row: Record<string, number | string> = { metric: m.label };
    for (const model of models) {
      const raw = model.benchmarks[m.key as keyof typeof model.benchmarks];
      // Нормализуем MT-Bench (0-10) к шкале 0-100
      row[model.id] = m.key === "mtBench" ? raw * 10 : raw;
    }
    return row;
  });

  return (
    <div className="h-[380px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart data={data} outerRadius="72%">
          <PolarGrid stroke="rgba(255,255,255,0.06)" />
          <PolarAngleAxis
            dataKey="metric"
            tick={{ fill: "#A1A1AA", fontSize: 11 }}
          />
          <PolarRadiusAxis
            angle={90}
            domain={[0, 100]}
            tick={{ fill: "rgba(255,255,255,0.18)", fontSize: 10 }}
            axisLine={false}
          />
          {models.map((m, i) => {
            const color = COMPARE_PALETTE[i % COMPARE_PALETTE.length];
            return (
              <Radar
                key={m.id}
                name={m.name}
                dataKey={m.id}
                stroke={color}
                fill={color}
                fillOpacity={0.12}
                strokeWidth={2}
                isAnimationActive
                animationDuration={500}
              />
            );
          })}
          <Tooltip
            contentStyle={{
              background: "rgba(20, 20, 20, 0.95)",
              border: "1px solid rgba(255,255,255,0.08)",
              borderRadius: 8,
              fontSize: 12
            }}
            labelStyle={{ color: "#FAFAFA" }}
          />
          <Legend
            wrapperStyle={{ fontSize: 11, color: "#A1A1AA" }}
            iconSize={10}
          />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
}
