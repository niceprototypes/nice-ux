# @niceprototypes/scroll

## Install

```sh
pnpm add @niceprototypes/scroll
```

Peer dependencies and app setup: [Build on Nice](../../manifest/agents/README.md).

## Usage

```tsx
import { Scroll, StickySectionLinks, StickySection } from "@niceprototypes/scroll"
```

## Docs

| Component | Storybook story |
|---|---|
| Scroll | `components-scroll-scroll--playground` |
| StickySectionLinks | `components-scroll-sectionlinks--playground` |
| StickySection | `components-scroll-stickysection--playground` |

Storybook runs with `pnpm storybook` at the nice-ux root. Props, types, defaults, token addresses and exports: [`manifest/agents/catalog.json`](../../manifest/agents/catalog.json), from the nice-ux root:

```sh
jq '.packages[]|select(.package=="@niceprototypes/scroll")' manifest/agents/catalog.json
```

## License

MIT
