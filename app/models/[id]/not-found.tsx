import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="flex h-[60vh] flex-col items-center justify-center text-center">
      <p className="font-mono text-xs uppercase tracking-wider text-muted-foreground">
        404
      </p>
      <h1 className="mt-2 font-display text-3xl font-semibold">
        Модель не найдена
      </h1>
      <p className="mt-2 text-muted-foreground max-w-md">
        Возможно, slug изменился или модель ещё не добавлена в каталог.
      </p>
      <Button asChild className="mt-6">
        <Link href="/">Вернуться к каталогу</Link>
      </Button>
    </div>
  );
}
