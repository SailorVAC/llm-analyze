import type {
  DeploymentOption,
  LLMModel,
  LicenseType
} from "@/types/model";

export type SortKey =
  | "mmlu"
  | "humaneval"
  | "gsm8k"
  | "mtBench"
  | "params"
  | "context"
  | "newest";

export interface ModelFilters {
  search: string;
  creators: string[];
  licenses: LicenseType[];
  deployments: DeploymentOption[];
  /** включительные границы paramsB */
  paramsRange: [number, number];
  /** минимальный размер контекстного окна, токены */
  minContext: number;
  /** только модели с API/pricing */
  hasApiOnly: boolean;
  sort: SortKey;
}

export const DEFAULT_FILTERS: ModelFilters = {
  search: "",
  creators: [],
  licenses: [],
  deployments: [],
  paramsRange: [0, 200],
  minContext: 0,
  hasApiOnly: false,
  sort: "mmlu"
};

export function applyFilters(
  models: LLMModel[],
  f: ModelFilters
): LLMModel[] {
  const q = f.search.trim().toLowerCase();
  const filtered = models.filter((m) => {
    if (q) {
      const hay = `${m.name} ${m.creator} ${m.description} ${m.tags.join(" ")}`.toLowerCase();
      if (!hay.includes(q)) return false;
    }
    if (f.creators.length && !f.creators.includes(m.creator)) return false;
    if (f.licenses.length && !f.licenses.includes(m.license)) return false;
    if (
      f.deployments.length &&
      !f.deployments.some((d) => m.deploymentOptions.includes(d))
    )
      return false;
    if (m.paramsB < f.paramsRange[0] || m.paramsB > f.paramsRange[1]) return false;
    if (m.contextWindow < f.minContext) return false;
    if (f.hasApiOnly && !m.pricing) return false;
    return true;
  });

  return [...filtered].sort((a, b) => {
    switch (f.sort) {
      case "humaneval":
        return b.benchmarks.humaneval - a.benchmarks.humaneval;
      case "gsm8k":
        return b.benchmarks.gsm8k - a.benchmarks.gsm8k;
      case "mtBench":
        return b.benchmarks.mtBench - a.benchmarks.mtBench;
      case "params":
        return b.paramsB - a.paramsB;
      case "context":
        return b.contextWindow - a.contextWindow;
      case "newest":
        return (
          new Date(b.releaseDate).getTime() - new Date(a.releaseDate).getTime()
        );
      case "mmlu":
      default:
        return b.benchmarks.mmlu - a.benchmarks.mmlu;
    }
  });
}

export function serializeFilters(
  f: ModelFilters,
  defaults: ModelFilters = DEFAULT_FILTERS
): URLSearchParams {
  const params = new URLSearchParams();
  if (f.search) params.set("q", f.search);
  if (f.creators.length) params.set("creator", f.creators.join(","));
  if (f.licenses.length) params.set("license", f.licenses.join(","));
  if (f.deployments.length) params.set("deploy", f.deployments.join(","));
  if (
    f.paramsRange[0] !== defaults.paramsRange[0] ||
    f.paramsRange[1] !== defaults.paramsRange[1]
  ) {
    params.set("params", `${f.paramsRange[0]}-${f.paramsRange[1]}`);
  }
  if (f.minContext > 0) params.set("ctx", String(f.minContext));
  if (f.hasApiOnly) params.set("api", "1");
  if (f.sort !== defaults.sort) params.set("sort", f.sort);
  return params;
}

export function parseFilters(sp: URLSearchParams): ModelFilters {
  const f: ModelFilters = { ...DEFAULT_FILTERS };
  f.search = sp.get("q") ?? "";
  f.creators = sp.get("creator")?.split(",").filter(Boolean) ?? [];
  f.licenses =
    (sp.get("license")?.split(",").filter(Boolean) as LicenseType[]) ?? [];
  f.deployments =
    (sp.get("deploy")?.split(",").filter(Boolean) as DeploymentOption[]) ?? [];
  const params = sp.get("params");
  if (params) {
    const [a, b] = params.split("-").map(Number);
    if (!Number.isNaN(a) && !Number.isNaN(b)) f.paramsRange = [a, b];
  }
  const ctx = Number(sp.get("ctx"));
  if (!Number.isNaN(ctx) && ctx > 0) f.minContext = ctx;
  if (sp.get("api") === "1") f.hasApiOnly = true;
  const sort = sp.get("sort") as SortKey | null;
  if (
    sort &&
    ["mmlu", "humaneval", "gsm8k", "mtBench", "params", "context", "newest"].includes(sort)
  ) {
    f.sort = sort;
  }
  return f;
}
