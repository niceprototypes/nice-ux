# Layers and dependencies

Per-package facts (version, peers, exports, components) live only in `agents/catalog.json` (`jq '.packages[]|{package,nicePeers}'`). Build order is the pnpm graph: `pnpm -r` runs packages in dependency order.

## Layers

```
Application  apps/storybook; ~/nice/website, ~/nice/browser, ~/nice/animation-studio
Feature      button, input, select, calendar, dialog, form, tabs, tooltip, lightbox, checkbox, toggle
Utility      flex, ink, tile, icon, image, line, list, logo, popover, scroll, slider, field, code, head
Foundation   styles (tokens, CSS, React bindings), icon svg set (packages/icon/src/svg), config-*
Plugins      icon-vendor (Lucide resolver for icon), image-vendor (resolver for image)
```

A package depends only on layers below it, never above or beside without a declared peer.

## Dependency declaration

- `dependencies`: no `@niceprototypes/*` packages.
- `peerDependencies`: every `@niceprototypes/*` package imported at runtime, `workspace:^` (published as `^x.y.z`); react, react-dom, styled-components as bounded ranges. One copy per app is required for the singletons (styles token registry and context, icon resolver registry).
- `devDependencies`: the same packages as `workspace:*`, plus `@niceprototypes/config-*`. Shared tool versions come from the pnpm `catalog:` in `pnpm-workspace.yaml`.
- Vendor plugins: the base lists the vendor as an optional peer; the vendor lists the base as a required peer.

## Forms slice

Input is the field chrome every text-like control overloads. Derived packages (select, calendar) extend `InputAs{Input|Select|Textarea}Props` and render through `<Input as=…>`, never restyling the chrome. Field supplies label, description and error wiring (`useField`, `mergeDescribedBy`). Dates are ISO `YYYY-MM-DD` strings, never `Date`.

## Token chain

```
packages/styles/src/tokens/modules/{group}.json       core tokens (+ $breakpoints, $themes)
packages/styles/src/tokens/components/{prefix}.json   component tokens (+ $themes, $breakpoints, $inverse)
        │ pnpm --filter @niceprototypes/styles build
        ▼
src/generated/*.ts (data + type unions, ComponentPrefix)   dist/tokens.css (:root, @media, [data-theme])
        ▼
getToken("group", "variant") / getToken("prefix.path:variant") → "var(--np--…)"   (registry + setTokens overrides)
        ▼
{Component}.styles.ts (styled-components) → application
```

Type pattern (`{Component}{Prop}Type`, default-exported types namespace): `edit/component.md`.
