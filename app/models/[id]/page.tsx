import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ExternalLink, Github } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { BenchmarkChart } from "@/components/models/benchmark-chart";
import { MODELS, getModelById } from "@/lib/data";
import {
  DEPLOYMENT_LABELS,
  LICENSE_LABELS,
  type LLMModel
} from "@/types/model";
import { formatNumber, formatUSD } from "@/lib/utils";

export function generateStaticParams() {
  return MODELS.map((m) => ({ id: m.id }));
}

export function generateMetadata({ params }: { params: { id: string } }) {
  const m = getModelById(params.id);
  if (!m) return { title: "Модель не найдена · Open LLM Hub" };
  return {
    title: `${m.name} · Open LLM Hub`,
    description: m.description
  };
}

export default function ModelPage({ params }: { params: { id: string } }) {
  const model = getModelById(params.id);
  if (!model) notFound();

  return (
    <div className="space-y-8">
      <Button variant="ghost" size="sm" asChild className="w-fit">
        <Link href="/">
          <ArrowLeft className="h-4 w-4" /> Все модели
        </Link>
      </Button>

      <header className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
        <div className="flex items-start gap-4">
          <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-white/5 text-3xl">
            <span aria-hidden>{model.creatorLogo}</span>
          </div>
          <div>
            <p className="text-xs font-mono uppercase tracking-wider text-muted-foreground">
              {model.creator} · {model.releaseDate}
            </p>
            <h1 className="mt-1 font-display text-3xl md:text-4xl font-semibold tracking-tight">
              {model.name}
            </h1>
            <p className="mt-2 max-w-2xl text-muted-foreground">
              {model.description}
            </p>
            <div className="mt-3 flex flex-wrap gap-1.5">
              <Badge variant="accent">{LICENSE_LABELS[model.license]}</Badge>
              <Badge variant="outline" className="font-mono">
                {model.parameters}
              </Badge>
              <Badge variant="outline" className="font-mono">
                {formatNumber(model.contextWindow)} ctx
              </Badge>
              {model.tags.map((t) => (
                <Badge key={t}>{t}</Badge>
              ))}
            </div>
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button asChild>
            <a href={model.hfUrl} target="_blank" rel="noopener noreferrer">
              <ExternalLink className="h-4 w-4" />
              {model.license === "proprietary" ? "Документация" : "Hugging Face"}
            </a>
          </Button>
          {model.githubUrl && (
            <Button variant="outline" asChild>
              <a
                href={model.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Github className="h-4 w-4" /> GitHub
              </a>
            </Button>
          )}
        </div>
      </header>

      <section className="grid grid-cols-1 gap-6 lg:grid-cols-[1.2fr_1fr]">
        <Card>
          <CardContent className="p-5">
            <h2 className="font-display text-sm font-semibold mb-3">
              Бенчмарки
            </h2>
            <BenchmarkChart benchmarks={model.benchmarks} />
            <BenchmarkTable model={model} />
          </CardContent>
        </Card>

        <div className="flex flex-col gap-6">
          <Card>
            <CardContent className="p-5">
              <h2 className="font-display text-sm font-semibold mb-3">
                Способы запуска
              </h2>
              <ul className="grid grid-cols-2 gap-2 text-sm">
                {model.deploymentOptions.map((d) => (
                  <li
                    key={d}
                    className="rounded-md border border-white/5 bg-white/[0.03] px-3 py-2 font-mono text-xs"
                  >
                    {DEPLOYMENT_LABELS[d]}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-5">
              <h2 className="font-display text-sm font-semibold mb-3">
                Цена API
              </h2>
              {model.pricing ? (
                <dl className="space-y-2 text-sm">
                  <div className="flex items-baseline justify-between">
                    <dt className="text-muted-foreground">Провайдер</dt>
                    <dd className="font-mono">{model.pricing.provider}</dd>
                  </div>
                  <div className="flex items-baseline justify-between">
                    <dt className="text-muted-foreground">Input / 1M токенов</dt>
                    <dd className="font-mono">
                      {formatUSD(model.pricing.inputPerMillion)}
                    </dd>
                  </div>
                  <div className="flex items-baseline justify-between">
                    <dt className="text-muted-foreground">Output / 1M токенов</dt>
                    <dd className="font-mono">
                      {formatUSD(model.pricing.outputPerMillion)}
                    </dd>
                  </div>
                </dl>
              ) : (
                <p className="text-sm text-muted-foreground">
                  API не предоставляется. Запускайте локально или через Colab.
                </p>
              )}
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}

function BenchmarkTable({ model }: { model: LLMModel }) {
  const rows: { label: string; value: string }[] = [
    { label: "MMLU (5-shot)", value: model.benchmarks.mmlu.toFixed(1) },
    { label: "HumanEval", value: model.benchmarks.humaneval.toFixed(1) },
    { label: "GSM8K", value: model.benchmarks.gsm8k.toFixed(1) },
    { label: "TruthfulQA", value: model.benchmarks.truthfulqa.toFixed(1) },
    { label: "MT-Bench", value: model.benchmarks.mtBench.toFixed(2) }
  ];
  return (
    <div className="mt-4 grid grid-cols-2 gap-2 md:grid-cols-5">
      {rows.map((r) => (
        <div
          key={r.label}
          className="rounded-md border border-white/5 bg-white/[0.02] p-3"
        >
          <div className="text-[10px] uppercase tracking-wide text-muted-foreground">
            {r.label}
          </div>
          <div className="mt-1 font-mono text-lg">{r.value}</div>
        </div>
      ))}
    </div>
  );
}
