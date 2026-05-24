# Open LLM Hub

Аналитическая платформа для сравнения **открытых LLM**: бенчмарки, лицензии, контекстное окно, цены API и способы запуска. Тёмная тема, фильтры с синхронизацией в URL, страница каждой модели с radar-чартом бенчмарков.

## Стек

- **Next.js 14** (App Router) + TypeScript (strict)
- **Tailwind CSS** + shadcn-style UI (Radix UI primitives)
- **Recharts** для графиков, **Framer Motion** для анимаций
- **Lucide React** для иконок
- Состояние фильтров — URL search params (без Redux)

## Старт

Требуется Node.js 18.17+ и `pnpm`.

```bash
pnpm install
pnpm dev
```

Открой [http://localhost:3000](http://localhost:3000).

### Скрипты

| Команда            | Что делает                       |
| ------------------ | -------------------------------- |
| `pnpm dev`         | Dev-сервер                       |
| `pnpm build`       | Production-сборка                |
| `pnpm start`       | Запуск собранной версии          |
| `pnpm lint`        | ESLint (Next core-web-vitals)    |
| `pnpm typecheck`   | `tsc --noEmit`                   |

## Структура

```
app/
  layout.tsx             # шапка, фоны, шрифты, метаданные
  page.tsx               # каталог моделей
  models/[id]/page.tsx   # карточка модели + radar-чарт
  compare/page.tsx       # сводная таблица
  about/page.tsx
components/
  ui/                    # shadcn-style примитивы
  site/                  # header, hero
  models/                # filters-panel, model-card, grid, benchmark-chart
lib/
  data.ts                # каталог моделей (mock)
  filters.ts             # ModelFilters, парсинг/сериализация URL
  utils.ts               # cn, форматтеры
types/
  model.ts               # LLMModel, LicenseType, Benchmarks, Pricing, ...
```

## Данные

В `lib/data.ts` лежит mock-каталог из ~40 моделей (Llama 3 / 3.1 / 3.2 / 3.3, Mistral Large 2 / Small 3 / Mixtral / Nemo / Ministral / Pixtral / Codestral, Qwen 2.5 / Qwen3 / QwQ, DeepSeek V2.5 / V3 / R1 + distills, Gemma 2, Phi-3 / Phi-4, Command R+ / Aya, Yi, OLMo 2, Granite, StarCoder2, DBRX, Jamba, InternLM, GLM-4, Nemotron, Falcon). Бенчмарки и цены — на момент добавления; для продакшена подключите свой источник.

## Фильтры

- Поиск по названию / описанию / тегам
- Сортировка: MMLU, HumanEval, GSM8K, MT-Bench, параметры, контекст, дата релиза
- Диапазон параметров (B)
- Минимальный контекст (8K / 32K / 128K)
- Лицензия (Apache 2.0, MIT, Llama 3 community, research-only, custom, proprietary)
- Способ запуска (local / colab / api / web-ui)
- Разработчик (мульти-выбор)
- Только модели с публичным API

Все фильтры синхронизируются с URL — ссылку можно расшарить.

## Сравнение моделей

Кнопка `+` на карточке (или «Сравнить» в карточке модели) добавляет до **6** моделей в сравнение. Выбор хранится в `localStorage` и кодируется в URL: `/compare?ids=deepseek-r1,llama-3.3-70b,qwen-3-32b`.

Страница `/compare` показывает три представления:

- **График** — overlay radar по 5 бенчмаркам.
- **По бенчмаркам** — отдельные bar-чарты для MMLU / HumanEval / GSM8K / MT-Bench.
- **Таблица** — параметры рядом, лучшие значения подсвечиваются.

Внизу страницы — sticky tray с миниатюрами выбранных моделей; пока он виден, можно быстро убирать модели из сравнения.

## Лицензия

MIT. Данные о моделях принадлежат их разработчикам.
