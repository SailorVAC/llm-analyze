export interface LLMModel {
  /** Уникальный slug, например "llama-3-70b" */
  id: string;
  /** Отображаемое название */
  name: string;
  /** Компания-разработчик */
  creator: string;
  /** Логотип компании (эмодзи или URL) */
  creatorLogo: string;
  /** Описание (1-2 предложения) */
  description: string;
  /** Дата релиза (ISO YYYY-MM-DD) */
  releaseDate: string;
  /** Количество параметров в строковом формате */
  parameters: string;
  /** Числовая оценка количества параметров в миллиардах, используется для фильтров */
  paramsB: number;
  /** Размер контекстного окна в токенах */
  contextWindow: number;
  /** Тип лицензии */
  license: LicenseType;
  /** Ссылка на репозиторий / страницу модели */
  hfUrl: string;
  githubUrl?: string;
  /** Бенчмарки */
  benchmarks: Benchmarks;
  /** Цена за миллион токенов (если есть API) */
  pricing?: Pricing;
  /** Способы запуска */
  deploymentOptions: DeploymentOption[];
  /** Тренд (позиция изменилась за неделю) */
  trend?: "up" | "down" | "stable";
  /** Теги */
  tags: string[];
}

export type LicenseType =
  | "apache-2.0"
  | "mit"
  | "llama3-community"
  | "research-only"
  | "custom"
  | "proprietary";

export interface Benchmarks {
  mmlu: number;
  humaneval: number;
  gsm8k: number;
  truthfulqa: number;
  mtBench: number;
}

export interface Pricing {
  inputPerMillion: number;
  outputPerMillion: number;
  provider: string;
}

export type DeploymentOption = "local" | "colab" | "api" | "web-ui";

export const LICENSE_LABELS: Record<LicenseType, string> = {
  "apache-2.0": "Apache 2.0",
  mit: "MIT",
  "llama3-community": "Llama 3 Community",
  "research-only": "Research only",
  custom: "Custom",
  proprietary: "Proprietary"
};

export const DEPLOYMENT_LABELS: Record<DeploymentOption, string> = {
  local: "Local",
  colab: "Colab",
  api: "API",
  "web-ui": "Web UI"
};
