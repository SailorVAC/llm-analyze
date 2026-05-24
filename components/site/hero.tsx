"use client";

import { useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";

interface Props {
  modelCount: number;
  creatorCount: number;
  apiCount: number;
}

export function Hero({ modelCount, creatorCount, apiCount }: Props) {
  return (
    <section className="mb-10 md:mb-14">
      <Badge variant="accent" className="mb-4 animate-fade-in-up">
        <span className="font-mono">v0.2</span> · обновлено еженедельно
      </Badge>
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
        лицензии, контекстное окно, цена API и способы запуска. Фильтруйте,
        сортируйте, сравнивайте по 2–6 моделей одновременно.
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
      // ease-out cubic
      const eased = 1 - Math.pow(1 - t, 3);
      setValue(Math.round(target * eased));
      if (t < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [target, durationMs]);
  return value;
}
