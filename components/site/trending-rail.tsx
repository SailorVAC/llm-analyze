import { ArrowUpRight, Download, Flame, Heart } from "lucide-react";
import { fetchTrendingHFModels, logoFor, type HFModel } from "@/lib/hf";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MODELS } from "@/lib/data";
import { formatNumber } from "@/lib/utils";

/**
 * Server Component — отрисовывается на сервере, кешируется на 1 час.
 * Деградирует молча, если HF API недоступен.
 */
export async function TrendingRail() {
  const live = await fetchTrendingHFModels({ limit: 18, sort: "trendingScore" });
  if (live.length === 0) return null;

  const inCatalogIds = new Set(
    MODELS.map((m) => m.id.toLowerCase())
  );
  const inCatalogByHfSlug = new Set(
    MODELS.map((m) =>
      m.hfUrl.replace(/^https?:\/\/huggingface\.co\//i, "").toLowerCase()
    )
  );

  const items = live.slice(0, 12).map((m) => ({
    ...m,
    inCatalog:
      inCatalogIds.has(m.id.toLowerCase()) ||
      inCatalogByHfSlug.has(m.id.toLowerCase())
  }));

  return (
    <section className="mb-10 md:mb-14 animate-fade-in-up [animation-fill-mode:both]" style={{ animationDelay: "240ms" }}>
      <header className="mb-4 flex items-end justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="inline-flex h-6 w-6 items-center justify-center rounded-md bg-gradient-to-br from-orange-500/30 to-pink-500/30 text-orange-200">
              <Flame className="h-3.5 w-3.5" />
            </span>
            <h2 className="font-display text-lg font-semibold tracking-tight">
              Trending on <span className="text-gradient">Hugging Face</span>
            </h2>
          </div>
          <p className="mt-1 text-sm text-muted-foreground">
            Свежие открытые LLM, которые сейчас в топе. Обновляется ~раз в час.
          </p>
        </div>
        <a
          href="https://huggingface.co/models?pipeline_tag=text-generation&sort=trending"
          target="_blank"
          rel="noreferrer noopener"
          className="hidden md:inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors"
        >
          смотреть все на HF <ArrowUpRight className="h-3 w-3" />
        </a>
      </header>

      <div className="relative">
        <div className="-mx-2 flex snap-x snap-mandatory gap-3 overflow-x-auto px-2 pb-3 [scrollbar-width:thin]">
          {items.map((m, i) => (
            <TrendingCard key={m.id} model={m} index={i} />
          ))}
        </div>
        <div className="pointer-events-none absolute inset-y-0 right-0 w-12 bg-gradient-to-l from-background to-transparent" />
      </div>
    </section>
  );
}

function TrendingCard({
  model,
  index
}: {
  model: HFModel & { inCatalog: boolean };
  index: number;
}) {
  return (
    <a
      href={model.url}
      target="_blank"
      rel="noreferrer noopener"
      className="group block snap-start animate-fade-in-up [animation-fill-mode:both]"
      style={{ animationDelay: `${index * 30}ms` }}
    >
      <Card className="h-full min-w-[260px] max-w-[300px] transition-all duration-300 group-hover:-translate-y-0.5 group-hover:border-white/15">
        <CardContent className="p-4">
          <div className="flex items-start justify-between gap-2">
            <div className="flex items-center gap-2 min-w-0">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-white/5 text-base">
                <span aria-hidden>{logoFor(model.author)}</span>
              </div>
              <div className="min-w-0">
                <div className="truncate font-medium text-sm">
                  {model.name}
                </div>
                <div className="truncate text-[11px] text-muted-foreground font-mono">
                  {model.author}
                </div>
              </div>
            </div>
            <ArrowUpRight className="h-3.5 w-3.5 shrink-0 text-muted-foreground transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-foreground" />
          </div>

          <div className="mt-3 flex items-center gap-3 text-xs text-muted-foreground font-mono">
            <span className="inline-flex items-center gap-1">
              <Download className="h-3 w-3" />
              {formatNumber(model.downloads)}
            </span>
            <span className="inline-flex items-center gap-1">
              <Heart className="h-3 w-3" />
              {formatNumber(model.likes)}
            </span>
          </div>

          <div className="mt-3 flex flex-wrap items-center gap-1">
            {model.inCatalog && (
              <Badge variant="success" className="text-[10px]">
                в каталоге
              </Badge>
            )}
            {model.tags.slice(0, 2).map((t) => (
              <Badge
                key={t}
                variant="outline"
                className="text-[10px] font-mono"
              >
                {t.replace("base_model:", "").slice(0, 18)}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>
    </a>
  );
}
