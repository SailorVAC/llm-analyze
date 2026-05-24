"use client";

import { Check, Plus, GitCompareArrows } from "lucide-react";
import { useCompare, MAX_COMPARE } from "@/lib/compare-context";
import { cn } from "@/lib/utils";

interface Props {
  modelId: string;
  className?: string;
  variant?: "icon" | "pill";
}

export function CompareToggle({ modelId, className, variant = "icon" }: Props) {
  const { isSelected, toggle, canAddMore } = useCompare();
  const active = isSelected(modelId);
  const disabled = !active && !canAddMore;

  const handle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (disabled) return;
    toggle(modelId);
  };

  if (variant === "pill") {
    return (
      <button
        type="button"
        onClick={handle}
        disabled={disabled}
        aria-pressed={active}
        title={
          disabled ? `Максимум ${MAX_COMPARE} моделей в сравнении` : undefined
        }
        className={cn(
          "inline-flex items-center gap-1.5 rounded-md border px-2.5 py-1 text-xs font-medium transition-all duration-200",
          active
            ? "border-transparent bg-accent-gradient text-white shadow-md shadow-indigo-500/30"
            : "border-white/10 bg-white/[0.04] text-muted-foreground hover:text-foreground hover:bg-white/[0.08]",
          disabled && "opacity-40 cursor-not-allowed",
          className
        )}
      >
        {active ? <Check className="h-3 w-3" /> : <GitCompareArrows className="h-3 w-3" />}
        {active ? "В сравнении" : "Сравнить"}
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={handle}
      disabled={disabled}
      aria-pressed={active}
      aria-label={active ? "Убрать из сравнения" : "Добавить в сравнение"}
      title={
        disabled ? `Максимум ${MAX_COMPARE} моделей в сравнении` : undefined
      }
      className={cn(
        "inline-flex h-7 w-7 items-center justify-center rounded-md border transition-all duration-200",
        active
          ? "border-transparent bg-accent-gradient text-white shadow-md shadow-indigo-500/30 scale-100"
          : "border-white/10 bg-white/[0.03] text-muted-foreground hover:text-foreground hover:bg-white/[0.08]",
        disabled && "opacity-40 cursor-not-allowed",
        className
      )}
    >
      {active ? <Check className="h-3.5 w-3.5" /> : <Plus className="h-3.5 w-3.5" />}
    </button>
  );
}
