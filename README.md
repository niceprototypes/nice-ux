# nice-ux

Nice UI: the `@niceprototypes/*` React component packages, their Storybook, and the manifest that tells agents how to work with them.

## For agents

Start with the manifest, not the source:

1. [`manifest/README.md`](manifest/README.md): the load model, the always-on Core rules and the reading order for each task.
2. [`manifest/discipline/manager.md`](manifest/discipline/manager.md): manager mode. Top-level agents delegate and report status; subagents whose prompt begins with `ROLE: Nice subagent` follow their brief instead.
3. [`manifest/agents/README.md`](manifest/agents/README.md): quickstart, composition rules, checklists.
4. [`manifest/agents/components.txt`](manifest/agents/components.txt): one line per component. Query [`catalog.json`](manifest/agents/catalog.json) with `jq` instead of reading it whole.

Open work is in [`manifest/backlog.md`](manifest/backlog.md).

## Install

```sh
npm i @niceprototypes/ux
```

```tsx
import { Button, Flex } from "@niceprototypes/ux"
```

Each component is also published on its own, for example `@niceprototypes/button`.

## Layout

- `packages/`: one folder per package (components, `styles`, `icon`, configs, `toolkit`). `ux` is the umbrella that re-exports every component.
- `apps/storybook`: the Storybook, which reads package source directly. The live version is at https://niceprototypes.com/ui/.
- `manifest/`: the agent docs.

## Develop

Requires Node 24 and pnpm.

```sh
pnpm install
pnpm build
pnpm test
pnpm storybook
```

Releases use Changesets (`pnpm changeset`). See [`manifest/publish/release.md`](manifest/publish/release.md).
