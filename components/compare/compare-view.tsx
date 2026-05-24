"use client";

import { useEffect, useMemo } from "react";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Plus, X } from "lucide-react";
import { useCompare, MAX_COMPARE } from "@/lib/compare-context";
import { MODELS, getModelsByIds } from "@/lib/data";
import { CompareRadar } from "./compare-radar";
import { CompareBars } from "./compare-bars";
import { CompareTable } from "./compare-table";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";

export function CompareView() {
  const router = useRouter();
  const pathname = usePathname();
  const sp = useSearchParams();
  const { selected, setSelected, remove, toggle, canAddMore } = useCompare();

  // URL → context (one-way, only on first render with `ids` param)
  useEffect(() => {
    const fromUrl = sp.get("ids");
    if (!fromUrl) return;
    const ids = fromUrl.split(",").filter(Boolean);
    if (ids.length === 0) return;
    const known = ids.filter((id) => MODELS.some((m) => m.id === id));
    // Only override if URL differs from current selection
    if (known.join(",") !== selected.join(",")) {
      setSelected(known);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // context → URL (keep shareable)
  useEffect(() => {
    const target = selected.length
      ? `${pathname}?ids=${selected.join(",")}`
      : pathname;
    const current = sp.toString();
    const currentFull = current ? `${pathname}?${current}` : pathname;
    if (currentFull !== target) {
      router.replace(target, { scroll: false });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selected]);

  const models = useMemo(() => getModelsByIds(selected), [selected]);

  if (models.length === 0) return <EmptyState />;

  const availableToAdd = MODELS.filter((m) => !selected.includes(m.id));

  return (
    <div className="space-y-8 animate-fade-in-up">
      <header className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <h1 className="font-display text-3xl md:text-4xl font-semibold tracking-tight">
            Сравнение <span className="text-gradient">{models.length}</span> моделей
          </h1>
          <p className="mt-2 text-muted-foreground max-w-2xl">
            Максимум {MAX_COMPARE} моделей одновременно. Выбор сохраняется локально и
            кодируется в URL — поделитесь ссылкой.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          {availableToAdd.length > 0 && canAddMore && (
            <Select
              value=""
              onValueChange={(id) => id && toggle(id)}
            >
              <SelectTrigger className="w-[260px]">
                <Plus className="h-4 w-4 text-muted-foreground" />
                <SelectValue placeholder="Добавить модель…" />
              </SelectTrigger>
              <SelectContent>
                {availableToAdd.map((m) => (
                  <SelectItem key={m.id} value={m.id}>
                    <span className="mr-1.5">{m.creatorLogo}</span>
                    {m.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
          <Button variant="outline" asChild>
            <Link href="/">К каталогу</Link>
          </Button>
        </div>
      </header>

      <Tabs defaultValue="chart" className="w-full">
        <TabsList>
          <TabsTrigger value="chart">График</TabsTrigger>
          <TabsTrigger value="bars">По бенчмаркам</TabsTrigger>
          <TabsTrigger value="table">Таблица</TabsTrigger>
        </TabsList>

        <TabsContent value="chart">
          <Card>
            <CardContent className="p-5">
              <h2 className="mb-3 font-display text-sm font-semibold">
                Профиль бенчмарков (radar)
              </h2>
              <CompareRadar models={models} />
              <p className="mt-2 text-xs text-muted-foreground">
                MT-Bench нормализован к шкале 0–100 для визуального сопоставления с
                другими метриками.
              </p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="bars">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {(["mmlu", "humaneval", "gsm8k", "mtBench"] as const).map(
              (metric, i) => (
                <Card
                  key={metric}
                  className="animate-fade-in-up"
                  style={{ animationDelay: `${i * 60}ms` }}
                >
                  <CardContent className="p-5">
                    <h3 className="mb-2 font-display text-sm font-semibold">
                      {
                        {
                          mmlu: "MMLU — общие знания (5-shot)",
                          humaneval: "HumanEval — Python код",
                          gsm8k: "GSM8K — школьная математика",
                          mtBench: "MT-Bench — оценка человеком"
                        }[metric]
                      }
                    </h3>
                    <CompareBars models={models} metric={metric} />
                  </CardContent>
                </Card>
              )
            )}
          </div>
        </TabsContent>

        <TabsContent value="table">
          <CompareTable models={models} onRemove={remove} />
        </TabsContent>
      </Tabs>

      <div className="flex flex-wrap items-center gap-2 pt-2">
        <span className="text-xs uppercase tracking-wide text-muted-foreground">
          Активные модели:
        </span>
        {models.map((m) => (
          <button
            key={m.id}
            type="button"
            onClick={() => remove(m.id)}
            className="group inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.04] px-2.5 py-1 text-xs text-muted-foreground transition-colors hover:bg-white/[0.08] hover:text-foreground"
          >
            <span aria-hidden>{m.creatorLogo}</span>
            {m.name}
            <X className="h-3 w-3 opacity-60 group-hover:opacity-100" />
          </button>
        ))}
      </div>
    </div>
  );
}

function EmptyState() {
  return (
    <div className="flex h-[60vh] flex-col items-center justify-center text-center animate-fade-in-up">
      <div className="rounded-full bg-white/5 p-4 mb-4">
        <Plus className="h-6 w-6 text-muted-foreground" />
      </div>
      <h1 className="font-display text-2xl font-semibold">
        Выберите модели для сравнения
      </h1>
      <p className="mt-2 max-w-md text-muted-foreground text-sm">
        Откройте каталог, нажмите «+» на карточках или используйте кнопку
        «Сравнить» в карточке модели. Можно выбрать до {MAX_COMPARE} моделей.
      </p>
      <Button asChild className="mt-6">
        <Link href="/">К каталогу</Link>
      </Button>
    </div>
  );
}
