# @niceprototypes/image

## Install

```sh
pnpm add @niceprototypes/image
```

Peer dependencies and app setup: [Build on Nice](../../manifest/agents/README.md).

## Usage

```tsx
import { Image } from "@niceprototypes/image"
```

`Image` also takes `breakpoints`: breakpoint keys to partial props (`BreakpointOverride`, `packages/styles/src/react/services/withBreakpoints`).

Vendor images (`vendor`) need [`@niceprototypes/image-vendor`](../image-vendor/README.md).

## Docs

| Component | Storybook story |
|---|---|
| Image | `components-image--playground` |

Storybook runs with `pnpm storybook` at the nice-ux root. Props, types, defaults, token addresses and exports: [`manifest/agents/catalog.json`](../../manifest/agents/catalog.json), from the nice-ux root:

```sh
jq '.packages[]|select(.package=="@niceprototypes/image")' manifest/agents/catalog.json
```

## License

MIT
