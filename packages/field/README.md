# @niceprototypes/field

## Install

```sh
pnpm add @niceprototypes/field
```

Peer dependencies and app setup: [Build on Nice](../../manifest/agents/README.md).

## Usage

```tsx
import { Field, Fieldset } from "@niceprototypes/field"
```

Each component also takes `breakpoints`: breakpoint keys to partial props (`BreakpointOverride`, `packages/styles/src/react/services/withBreakpoints`).

## Docs

| Component | Storybook story |
|---|---|
| Field | `components-forms-field--playground` |
| Fieldset | `components-forms-field-fieldset--playground` |

Storybook runs with `pnpm storybook` at the nice-ux root. Props, types, defaults, token addresses and exports: [`manifest/agents/catalog.json`](../../manifest/agents/catalog.json), from the nice-ux root:

```sh
jq '.packages[]|select(.package=="@niceprototypes/field")' manifest/agents/catalog.json
```

## License

MIT
