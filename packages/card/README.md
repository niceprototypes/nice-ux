# @niceprototypes/card

## Install

```sh
pnpm add @niceprototypes/card
```

Peer dependencies and app setup: [Build on Nice](../../manifest/agents/README.md).

## Usage

```tsx
import { Card, CardBody, CardFooter, CardHeader } from "@niceprototypes/card"
```

Each component also takes `breakpoints`: breakpoint keys to partial props (`BreakpointOverride`, `packages/styles/src/react/services/withBreakpoints`).

## Docs

| Component | Storybook story |
|---|---|
| Card | `components-card--playground` |
| CardBody | `components-cardbody--playground` |
| CardFooter | `components-cardfooter--playground` |
| CardHeader | `components-cardheader--playground` |

Storybook runs with `pnpm storybook` at the nice-ux root. Props, types, defaults, token addresses and exports: [`manifest/agents/catalog.json`](../../manifest/agents/catalog.json), from the nice-ux root:

```sh
jq '.packages[]|select(.package=="@niceprototypes/card")' manifest/agents/catalog.json
```

## License

MIT
