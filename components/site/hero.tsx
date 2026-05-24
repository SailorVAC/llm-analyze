"use client";

import { useEffect, useState } from "react";
import { RefreshCw } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface Props {
  modelCount: number;
  creatorCount: number;
  apiCount: number;
  lastUpdated: string; // ISO
}

export function Hero({ modelCount, creatorCount, apiCount, lastUpdated }: Props) {
  return (
    <section className="mb-10 md:mb-14">
      <div className="flex flex-wrap items-center gap-2 mb-4 animate-fade-in-up">
        <Badge variant="accent">
          <span className="font-mono">v0.3</span> · живые данные с Hugging Face
        </Badge>
        <Badge variant="outline" className="gap-1">
          <RefreshCw className="h-3 w-3" />
          обновлено <FreshAgo iso={lastUpdated} />
        </Badge>
      </div>
      <h1
        className="font-display text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight leading-[1.05] animate-fade-in-up [animation-fill-mode:both]"
        style={{ animationDelay: "60ms" }}
      >
        Сравнение <span className="text-gradient">открытых LLM</span>
        <br className="hidden md:block" />
        без маркетинговой пыли.
      </h1>
      <p
        className="mt-5 max-w-2xl text-base md:text-lg text-muted-foreground animate-fade-in-up [animation-fill-mode:both]"
        style={{ animationDelay: "120ms" }}
      >
        Открытые LLM от {creatorCount} разработчиков в одной таблице: бенчмарки,
        лицензии, контекстное окно, цена API и способы запуска. Свежие тренды
        подтягиваются с Hugging Face Hub раз в час.
      </p>

      <dl className="mt-8 grid grid-cols-3 max-w-xl gap-2 text-sm">
        <Stat value={modelCount} label="моделей" delay={0} />
        <Stat value={creatorCount} label="разработчиков" delay={80} />
        <Stat value={apiCount} label="с API" delay={160} />
      </dl>
    </section>
  );
}

function Stat({ value, label, delay }: { value: number; label: string; delay: number }) {
  const display = useCountUp(value, 700);
  return (
    <div
      className="rounded-lg border border-white/[0.06] bg-white/[0.02] px-4 py-3 animate-fade-in-up [animation-fill-mode:both]"
      style={{ animationDelay: `${180 + delay}ms` }}
    >
      <div className="font-mono text-2xl font-semibold text-foreground">
        {display}
      </div>
      <div className="text-[11px] uppercase tracking-wide text-muted-foreground">
        {label}
      </div>
    </div>
  );
}

function useCountUp(target: number, durationMs: number): number {
  const [value, setValue] = useState(0);
  useEffect(() => {
    let raf = 0;
    const start = performance.now();
    const step = (now: number) => {
      const t = Math.min(1, (now - start) / durationMs);
      const eased = 1 - Math.pow(1 - t, 3);
      setValue(Math.round(target * eased));
      if (t < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [target, durationMs]);
  return value;
}

/** Human-readable "5 minutes ago" — updates every minute on the client to avoid hydration drift. */
function FreshAgo({ iso }: { iso: string }) {
  const [now, setNow] = useState<number | null>(null);
  useEffect(() => {
    setNow(Date.now());
    const id = window.setInterval(() => setNow(Date.now()), 60_000);
    return () => window.clearInterval(id);
  }, []);

  // SSR / first paint: show the static timestamp to avoid hydration mismatch
  if (now === null) {
    return <span className="font-mono">{iso.slice(11, 16)} UTC</span>;
  }
  const diffMs = now - new Date(iso).getTime();
  const minutes = Math.max(0, Math.round(diffMs / 60_000));
  if (minutes < 1) return <span className="font-mono">только что</span>;
  if (minutes < 60) return <span className="font-mono">{minutes} мин назад</span>;
  const hours = Math.round(minutes / 60);
  if (hours < 24) return <span className="font-mono">{hours} ч назад</span>;
  const days = Math.round(hours / 24);
  return <span className="font-mono">{days} д назад</span>;
}
