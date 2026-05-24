import type { LLMModel } from "@/types/model";

export const MODELS: LLMModel[] = [
  {
    id: "llama-3-70b",
    name: "Llama 3 70B Instruct",
    creator: "Meta",
    creatorLogo: "🦙",
    description:
      "Открытая флагманская модель Meta с сильным reasoning и кодом. Активно используется в продакшене.",
    releaseDate: "2024-04-18",
    parameters: "70B",
    paramsB: 70,
    contextWindow: 8192,
    license: "llama3-community",
    hfUrl: "https://huggingface.co/meta-llama/Meta-Llama-3-70B-Instruct",
    githubUrl: "https://github.com/meta-llama/llama3",
    benchmarks: {
      mmlu: 82.0,
      humaneval: 81.7,
      gsm8k: 93.0,
      truthfulqa: 51.4,
      mtBench: 8.95
    },
    pricing: {
      inputPerMillion: 0.59,
      outputPerMillion: 0.79,
      provider: "Together AI"
    },
    deploymentOptions: ["local", "api", "web-ui"],
    trend: "stable",
    tags: ["general", "code", "english"]
  },
  {
    id: "mixtral-8x7b",
    name: "Mixtral 8x7B Instruct",
    creator: "Mistral AI",
    creatorLogo: "🌬️",
    description:
      "Sparse Mixture-of-Experts с 12.9B активных параметров. Быстрая, дешёвая, многоязычная.",
    releaseDate: "2023-12-11",
    parameters: "MoE 8x7B",
    paramsB: 46.7,
    contextWindow: 32768,
    license: "apache-2.0",
    hfUrl: "https://huggingface.co/mistralai/Mixtral-8x7B-Instruct-v0.1",
    benchmarks: {
      mmlu: 70.6,
      humaneval: 40.2,
      gsm8k: 74.4,
      truthfulqa: 64.6,
      mtBench: 8.3
    },
    pricing: {
      inputPerMillion: 0.24,
      outputPerMillion: 0.24,
      provider: "Anyscale"
    },
    deploymentOptions: ["local", "api"],
    trend: "down",
    tags: ["moe", "multilingual", "fast"]
  },
  {
    id: "qwen-2.5-72b",
    name: "Qwen 2.5 72B Instruct",
    creator: "Alibaba",
    creatorLogo: "🐲",
    description:
      "Сильная модель с упором на математику и код, отличная поддержка китайского и английского.",
    releaseDate: "2024-09-19",
    parameters: "72B",
    paramsB: 72,
    contextWindow: 131072,
    license: "apache-2.0",
    hfUrl: "https://huggingface.co/Qwen/Qwen2.5-72B-Instruct",
    benchmarks: {
      mmlu: 85.0,
      humaneval: 86.6,
      gsm8k: 95.8,
      truthfulqa: 60.4,
      mtBench: 9.05
    },
    pricing: {
      inputPerMillion: 0.9,
      outputPerMillion: 0.9,
      provider: "Together AI"
    },
    deploymentOptions: ["local", "api", "web-ui"],
    trend: "up",
    tags: ["general", "math", "code", "multilingual"]
  },
  {
    id: "deepseek-v2.5",
    name: "DeepSeek-V2.5",
    creator: "DeepSeek",
    creatorLogo: "🐋",
    description:
      "Сильный универсальный MoE с акцентом на код и reasoning, очень дешёвый API.",
    releaseDate: "2024-09-05",
    parameters: "MoE 236B",
    paramsB: 21,
    contextWindow: 128000,
    license: "custom",
    hfUrl: "https://huggingface.co/deepseek-ai/DeepSeek-V2.5",
    benchmarks: {
      mmlu: 80.4,
      humaneval: 89.0,
      gsm8k: 95.1,
      truthfulqa: 58.0,
      mtBench: 9.02
    },
    pricing: {
      inputPerMillion: 0.14,
      outputPerMillion: 0.28,
      provider: "DeepSeek"
    },
    deploymentOptions: ["api", "web-ui"],
    trend: "up",
    tags: ["moe", "code", "cheap"]
  },
  {
    id: "phi-3-medium",
    name: "Phi-3 Medium 14B",
    creator: "Microsoft",
    creatorLogo: "🪟",
    description:
      "Маленькая, но плотная SLM с впечатляющими бенчмарками на reasoning.",
    releaseDate: "2024-05-21",
    parameters: "14B",
    paramsB: 14,
    contextWindow: 128000,
    license: "mit",
    hfUrl: "https://huggingface.co/microsoft/Phi-3-medium-128k-instruct",
    benchmarks: {
      mmlu: 78.0,
      humaneval: 62.2,
      gsm8k: 87.5,
      truthfulqa: 63.1,
      mtBench: 8.38
    },
    deploymentOptions: ["local", "colab"],
    trend: "stable",
    tags: ["slm", "reasoning", "edge"]
  },
  {
    id: "gemma-2-27b",
    name: "Gemma 2 27B",
    creator: "Google",
    creatorLogo: "💎",
    description:
      "Открытая модель от Google DeepMind с конкурентной производительностью в среднем классе.",
    releaseDate: "2024-06-27",
    parameters: "27B",
    paramsB: 27,
    contextWindow: 8192,
    license: "custom",
    hfUrl: "https://huggingface.co/google/gemma-2-27b-it",
    benchmarks: {
      mmlu: 75.2,
      humaneval: 51.8,
      gsm8k: 74.0,
      truthfulqa: 58.0,
      mtBench: 8.47
    },
    pricing: {
      inputPerMillion: 0.27,
      outputPerMillion: 0.27,
      provider: "Together AI"
    },
    deploymentOptions: ["local", "api"],
    trend: "stable",
    tags: ["general", "english"]
  },
  {
    id: "command-r-plus",
    name: "Command R+",
    creator: "Cohere",
    creatorLogo: "🅒",
    description:
      "Заточенная под RAG и tool use модель с длинным контекстом и сильным многоязычием.",
    releaseDate: "2024-04-04",
    parameters: "104B",
    paramsB: 104,
    contextWindow: 128000,
    license: "research-only",
    hfUrl: "https://huggingface.co/CohereForAI/c4ai-command-r-plus",
    benchmarks: {
      mmlu: 75.7,
      humaneval: 51.4,
      gsm8k: 70.7,
      truthfulqa: 64.5,
      mtBench: 8.4
    },
    pricing: {
      inputPerMillion: 3.0,
      outputPerMillion: 15.0,
      provider: "Cohere"
    },
    deploymentOptions: ["api", "web-ui"],
    trend: "down",
    tags: ["rag", "tools", "multilingual"]
  },
  {
    id: "yi-1.5-34b",
    name: "Yi 1.5 34B Chat",
    creator: "01.AI",
    creatorLogo: "🜂",
    description:
      "Билингвальная модель (EN/ZH) с хорошим балансом качества и стоимости.",
    releaseDate: "2024-05-12",
    parameters: "34B",
    paramsB: 34,
    contextWindow: 32768,
    license: "apache-2.0",
    hfUrl: "https://huggingface.co/01-ai/Yi-1.5-34B-Chat",
    benchmarks: {
      mmlu: 76.8,
      humaneval: 75.2,
      gsm8k: 82.7,
      truthfulqa: 60.5,
      mtBench: 8.5
    },
    deploymentOptions: ["local", "colab"],
    trend: "stable",
    tags: ["bilingual", "general"]
  },
  {
    id: "mistral-nemo-12b",
    name: "Mistral Nemo 12B",
    creator: "Mistral AI",
    creatorLogo: "🌬️",
    description:
      "Совместная модель Mistral × NVIDIA: 128K контекст, отличное многоязычие.",
    releaseDate: "2024-07-18",
    parameters: "12B",
    paramsB: 12,
    contextWindow: 128000,
    license: "apache-2.0",
    hfUrl: "https://huggingface.co/mistralai/Mistral-Nemo-Instruct-2407",
    benchmarks: {
      mmlu: 68.0,
      humaneval: 56.7,
      gsm8k: 78.4,
      truthfulqa: 50.3,
      mtBench: 8.1
    },
    pricing: {
      inputPerMillion: 0.18,
      outputPerMillion: 0.18,
      provider: "Together AI"
    },
    deploymentOptions: ["local", "api", "colab"],
    trend: "up",
    tags: ["multilingual", "long-context"]
  },
  {
    id: "llama-3.1-8b",
    name: "Llama 3.1 8B Instruct",
    creator: "Meta",
    creatorLogo: "🦙",
    description:
      "Маленькая Llama 3.1 с 128K контекстом — рабочая лошадка для локального запуска.",
    releaseDate: "2024-07-23",
    parameters: "8B",
    paramsB: 8,
    contextWindow: 128000,
    license: "llama3-community",
    hfUrl: "https://huggingface.co/meta-llama/Meta-Llama-3.1-8B-Instruct",
    benchmarks: {
      mmlu: 69.4,
      humaneval: 72.6,
      gsm8k: 84.5,
      truthfulqa: 45.0,
      mtBench: 8.0
    },
    pricing: {
      inputPerMillion: 0.18,
      outputPerMillion: 0.18,
      provider: "Groq"
    },
    deploymentOptions: ["local", "colab", "api"],
    trend: "up",
    tags: ["small", "long-context", "edge"]
  },
  {
    id: "qwen-2.5-coder-32b",
    name: "Qwen 2.5 Coder 32B",
    creator: "Alibaba",
    creatorLogo: "🐲",
    description:
      "Специализированный code-LLM: на уровне закрытых моделей по HumanEval и LiveCodeBench.",
    releaseDate: "2024-11-12",
    parameters: "32B",
    paramsB: 32,
    contextWindow: 131072,
    license: "apache-2.0",
    hfUrl: "https://huggingface.co/Qwen/Qwen2.5-Coder-32B-Instruct",
    benchmarks: {
      mmlu: 75.1,
      humaneval: 92.7,
      gsm8k: 91.1,
      truthfulqa: 57.8,
      mtBench: 8.8
    },
    deploymentOptions: ["local", "api"],
    trend: "up",
    tags: ["code", "specialized"]
  },
  {
    id: "falcon-180b",
    name: "Falcon 180B",
    creator: "TII",
    creatorLogo: "🦅",
    description:
      "Большая модель UAE Technology Innovation Institute. Любопытный baseline для сравнения.",
    releaseDate: "2023-09-06",
    parameters: "180B",
    paramsB: 180,
    contextWindow: 2048,
    license: "custom",
    hfUrl: "https://huggingface.co/tiiuae/falcon-180B",
    benchmarks: {
      mmlu: 70.5,
      humaneval: 35.4,
      gsm8k: 19.6,
      truthfulqa: 42.5,
      mtBench: 7.2
    },
    deploymentOptions: ["local"],
    trend: "down",
    tags: ["legacy", "research"]
  }
];

export function getModelById(id: string): LLMModel | undefined {
  return MODELS.find((m) => m.id === id);
}
