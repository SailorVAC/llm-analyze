import { Suspense } from "react";
import { Hero } from "@/components/site/hero";
import { ExploreView } from "@/components/models/explore-view";
import { Skeleton } from "@/components/ui/skeleton";
import { MODELS } from "@/lib/data";

export default function HomePage() {
  const creatorCount = new Set(MODELS.map((m) => m.creator)).size;
  const apiCount = MODELS.filter((m) => m.pricing).length;

  return (
    <>
      <Hero
        modelCount={MODELS.length}
        creatorCount={creatorCount}
        apiCount={apiCount}
      />
      <Suspense fallback={<GridFallback />}>
        <ExploreView models={MODELS} />
      </Suspense>
    </>
  );
}

function GridFallback() {
  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-[280px_1fr]">
      <Skeleton className="h-[640px] w-full" />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <Skeleton key={i} className="h-56 w-full" />
        ))}
      </div>
    </div>
  );
}
