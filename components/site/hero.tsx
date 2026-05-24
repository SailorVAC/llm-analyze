import { Badge } from "@/components/ui/badge";

export function Hero({ modelCount }: { modelCount: number }) {
  return (
    <section className="mb-10 md:mb-14">
      <Badge variant="accent" className="mb-4">
        <span className="font-mono">v0.1</span> · обновлено еженедельно
      </Badge>
      <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight leading-[1.05]">
        Сравнение <span className="text-gradient">открытых LLM</span>
        <br className="hidden md:block" />
        без маркетинговой пыли.
      </h1>
      <p className="mt-5 max-w-2xl text-base md:text-lg text-muted-foreground">
        {modelCount}+ моделей с открытыми весами в одной таблице: бенчмарки,
        лицензии, контекстное окно, цена API и способы запуска. Фильтруйте,
        сортируйте, сравнивайте.
      </p>
    </section>
  );
}
