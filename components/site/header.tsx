"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { GitCompareArrows, Github, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCompare } from "@/lib/compare-context";
import { cn } from "@/lib/utils";

export function Header() {
  const pathname = usePathname();
  const { selected } = useCompare();

  const navItems = [
    { href: "/", label: "Explore" },
    { href: "/compare", label: "Compare" },
    { href: "/about", label: "About" }
  ];

  return (
    <header className="sticky top-0 z-40 border-b border-white/[0.06] bg-background/70 backdrop-blur-xl">
      <div className="container mx-auto flex h-14 items-center justify-between px-4">
        <Link href="/" className="group flex items-center gap-2">
          <span className="inline-flex h-7 w-7 items-center justify-center rounded-md bg-accent-gradient text-white shadow-lg shadow-indigo-500/30 transition-transform duration-300 group-hover:rotate-[8deg]">
            <Sparkles className="h-4 w-4" />
          </span>
          <span className="font-display text-sm font-semibold tracking-tight">
            Open LLM <span className="text-gradient">Hub</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {navItems.map((item) => {
            const active =
              pathname === item.href ||
              (item.href !== "/" && pathname.startsWith(item.href));
            return (
              <Button
                key={item.href}
                variant="ghost"
                size="sm"
                asChild
                className={cn(
                  "relative",
                  active && "text-foreground"
                )}
              >
                <Link href={item.href}>
                  {item.label}
                  {item.href === "/compare" && selected.length > 0 && (
                    <span className="ml-1 inline-flex h-5 min-w-[20px] items-center justify-center rounded-full bg-accent-gradient px-1 text-[10px] font-semibold text-white">
                      {selected.length}
                    </span>
                  )}
                  {active && (
                    <span className="absolute inset-x-3 -bottom-3 h-px bg-accent-gradient" />
                  )}
                </Link>
              </Button>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          {selected.length > 0 && (
            <Button asChild size="sm" className="md:hidden">
              <Link href="/compare">
                <GitCompareArrows className="h-4 w-4" />
                {selected.length}
              </Link>
            </Button>
          )}
          <Button variant="outline" size="sm" asChild>
            <a
              href="https://github.com"
              target="_blank"
              rel="noreferrer noopener"
              aria-label="GitHub"
            >
              <Github className="h-4 w-4" />
              <span className="hidden sm:inline">GitHub</span>
            </a>
          </Button>
        </div>
      </div>
    </header>
  );
}
