"use client";

import {
  PolarAngleAxis,
  PolarGrid,
  PolarRadiusAxis,
  Radar,
  RadarChart,
  ResponsiveContainer,
  Tooltip
} from "recharts";
import type { Benchmarks } from "@/types/model";

export function BenchmarkChart({ benchmarks }: { benchmarks: Benchmarks }) {
  const data = [
    { metric: "MMLU", value: benchmarks.mmlu, max: 100 },
    { metric: "HumanEval", value: benchmarks.humaneval, max: 100 },
    { metric: "GSM8K", value: benchmarks.gsm8k, max: 100 },
    { metric: "TruthfulQA", value: benchmarks.truthfulqa, max: 100 },
    { metric: "MT-Bench", value: benchmarks.mtBench * 10, max: 100 }
  ];

  return (
    <div className="h-80 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart data={data} outerRadius="75%">
          <PolarGrid stroke="rgba(255,255,255,0.08)" />
          <PolarAngleAxis
            dataKey="metric"
            tick={{ fill: "#A1A1AA", fontSize: 11 }}
          />
          <PolarRadiusAxis
            angle={90}
            domain={[0, 100]}
            tick={{ fill: "rgba(255,255,255,0.25)", fontSize: 10 }}
            axisLine={false}
          />
          <Radar
            name="Score"
            dataKey="value"
            stroke="#8B5CF6"
            fill="url(#radar-grad)"
            fillOpacity={0.55}
            strokeWidth={2}
          />
          <Tooltip
            contentStyle={{
              background: "rgba(20, 20, 20, 0.95)",
              border: "1px solid rgba(255,255,255,0.08)",
              borderRadius: 8,
              fontSize: 12
            }}
            labelStyle={{ color: "#FAFAFA" }}
          />
          <defs>
            <linearGradient id="radar-grad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#6366F1" stopOpacity={0.6} />
              <stop offset="100%" stopColor="#8B5CF6" stopOpacity={0.3} />
            </linearGradient>
          </defs>
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
}
