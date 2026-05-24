import { Suspense } from "react";
import { CompareView } from "@/components/compare/compare-view";
import { Skeleton } from "@/components/ui/skeleton";

export const metadata = {
  title: "Сравнение моделей · Open LLM Hub",
  description: "Сравнение N открытых LLM по бенчмаркам, цене и параметрам."
};

export default function ComparePage() {
  return (
    <Suspense fallback={<CompareFallback />}>
      <CompareView />
    </Suspense>
  );
}

function CompareFallback() {
  return (
    <div className="space-y-6">
      <Skeleton className="h-12 w-64" />
      <Skeleton className="h-[380px] w-full" />
      <Skeleton className="h-[420px] w-full" />
    </div>
  );
}
