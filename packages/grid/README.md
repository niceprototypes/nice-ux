# @niceprototypes/grid

## Install

```sh
pnpm add @niceprototypes/grid
```

Peer dependencies and app setup: [Build on Nice](../../manifest/agents/README.md).

## Usage

```tsx
import { Grid, GridItem } from "@niceprototypes/grid"
```

Each component also takes `breakpoints`: breakpoint keys to partial props (`BreakpointOverride`, `packages/styles/src/react/services/withBreakpoints`).

## Docs

| Component | Storybook story |
|---|---|
| Grid | `components-grid--playground` |
| GridItem | `components-griditem--playground` |

Storybook runs with `pnpm storybook` at the nice-ux root. Props, types, defaults, token addresses and exports: [`manifest/agents/catalog.json`](../../manifest/agents/catalog.json), from the nice-ux root:

```sh
jq '.packages[]|select(.package=="@niceprototypes/grid")' manifest/agents/catalog.json
```

## License

MIT
