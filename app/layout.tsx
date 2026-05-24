import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/site/header";
import { cn } from "@/lib/utils";

const inter = Inter({
  subsets: ["latin", "cyrillic"],
  variable: "--font-inter",
  display: "swap"
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  display: "swap"
});

export const metadata: Metadata = {
  title: "Open LLM Hub — сравнение открытых LLM",
  description:
    "Аналитическая платформа для сравнения открытых больших языковых моделей: бенчмарки, лицензии, цены, способы запуска.",
  metadataBase: new URL("https://open-llm-hub.local"),
  openGraph: {
    title: "Open LLM Hub",
    description:
      "Сравнение открытых LLM: бенчмарки, лицензии, цены, способы запуска.",
    type: "website"
  }
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru" className="dark" suppressHydrationWarning>
      <body
        className={cn(
          inter.variable,
          jetbrainsMono.variable,
          "min-h-screen bg-background font-sans antialiased"
        )}
      >
        <div className="pointer-events-none fixed inset-0 -z-10 bg-noise opacity-60" />
        <div
          className="pointer-events-none fixed inset-x-0 top-0 -z-10 h-[480px] opacity-50"
          style={{
            background:
              "radial-gradient(ellipse at 50% 0%, rgba(99,102,241,0.18) 0%, transparent 60%)"
          }}
        />
        <Header />
        <main className="container mx-auto px-4 py-8 md:py-12">{children}</main>
        <footer className="border-t border-white/5 mt-24">
          <div className="container mx-auto px-4 py-8 text-xs text-muted-foreground flex flex-col md:flex-row items-center justify-between gap-2">
            <p>
              Open LLM Hub © {new Date().getFullYear()} — данные могут устаревать,
              проверяйте источники.
            </p>
            <p className="font-mono">
              Built with Next.js · Tailwind · Recharts · Framer Motion
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
}
