# @niceprototypes/list

## Install

```sh
pnpm add @niceprototypes/list
```

Peer dependencies and app setup: [Build on Nice](../../manifest/agents/README.md).

## Usage

```tsx
import { List, ListItem } from "@niceprototypes/list"
```

Each component also takes `breakpoints`: breakpoint keys to partial props (`BreakpointOverride`, `packages/styles/src/react/services/withBreakpoints`).

## Docs

| Component | Storybook story |
|---|---|
| List | `components-list--playground` |
| ListItem | section of List (`components-list--docs`) |

Storybook runs with `pnpm storybook` at the nice-ux root. Props, types, defaults, token addresses and exports: [`manifest/agents/catalog.json`](../../manifest/agents/catalog.json), from the nice-ux root:

```sh
jq '.packages[]|select(.package=="@niceprototypes/list")' manifest/agents/catalog.json
```

## License

MIT
