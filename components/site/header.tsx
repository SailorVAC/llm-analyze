import Link from "next/link";
import { Github, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-white/[0.06] bg-background/70 backdrop-blur-xl">
      <div className="container mx-auto flex h-14 items-center justify-between px-4">
        <Link href="/" className="group flex items-center gap-2">
          <span className="inline-flex h-7 w-7 items-center justify-center rounded-md bg-accent-gradient text-white shadow-lg shadow-indigo-500/30">
            <Sparkles className="h-4 w-4" />
          </span>
          <span className="font-display text-sm font-semibold tracking-tight">
            Open LLM <span className="text-gradient">Hub</span>
          </span>
        </Link>
        <nav className="hidden items-center gap-1 md:flex">
          <Button variant="ghost" size="sm" asChild>
            <Link href="/">Explore</Link>
          </Button>
          <Button variant="ghost" size="sm" asChild>
            <Link href="/compare">Compare</Link>
          </Button>
          <Button variant="ghost" size="sm" asChild>
            <Link href="/about">About</Link>
          </Button>
        </nav>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" asChild>
            <a
              href="https://github.com"
              target="_blank"
              rel="noreferrer noopener"
              aria-label="GitHub"
            >
              <Github className="h-4 w-4" />
              <span className="hidden sm:inline">Star on GitHub</span>
            </a>
          </Button>
        </div>
      </div>
    </header>
  );
}
