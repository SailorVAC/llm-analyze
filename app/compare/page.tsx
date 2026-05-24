import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MODELS } from "@/lib/data";
import { LICENSE_LABELS } from "@/types/model";
import { formatNumber, formatUSD } from "@/lib/utils";

export const metadata = {
  title: "Сравнение моделей · Open LLM Hub",
  description: "Сводная таблица бенчмарков, лицензий и цен открытых LLM."
};

export default function ComparePage() {
  const rows = [...MODELS].sort(
    (a, b) => b.benchmarks.mmlu - a.benchmarks.mmlu
  );

  return (
    <div className="space-y-6">
      <header>
        <h1 className="font-display text-3xl md:text-4xl font-semibold tracking-tight">
          Сводная таблица
        </h1>
        <p className="mt-2 text-muted-foreground max-w-2xl">
          Все модели в одной таблице, отсортированы по MMLU. Кликните по
          названию, чтобы открыть карточку модели.
        </p>
      </header>

      <Card>
        <CardContent className="p-0 overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="border-b border-white/10 text-left text-xs uppercase tracking-wide text-muted-foreground">
              <tr>
                <th className="px-4 py-3 font-medium">Модель</th>
                <th className="px-4 py-3 font-medium">Параметры</th>
                <th className="px-4 py-3 font-medium">Контекст</th>
                <th className="px-4 py-3 font-medium">Лицензия</th>
                <th className="px-4 py-3 font-medium font-mono">MMLU</th>
                <th className="px-4 py-3 font-medium font-mono">HumanEval</th>
                <th className="px-4 py-3 font-medium font-mono">GSM8K</th>
                <th className="px-4 py-3 font-medium font-mono">MT-Bench</th>
                <th className="px-4 py-3 font-medium">$/M in</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((m) => (
                <tr
                  key={m.id}
                  className="border-b border-white/[0.04] last:border-0 hover:bg-white/[0.02] transition-colors"
                >
                  <td className="px-4 py-3">
                    <Link
                      href={`/models/${m.id}`}
                      className="flex items-center gap-2 hover:text-gradient"
                    >
                      <span aria-hidden>{m.creatorLogo}</span>
                      <span className="font-medium">{m.name}</span>
                    </Link>
                    <div className="text-xs text-muted-foreground">
                      {m.creator}
                    </div>
                  </td>
                  <td className="px-4 py-3 font-mono">{m.parameters}</td>
                  <td className="px-4 py-3 font-mono">
                    {formatNumber(m.contextWindow)}
                  </td>
                  <td className="px-4 py-3">
                    <Badge variant="outline" className="text-[10px]">
                      {LICENSE_LABELS[m.license]}
                    </Badge>
                  </td>
                  <td className="px-4 py-3 font-mono">
                    {m.benchmarks.mmlu.toFixed(1)}
                  </td>
                  <td className="px-4 py-3 font-mono">
                    {m.benchmarks.humaneval.toFixed(1)}
                  </td>
                  <td className="px-4 py-3 font-mono">
                    {m.benchmarks.gsm8k.toFixed(1)}
                  </td>
                  <td className="px-4 py-3 font-mono">
                    {m.benchmarks.mtBench.toFixed(2)}
                  </td>
                  <td className="px-4 py-3 font-mono text-muted-foreground">
                    {m.pricing ? formatUSD(m.pricing.inputPerMillion) : "—"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>
    </div>
  );
}
