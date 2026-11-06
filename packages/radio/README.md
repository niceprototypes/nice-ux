# @niceprototypes/radio

## Install

```sh
pnpm add @niceprototypes/radio
```

Peer dependencies and app setup: [Build on Nice](../../manifest/agents/README.md).

## Usage

```tsx
import { Radio, RadioGroup } from "@niceprototypes/radio"
```

Each component also takes `breakpoints`: breakpoint keys to partial props (`BreakpointOverride`, `packages/styles/src/react/services/withBreakpoints`).

## Docs

| Component | Storybook story |
|---|---|
| Radio | `components-forms-radio--playground` |
| RadioGroup | `components-forms-radiogroup--playground` |

Storybook runs with `pnpm storybook` at the nice-ux root. Props, types, defaults, token addresses and exports: [`manifest/agents/catalog.json`](../../manifest/agents/catalog.json), from the nice-ux root:

```sh
jq '.packages[]|select(.package=="@niceprototypes/radio")' manifest/agents/catalog.json
```

## License

MIT
