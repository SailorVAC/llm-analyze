"use client";

import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, X, GitCompareArrows } from "lucide-react";
import { useCompare } from "@/lib/compare-context";
import { getModelsByIds } from "@/lib/data";
import { Button } from "@/components/ui/button";

export function CompareTray() {
  const { selected, clear, remove } = useCompare();
  const models = getModelsByIds(selected);

  return (
    <AnimatePresence>
      {models.length > 0 && (
        <motion.div
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 80, opacity: 0 }}
          transition={{ type: "spring", stiffness: 320, damping: 30 }}
          className="fixed inset-x-0 bottom-4 z-40 mx-auto flex w-fit max-w-[calc(100vw-2rem)] px-4"
        >
          <div className="flex items-center gap-3 rounded-full border border-white/10 bg-[#141414]/85 px-3 py-2 shadow-2xl shadow-black/40 backdrop-blur-xl">
            <div className="flex items-center gap-1.5 pl-1 pr-1">
              <GitCompareArrows className="h-4 w-4 text-indigo-300" />
              <span className="text-xs font-medium text-muted-foreground">
                В сравнении
              </span>
              <span className="font-mono text-xs text-foreground">
                {models.length}
              </span>
            </div>

            <div className="flex -space-x-1.5">
              <AnimatePresence initial={false}>
                {models.map((m) => (
                  <motion.button
                    key={m.id}
                    layout
                    initial={{ scale: 0.6, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.6, opacity: 0 }}
                    transition={{ type: "spring", stiffness: 400, damping: 28 }}
                    type="button"
                    onClick={() => remove(m.id)}
                    aria-label={`Убрать ${m.name}`}
                    className="group relative inline-flex h-7 w-7 items-center justify-center rounded-full border border-white/10 bg-white/5 text-base transition-colors hover:bg-white/10"
                    title={m.name}
                  >
                    <span aria-hidden>{m.creatorLogo}</span>
                    <span className="pointer-events-none absolute inset-0 hidden items-center justify-center rounded-full bg-black/60 group-hover:flex">
                      <X className="h-3 w-3 text-white" />
                    </span>
                  </motion.button>
                ))}
              </AnimatePresence>
            </div>

            <div className="flex items-center gap-1">
              <Button
                variant="ghost"
                size="sm"
                onClick={clear}
                className="h-8 px-2 text-xs text-muted-foreground"
              >
                Очистить
              </Button>
              <Button asChild size="sm" className="h-8">
                <Link
                  href={`/compare?ids=${models.map((m) => m.id).join(",")}`}
                >
                  Сравнить <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </Button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
