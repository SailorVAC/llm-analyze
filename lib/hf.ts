/**
 * Server-side fetcher for fresh / trending open LLMs from the Hugging Face Hub API.
 *
 * Uses Next.js fetch caching with revalidation, so the request is hit at most
 * once per hour per region — page renders stay fast and data stays fresh.
 * Should only be imported from Server Components / route handlers.
 */

export interface HFModel {
  id: string;            // "meta-llama/Meta-Llama-3.1-70B-Instruct"
  modelId: string;       // same as id, kept for backwards compat
  author: string;        // "meta-llama"
  name: string;          // pretty name derived from id
  url: string;           // huggingface.co/<id>
  pipeline?: string;     // "text-generation" | "image-text-to-text" | ...
  tags: string[];
  downloads: number;
  likes: number;
  trendingScore?: number;
  lastModified: string;  // ISO
  createdAt?: string;    // ISO
}

const HF_API = "https://huggingface.co/api/models";

/** ~1 hour ISR — fits HF Hub trending refresh cadence well. */
export const TRENDING_REVALIDATE_SECONDS = 60 * 60;

interface FetchOptions {
  limit?: number;
  pipeline?: "text-generation" | "image-text-to-text";
  /** "trendingScore" | "likes7d" | "downloads" | "lastModified" | "createdAt" */
  sort?: "trendingScore" | "likes7d" | "downloads" | "lastModified" | "createdAt";
}

/**
 * Fetch trending open LLMs from Hugging Face Hub.
 * Returns [] on any failure (network, parse, schema mismatch) — UI degrades gracefully.
 */
export async function fetchTrendingHFModels(
  opts: FetchOptions = {}
): Promise<HFModel[]> {
  const { limit = 18, pipeline = "text-generation", sort = "trendingScore" } = opts;

  const params = new URLSearchParams({
    pipeline_tag: pipeline,
    sort,
    direction: "-1",
    limit: String(limit),
    full: "false"
  });

  const url = `${HF_API}?${params.toString()}`;

  try {
    const res = await fetch(url, {
      next: { revalidate: TRENDING_REVALIDATE_SECONDS, tags: ["hf-trending"] },
      headers: { Accept: "application/json" }
    });

    if (!res.ok) {
      console.warn(`[hf] trending fetch failed: ${res.status} ${res.statusText}`);
      return [];
    }

    const json = (await res.json()) as Array<Record<string, unknown>>;
    return json
      .map(normalizeHFModel)
      .filter((m): m is HFModel => Boolean(m))
      .filter(isLikelyOpenLLM);
  } catch (err) {
    console.warn("[hf] trending fetch error", err);
    return [];
  }
}

function normalizeHFModel(raw: Record<string, unknown>): HFModel | null {
  const id = typeof raw.id === "string" ? raw.id : (raw.modelId as string | undefined);
  if (!id) return null;

  const [author, repo] = id.includes("/") ? id.split("/") : ["", id];

  return {
    id,
    modelId: id,
    author,
    name: prettifyName(repo ?? id),
    url: `https://huggingface.co/${id}`,
    pipeline: typeof raw.pipeline_tag === "string" ? raw.pipeline_tag : undefined,
    tags: Array.isArray(raw.tags) ? (raw.tags as string[]).slice(0, 12) : [],
    downloads: typeof raw.downloads === "number" ? raw.downloads : 0,
    likes: typeof raw.likes === "number" ? raw.likes : 0,
    trendingScore:
      typeof raw.trendingScore === "number" ? raw.trendingScore : undefined,
    lastModified:
      typeof raw.lastModified === "string" ? raw.lastModified : new Date().toISOString(),
    createdAt: typeof raw.createdAt === "string" ? raw.createdAt : undefined
  };
}

/** Filter out obvious noise: vision-only, embeddings, audio, etc. */
function isLikelyOpenLLM(m: HFModel): boolean {
  // pipeline filter does most of the work, but HF returns null pipelines sometimes
  if (m.pipeline && m.pipeline !== "text-generation" && m.pipeline !== "image-text-to-text") {
    return false;
  }
  // skip super tiny experimental forks with zero downloads
  if (m.downloads < 50) return false;
  return true;
}

function prettifyName(repo: string): string {
  return repo
    .replace(/[-_]/g, " ")
    .replace(/\bv?(\d+(?:\.\d+)*)/g, (_, v) => v)
    .replace(/\s+/g, " ")
    .trim();
}

const KNOWN_LOGOS: Record<string, string> = {
  "meta-llama": "🦙",
  meta: "🦙",
  mistralai: "🌬️",
  qwen: "🐲",
  "deepseek-ai": "🐋",
  microsoft: "🪟",
  google: "💎",
  cohereforai: "🅒",
  cohere: "🅒",
  "01-ai": "🜂",
  "ibm-granite": "🟦",
  ibm: "🟦",
  allenai: "🔶",
  bigcode: "⭐",
  databricks: "🔷",
  ai21labs: "🌀",
  ai21: "🌀",
  internlm: "🜨",
  thudm: "🜅",
  zhipuai: "🜅",
  tiiuae: "🦅",
  nvidia: "🟩",
  nousresearch: "🧪",
  openchat: "💬",
  upstage: "🟣",
  stabilityai: "🟧",
  huggingfaceh4: "🤗",
  huggingface: "🤗"
};

export function logoFor(author: string): string {
  return KNOWN_LOGOS[author.toLowerCase()] ?? "✨";
}
