# @niceprototypes/app

## Install

```sh
pnpm add @niceprototypes/app
```

Peer dependencies and app setup: [Build on Nice](../../manifest/agents/README.md).

## Usage

```tsx
import { App } from "@niceprototypes/app"
```

## Docs

| Component | Storybook story |
|---|---|
| App | `components-app--playground` |

Storybook runs with `pnpm storybook` at the nice-ux root. Props, types, defaults, token addresses and exports: [`manifest/agents/catalog.json`](../../manifest/agents/catalog.json), from the nice-ux root:

```sh
jq '.packages[]|select(.package=="@niceprototypes/app")' manifest/agents/catalog.json
```

## License

MIT
