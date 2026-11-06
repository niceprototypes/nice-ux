# @niceprototypes/tooltip

## Install

```sh
pnpm add @niceprototypes/tooltip
```

Peer dependencies and app setup: [Build on Nice](../../manifest/agents/README.md).

## Usage

```tsx
import { Tooltip } from "@niceprototypes/tooltip"
```

`Tooltip` also takes `breakpoints`: breakpoint keys to partial props (`BreakpointOverride`, `packages/styles/src/react/services/withBreakpoints`).

## Docs

| Component | Storybook story |
|---|---|
| Tooltip | `components-tooltip--playground` |

Storybook runs with `pnpm storybook` at the nice-ux root. Props, types, defaults, token addresses and exports: [`manifest/agents/catalog.json`](../../manifest/agents/catalog.json), from the nice-ux root:

```sh
jq '.packages[]|select(.package=="@niceprototypes/tooltip")' manifest/agents/catalog.json
```

## License

MIT
