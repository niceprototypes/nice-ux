# Nice Manifest

Rules and lookups for agents working on Nice UI: the `@niceprototypes/*` React packages in `~/nice/nice-ux` (pnpm workspace: `packages/*`, `apps/storybook`, this `manifest/`). Paths below are relative to `~/nice/nice-ux` unless they start with `~`.

Priorities, in order: (1) agent token spend in design, engineering, maintenance and debugging; (2) no backtracking; (3) speed, which is always traded for 1 and 2.

## Load model

- **Core, always loaded:** this file + `discipline/*.md` (≈5k tokens). `discipline/` wins every conflict.
- **Topics, on demand:** load a file only when the task table below points to it.
- **Subagents** (prompt starts `ROLE: Nice subagent`) load only what their brief lists.
- **Never read `agents/catalog.json` whole.** Read `agents/components.txt`, then `jq` the one component.
- A file read this session is not re-read unless it changed since.

## Roles

| Owner decides (direction) | Manager decides (everything below) |
|---|---|
| architecture, infrastructure, design, style, colour, aesthetic direction, scalability, roadmaps, concepts, paradigms, new component categories, each Lucide icon | implementation, tooling that follows an approved direction, Node versions, lockfiles, lint, tests, fixes, sibling components, pushes |

The manager also asks before anything critical: irreversible changes, npm publishing, production deploys, cost spikes. Owner questions go to `~/nice/surveys/` (format in `discipline/manager.md`), never into chat. The owner's directions are intent, not spec: research and validate the design that best serves the priorities; when it differs from the owner's example, adopt it and state why in one line.

## Platform rules

- **React only.** No framework-neutral layers. No `react` in names: `@niceprototypes/button`, folder `packages/button`, Storybook `Components/…`. A future framework takes the prefix (`@niceprototypes/vue-button`).
- **Scope:** every package is `@niceprototypes/{name}`; `@niceprototypes/ux` re-exports all of them.
- **Consumers:** only projects on this Mac (website, animation-studio, browser, proton-photos and other `~/nice` apps). Breaking changes and renames cost nothing elsewhere; no migration paths for hypothetical users. `~/nice/website` is the staging ground: done = works on localhost against nice-ux, then production after owner go-ahead.
- **Every element goes through a Nice component** (images through `Image`, text through `Ink`, layout through `Flex`). No raw `<img>`/covered elements in consumers, so audits are lookups (`read/audit.md`).
- **Storybook Controls are the bedrock.** Every scenario is reproducible in that component's one `Playground` story through args. Galleries only where comparison is the point (type styles, colours, tokens). Every new prop shows in Controls and has a UI test.
- **Extrapolate siblings, ask categories.** A line chart implies a bar chart; a form control implies its siblings. A new category (charts, data grid) is an owner question.
- **Icons:** never mix icon sets within a grouping. Lucide only for a whole new set or panel, and ask the owner before choosing each Lucide icon.
- **Tokens:** every size, colour, duration and z-index is a token. A missing token or getter is a showstopper: report it, never hardcode. Typed values come from the union on disk (`discipline/grounding.md`).
- **Foundation packages** (`packages/styles`, `packages/icon`, `packages/config-*`): propose the change and get approval before editing.

## Package layers (dependencies flow down)

```
Application  apps/storybook; ~/nice/website (package "np"), ~/nice/browser, ~/nice/animation-studio
Feature      button, input, select, dialog, calendar, form, tabs, …   (agents/components.txt)
Utility      flex, ink, tile, icon, image, line, list, scroll, …
Foundation   styles (tokens + React bindings: StylesProvider, Theme, setTokens), icon (+ svg set), config-*
```

Naming: components and the types namespace are `default` exports, everything else named; types are `{Component}{Prop}Type`; `src/services/` is public API, `src/utilities/` internal.

## Task → file

| Task | Read |
|---|---|
| Build an app or page on Nice | `agents/README.md`, `agents/components.txt` |
| One component's props, tokens, story id | `jq` on `agents/catalog.json` |
| New component package | `edit/component.md`, `read/inheritance.md` |
| Story, Playground, UI test | `edit/storybook.md` |
| Tokens, getToken, setTokens, themes | `read/styles/tokens.md`; breakpoints `read/styles/breakpoints.md` |
| Generator or emitter | `edit/generators.md`; code comments `edit/comments.md` |
| Build config (rollup, tsconfig, jest) | `topics/build-config.md` |
| Commit, version, publish | `publish/release.md` |
| Audit (component coverage, consumers, manifest) | `read/audit.md` |
| Storybook / website app paths | `read/projects.md` |
| PNG compression | `build/image-compressor.md` |
| Open work | `backlog.md`; owner decisions `~/nice/surveys/` |

Regenerate `agents/catalog.json` + `agents/components.txt` after any prop, token or story change: `node manifest/agents/scripts/generate-catalog.mjs`.
