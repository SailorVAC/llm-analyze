"use client";

import { Search, SlidersHorizontal, X } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import {
  DEPLOYMENT_LABELS,
  LICENSE_LABELS,
  type DeploymentOption,
  type LicenseType
} from "@/types/model";
import {
  DEFAULT_FILTERS,
  type ModelFilters,
  type SortKey
} from "@/lib/filters";
import { formatNumber } from "@/lib/utils";

const ALL_LICENSES: LicenseType[] = [
  "apache-2.0",
  "mit",
  "llama3-community",
  "research-only",
  "custom",
  "proprietary"
];

const ALL_DEPLOYMENTS: DeploymentOption[] = [
  "local",
  "colab",
  "api",
  "web-ui"
];

const CONTEXT_PRESETS = [
  { label: "Any", value: 0 },
  { label: "8K+", value: 8192 },
  { label: "32K+", value: 32768 },
  { label: "128K+", value: 128000 }
];

const SORT_OPTIONS: { value: SortKey; label: string }[] = [
  { value: "mmlu", label: "MMLU ↓" },
  { value: "humaneval", label: "HumanEval ↓" },
  { value: "gsm8k", label: "GSM8K ↓" },
  { value: "mtBench", label: "MT-Bench ↓" },
  { value: "params", label: "Параметры ↓" },
  { value: "context", label: "Контекст ↓" },
  { value: "newest", label: "Сначала новые" }
];

interface Props {
  filters: ModelFilters;
  creators: string[];
  totalCount: number;
  filteredCount: number;
  onChange: (next: ModelFilters) => void;
  onReset: () => void;
}

export function FiltersPanel({
  filters,
  creators,
  totalCount,
  filteredCount,
  onChange,
  onReset
}: Props) {
  const set = <K extends keyof ModelFilters>(k: K, v: ModelFilters[K]) =>
    onChange({ ...filters, [k]: v });

  const toggleInArray = <T extends string>(arr: T[], value: T): T[] =>
    arr.includes(value) ? arr.filter((x) => x !== value) : [...arr, value];

  return (
    <Card className="sticky top-20 self-start">
      <CardContent className="p-5 space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <SlidersHorizontal className="h-4 w-4 text-muted-foreground" />
            <h2 className="font-display text-sm font-semibold">Фильтры</h2>
          </div>
          <Button
            variant="ghost"
            size="sm"
            className="text-xs text-muted-foreground"
            onClick={onReset}
          >
            <X className="h-3 w-3" /> Сброс
          </Button>
        </div>

        <div className="space-y-2">
          <Label htmlFor="q">Поиск</Label>
          <div className="relative">
            <Search className="pointer-events-none absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              id="q"
              placeholder="llama, code, multilingual…"
              className="pl-8"
              value={filters.search}
              onChange={(e) => set("search", e.target.value)}
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label>Сортировка</Label>
          <Select
            value={filters.sort}
            onValueChange={(v) => set("sort", v as SortKey)}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {SORT_OPTIONS.map((s) => (
                <SelectItem key={s.value} value={s.value}>
                  {s.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label>Параметры (B)</Label>
            <span className="font-mono text-xs text-muted-foreground">
              {filters.paramsRange[0]} – {filters.paramsRange[1]}
            </span>
          </div>
          <Slider
            min={0}
            max={200}
            step={1}
            value={filters.paramsRange}
            onValueChange={(v) =>
              set("paramsRange", [v[0], v[1]] as [number, number])
            }
            className="py-2"
          />
        </div>

        <div className="space-y-2">
          <Label>Минимальный контекст</Label>
          <div className="flex flex-wrap gap-1.5">
            {CONTEXT_PRESETS.map((p) => (
              <Button
                key={p.value}
                variant={filters.minContext === p.value ? "default" : "outline"}
                size="sm"
                className="h-7 px-2 text-xs"
                onClick={() => set("minContext", p.value)}
              >
                {p.label === "Any" ? "Any" : `${formatNumber(p.value)}+`}
              </Button>
            ))}
          </div>
        </div>

        <div className="space-y-2">
          <Label>Лицензия</Label>
          <div className="space-y-1.5">
            {ALL_LICENSES.map((l) => (
              <label
                key={l}
                className="flex items-center gap-2 text-sm cursor-pointer"
              >
                <Checkbox
                  checked={filters.licenses.includes(l)}
                  onCheckedChange={() =>
                    set("licenses", toggleInArray(filters.licenses, l))
                  }
                />
                <span className="text-muted-foreground">{LICENSE_LABELS[l]}</span>
              </label>
            ))}
          </div>
        </div>

        <div className="space-y-2">
          <Label>Запуск</Label>
          <div className="grid grid-cols-2 gap-1.5">
            {ALL_DEPLOYMENTS.map((d) => (
              <label
                key={d}
                className="flex items-center gap-2 text-sm cursor-pointer rounded-md border border-white/5 px-2 py-1.5 hover:bg-white/5"
              >
                <Checkbox
                  checked={filters.deployments.includes(d)}
                  onCheckedChange={() =>
                    set("deployments", toggleInArray(filters.deployments, d))
                  }
                />
                <span className="text-muted-foreground">
                  {DEPLOYMENT_LABELS[d]}
                </span>
              </label>
            ))}
          </div>
        </div>

        <div className="space-y-2">
          <Label>Разработчик</Label>
          <div className="max-h-40 overflow-y-auto pr-1 space-y-1.5">
            {creators.map((c) => (
              <label
                key={c}
                className="flex items-center gap-2 text-sm cursor-pointer"
              >
                <Checkbox
                  checked={filters.creators.includes(c)}
                  onCheckedChange={() =>
                    set("creators", toggleInArray(filters.creators, c))
                  }
                />
                <span className="text-muted-foreground">{c}</span>
              </label>
            ))}
          </div>
        </div>

        <div className="flex items-center justify-between rounded-md border border-white/5 px-3 py-2">
          <Label htmlFor="api-only" className="!normal-case !tracking-normal text-sm font-normal text-foreground">
            Только с API
          </Label>
          <Switch
            id="api-only"
            checked={filters.hasApiOnly}
            onCheckedChange={(v) => set("hasApiOnly", Boolean(v))}
          />
        </div>

        <div className="border-t border-white/5 pt-3 text-xs text-muted-foreground">
          Показано{" "}
          <span className="font-mono text-foreground">{filteredCount}</span> из{" "}
          <span className="font-mono">{totalCount}</span> моделей
          {JSON.stringify(filters) !== JSON.stringify(DEFAULT_FILTERS) && (
            <> · фильтры активны</>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
