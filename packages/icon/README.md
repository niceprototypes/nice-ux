# @niceprototypes/icon

## Install

```sh
pnpm add @niceprototypes/icon
```

Peer dependencies and app setup: [Build on Nice](../../manifest/agents/README.md).

## Usage

```tsx
import { Icon, Illustration } from "@niceprototypes/icon"
```

Each component also takes `breakpoints`: breakpoint keys to partial props (`BreakpointOverride`, `packages/styles/src/react/services/withBreakpoints`).

String and base64 services (`getIcon`, `getIconEncoded`, `getIllustration`, `getIllustrationEncoded`) come from `@niceprototypes/icon/svg`: [svg/README.md](svg/README.md). Lucide icons (`vendor`) need [`@niceprototypes/icon-vendor`](../icon-vendor/README.md).

## Docs

| Component | Storybook story |
|---|---|
| Icon | `components-icon--playground` |
| Illustration | `components-illustration--playground` |

Storybook runs with `pnpm storybook` at the nice-ux root. Props, types, defaults, token addresses and exports: [`manifest/agents/catalog.json`](../../manifest/agents/catalog.json), from the nice-ux root:

```sh
jq '.packages[]|select(.package=="@niceprototypes/icon")' manifest/agents/catalog.json
```

## License

MIT

`book-open` is adapted from [Lucide](https://lucide.dev) (ISC); its notice is in LICENSE.
