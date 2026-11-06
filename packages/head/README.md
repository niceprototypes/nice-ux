# @niceprototypes/head

## Install

```sh
pnpm add @niceprototypes/head
```

## Usage

```tsx
import { Head } from "@niceprototypes/head"

<Head seo={{ title: "Home", canonical: "https://example.com/" }} />
```

Non-React apps use `injectHead`. `Head` and `injectHead` resolve through the same `build*` services, so both produce the same markup.

## Docs

Props: `HeadProps` in `src/components/Head/types.ts`; config types in `src/types/`; services in `src/services/`, each with JSDoc.

## License

MIT
