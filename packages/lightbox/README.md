# @niceprototypes/lightbox

## Install

```sh
pnpm add @niceprototypes/lightbox
```

Peer dependencies and app setup: [Build on Nice](../../manifest/agents/README.md).

## Usage

```tsx
import { Lightbox } from "@niceprototypes/lightbox"
```

`Lightbox` also takes `breakpoints`: breakpoint keys to partial props (`BreakpointOverride`, `packages/styles/src/react/services/withBreakpoints`).

## Docs

| Component | Storybook story |
|---|---|
| Lightbox | `components-lightbox--playground` |

Storybook runs with `pnpm storybook` at the nice-ux root. Props, types, defaults, token addresses and exports: [`manifest/agents/catalog.json`](../../manifest/agents/catalog.json), from the nice-ux root:

```sh
jq '.packages[]|select(.package=="@niceprototypes/lightbox")' manifest/agents/catalog.json
```

## License

MIT
