import { Card, CardContent } from "@/components/ui/card";

export const metadata = {
  title: "О проекте · Open LLM Hub"
};

export default function AboutPage() {
  return (
    <div className="prose prose-invert max-w-3xl">
      <h1 className="font-display text-3xl md:text-4xl font-semibold tracking-tight">
        О проекте
      </h1>
      <Card className="mt-6">
        <CardContent className="p-6 space-y-4 text-sm text-muted-foreground leading-relaxed">
          <p>
            <strong className="text-foreground">Open LLM Hub</strong> — открытая
            аналитическая платформа для сравнения больших языковых моделей
            с открытыми весами. Цель проекта — дать инженерам быстрый
            ответ на вопрос «какую модель выбрать под мою задачу и бюджет».
          </p>
          <p>
            Данные собраны из публичных карточек на Hugging Face, технических
            репортов разработчиков и независимых лидербордов
            (Open LLM Leaderboard, MT-Bench, EvalPlus). Цены API — на момент
            добавления модели; верьте только официальным прайс-листам.
          </p>
          <p>
            Pull request с новыми моделями, исправлениями бенчмарков и
            фидбеком приветствуются. Стек: Next.js 14 App Router,
            TypeScript, Tailwind CSS, Recharts, Framer Motion.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
