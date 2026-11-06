# @niceprototypes/calendar

## Install

```sh
pnpm add @niceprototypes/calendar
```

Peer dependencies and app setup: [Build on Nice](../../manifest/agents/README.md).

## Usage

```tsx
import { Calendar, DateField } from "@niceprototypes/calendar"
```

Each component also takes `breakpoints`: breakpoint keys to partial props (`BreakpointOverride`, `packages/styles/src/react/services/withBreakpoints`).

## Docs

| Component | Storybook story |
|---|---|
| Calendar | `components-forms-calendar--playground` |
| DateField | `components-forms-datefield--playground` |

Storybook runs with `pnpm storybook` at the nice-ux root. Props, types, defaults, token addresses and exports: [`manifest/agents/catalog.json`](../../manifest/agents/catalog.json), from the nice-ux root:

```sh
jq '.packages[]|select(.package=="@niceprototypes/calendar")' manifest/agents/catalog.json
```

## License

MIT
