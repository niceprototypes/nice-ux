# Component packages

## New package checklist

Order follows `../discipline/refactor-safety.md` (producer before consumer). References: `packages/ink` (one component), `packages/scroll` (several).

1. Check `../agents/components.txt`: no existing component covers it. A new category is an owner question; siblings of an existing one are not.
2. Copy the reference folder to `packages/{name}`; package name `@niceprototypes/{name}`; folder layout below.
3. Dependencies: `../read/inheritance.md`. Config one-liners: `../topics/build-config.md`. Then `pnpm install` at the root.
4. Tokens: `packages/styles/src/tokens/components/{prefix}.json`, rebuild styles; read with `getToken("{prefix}.{group}:{variant}")`. Foundation change: approval first.
5. Types: every prop `{Component}{Prop}Type`; default-export the types namespace.
6. Exports: `package.exports.json`, then `pnpm --filter @niceprototypes/{name} generate-exports`.
7. Wire consumers: `packages/ux` (dependency + `export *` line), `apps/storybook/package.json`.
8. Playground story with every prop in Controls, plus UI tests: `storybook.md`.
9. Changeset (`../publish/release.md`); regenerate the catalog (`node manifest/agents/scripts/generate-catalog.mjs`).

## File Size and Decomposition

When a single file accumulates many functions, refactor it into a folder with the same name. The folder's `index.js` re-exports the public API so the import path stays the same.

```
# Before — one file growing indefinitely
src/publisher.js  (400+ lines, 15 functions)

# After — folder with focused files
src/publisher/
├── index.js        # Orchestrator, re-exports public API
├── constants.js    # Static values
├── helpers.js      # Shared utilities
├── graph.js        # Dependency resolution
└── otp.js          # OTP management
```

This is not a strict rule. Complex functions that are long but cohesive should stay in one file. The trigger is when a file becomes a collection of loosely related functions that are hard to index at a glance. The goal is AI parsability — a future Claude instance should be able to read a file and understand its scope without scrolling past unrelated logic.

### Lists of exports are the strict case — always split

The one place decomposition **is** a hard rule: a file that is an indefinitely-growing **list of independent exports** — a registry/catalog of sibling `export const` objects (table configs, example definitions, token entries, fixtures, route maps, etc.). Each such export gets **its own file named after it**, re-exported by an `index.ts` that also builds any aggregate (the `{ ... } satisfies Record<...>` map, the `Object.values(...)` list).

```
# Before — one file that only ever grows
data/tables/tokens.tsx   (18 export const configs, 500+ lines)

# After — one file per export, aggregated by the index
data/tables/moduleTokenTable/
├── index.ts             # imports each, builds `tokenTables` + `tokenTableList`, re-exports
├── types.ts             # the shared config type
├── animationDuration.tsx
├── color.tsx
└── … one file per config
```

Unlike a cohesive complex function — which has internal cohesion worth preserving — a catalog has **no cohesion to protect**: every entry is independent, and the list only ever grows. Co-locating them guarantees the file eventually becomes unindexable, and every addition produces a churny diff against an ever-larger file instead of a clean new file. Split on the first sign of a growing list, not after it has already sprawled. Group the per-export files by **context** (the consumer they feed) rather than by incidental type, so the folder name states what the catalog is for.

---

## ES Module Standards

- Use named exports exclusively (no default exports)
- Exception: React components use default export per React convention
- Exception: `{Component}.types.ts` uses default export for declaration merging pattern

## Folder Structure

Every component package follows this folder structure:

```
@niceprototypes/{component}
└── src
    ├── components
    │   ├── {Component}
    │   │   ├── {Component}.test.tsx
    │   │   ├── {Component}.tsx
    │   │   ├── {Component}.styles.ts
    │   │   ├── {Component}.types.ts
    │   │   └── index.ts
    │   └── {SubComponent} (optional)
    │       ├── {SubComponent}.test.tsx
    │       ├── {SubComponent}.tsx
    │       ├── {SubComponent}.styles.ts
    │       ├── {SubComponent}.types.ts
    │       └── index.ts
    ├── utilities (optional)
    │   └── {utility1}.ts
    ├── services (optional)
    │   ├── {service1}.ts
    │   └── index.ts
    └── index.ts
```

### Key Structure Rules

1. **Components live in `src/components/{Component}/`** - never at the src root level
2. **Each component folder contains**: the component file, types, styles, tests, and index
3. **Supporting files are prefixed with the component name**: `{Component}.styles.ts`, `{Component}.types.ts`, `{Component}.helpers.ts`, `{Component}.services.ts`, etc. Never bare `styles.ts` / `types.ts`. **Why:** an editor open on `Button.styles.ts` and `Tile.styles.ts` is unambiguous; two tabs both labelled `styles.ts` aren't. Grep, find, and AI search land directly on the right file. **How to apply:** any non-`index.ts`, non-`{Component}.tsx` file inside a component folder gets the component-name prefix. PascalCase sibling files (sub-components like `Sticky/StickyProvider.tsx`) keep their own name — they are themselves components, not supporting files.
4. **Utilities vs Services**: utilities are internal functions, services are exported for consumers
5. **Component tokens**: token values live as JSON in @niceprototypes/styles (`src/tokens/components/{prefix}.json`); component styles read them with `getToken("{component}.{name}:{variant}")` from @niceprototypes/styles. Packages have no `tokens/` folder and no per-package token getter.

### Multi-Component Package Structure

Reference implementation: **@niceprototypes/scroll**

Some packages export multiple related components rather than a single primary component. These packages have no default export — every component is a named export.

```
@niceprototypes/scroll/
└── src/
    ├── components/
    │   ├── ScrollProvider/
    │   ├── Sticky/
    │   ├── FadeOnScroll/
    │   ├── SectionLinks/
    │   └── StickySection/
    ├── hooks/
    │   └── useScroll.ts
    └── index.ts
```

**Export pattern:** Each component folder is re-exported by name. No `export { default }` — consumers import each component individually.

```ts
export { default as ScrollProvider, ScrollContext } from "./components/ScrollProvider"
export type { ScrollProviderProps } from "./components/ScrollProvider/ScrollProvider.types"
export { default as ScrollProviderTypes } from "./components/ScrollProvider/ScrollProvider.types"

export { useScroll } from "./hooks/useScroll"

export { Sticky, StickyProvider, StickyContext } from "./components/Sticky"
export type { StickyProps, StickyOrderType } from "./components/Sticky"

export { FadeOnScroll } from "./components/FadeOnScroll"
export type { FadeOnScrollProps } from "./components/FadeOnScroll"
```

**Key differences from single-component packages:**
- No default export at the package level
- No `package.exports.json` (phase 2 of the export generator)
- Components may export sub-components, contexts, and hooks from the same folder
- Types follow the same `{Component}{PropName}Type` naming convention

### Hook-Only Package Structure

Packages that provide only hooks and context providers — no styled-components, no tokens, no component folder structure. No package currently ships this shape (the former standalone device-detection hook package was retired and its logic internalized into `@niceprototypes/styles`' `StylesProvider`); this documents the pattern for any future hook-only package.

```
@niceprototypes/{name}/
└── src/
    ├── hooks/
    │   └── use{Hook}.ts
    ├── components/
    │   └── {Provider}/
    └── index.ts
```

**Export pattern:**

```ts
export { use{Hook}, default } from "./hooks/use{Hook}"
export { {Provider}, use{Context} } from "./components/{Provider}"
```

**Key differences from component packages:**
- No styled-components dependency
- No tokens folder
- No `package.exports.json` (phase 2 of the export generator)
- Default export is a hook, not a component
- Provider components live under `src/components/` even in hook-only packages

## src

### src/scripts
- Config files for webpack, jest, etc.

### src/utilities

- Functions only used within the package and not exported for consumption
- Each function has a separate file
- No index.ts file, utilities are imported directly

### src/services

- Functions exported for external consumption
- Each function has a separate file
- index.ts re-exports all services as named exports:

```ts
export { getIcon } from "./getIcon"
export { formatDate } from "./formatDate"
```

### src/tokens

Component tokens are defined as JSON in @niceprototypes/styles (`src/tokens/components/{prefix}.json`) and compiled into `dist/tokens.css` at build time. Each React component package provides a thin accessor wrapper and a backward-compatible Styles export.

#### Token Values (in @niceprototypes/styles)

Token values live in `@niceprototypes/styles/src/tokens/components/{prefix}.json`. Values are raw CSS strings; cross-references use `var()`:

```json
{
  "size": {
    "smaller": "var(--np--size--smaller)",
    "small": "var(--np--size--small)",
    "base": "var(--np--size)",
    "large": "var(--np--size--large)",
    "larger": "var(--np--size--larger)"
  },
  "borderRadius": {
    "small": "var(--np--border-radius--small)",
    "base": "var(--np--border-radius)",
    "large": "var(--np--border-radius--large)"
  }
}
```

These become CSS custom properties in `dist/tokens.css`:
```css
--np--button--size: var(--np--size);
--np--button--border-radius--small: var(--np--border-radius--small);
```

A component file may also carry the reserved `$themes` and `$breakpoints`
override axes (both partial mirrors of the base tree) — see
[`read/styles/tokens.md`](../read/styles/tokens.md) → "Component-level files".
`night` is the OS dark default; other `$themes` names emit `[data-theme]` pins,
and `$breakpoints` emits per-viewport `min-width` overrides.

#### Reading component tokens in styles

Component styles read their tokens with the single getter and the component `prefix`. A nested group is a path array; the variant stays the second argument.

```ts
// Button.styles.ts
import { getToken } from "@niceprototypes/styles"

export const StyledButton = styled.button<{ $size: SizeType }>`
  height: ${({ $size }) => getToken(`button.size:${$size}`)};
  --np--icon--size: ${({ $size }) => getToken(`button.icon.size:${$size}`)};
`
```

There is no per-package token getter and no `src/tokens/` folder. See [`read/styles/tokens.md`](../read/styles/tokens.md) → "getToken" and "Component tokens".

#### Component Styles in Applications

Component CSS custom properties are included automatically via `@niceprototypes/styles/tokens.css` (loaded by `StylesProvider`). Consumers do not register or render anything per-component to enable token CSS.

### src/constants.ts

- All static values used throughout the package
- Named exports only:

```ts
export const ICON_NAMES = [...] as const
export const DEFAULT_SIZE = "base"
```

### {Component}.styles.ts

- Co-located with the component file (e.g., `Button.styles.ts` alongside `Button.tsx` in the component folder)
- All styled-components declarations
- Named exports only
- Styled components are internal only - never export them from the package

### {Component}.types.ts

- Co-located with the component file (e.g., `Button.types.ts` alongside `Button.tsx` in the component folder)
- All prop types abstracted as `{Component}{PropName}Type` - never hardcode types like `boolean` or `string` directly in props
- Uses declaration merging with default export for type namespace
- Allowed prop values are not restated in READMEs: the generated `manifest/agents/catalog.json` (`agents/scripts/generate-catalog.mjs`) resolves each `{Component}Props` member's union; READMEs name the type alias and point to the catalog. Aliases imported from @niceprototypes/styles stay unresolved in the catalog (`@niceprototypes/styles/src/generated/types.ts`)

#### Type Naming Convention

All types must be prefixed with the component name:

```ts
// Good
export type ButtonSizeType = "small" | "base" | "large"
export type ButtonOnClickType = () => void

// Bad - missing component prefix
export type SizeType = "small" | "base" | "large"
export type OnClickType = () => void
```

#### Re-exporting Types from @niceprototypes/styles

When a prop uses a type from @niceprototypes/styles, create a component-specific alias:

```ts
import type { ColorType, FontSizeType, ThemeType } from "@niceprototypes/styles"

/**
 * InkColorType
 *
 * Re-export of ColorType from @niceprototypes/styles.
 * Text color values using design tokens.
 */
export type InkColorType = ColorType

/**
 * InkSizeType
 *
 * Re-export of FontSizeType from @niceprototypes/styles.
 * Font size values using design tokens.
 */
export type InkSizeType = FontSizeType

/**
 * InkThemeType
 *
 * Re-export of ThemeType from @niceprototypes/styles.
 * Pin token resolution to a specific theme.
 * Extensible for consumer-defined custom themes.
 */
export type InkThemeType = ThemeType
```

#### JSDoc Documentation

Every type must have a JSDoc comment with:
1. Type name as title
2. Brief description
3. List of values (for union types)

```ts
/**
 * InkWordBreakType
 *
 * Controls line break behavior for overflowing text.
 * Based on CSS word-break property.
 *
 * Values:
 * - "normal": Default word breaking rules
 * - "break-all": Allow breaks between any two characters
 * - "keep-all": Prevent breaks in CJK text, normal for others
 */
export type InkWordBreakType = "normal" | "break-all" | "keep-all"
```

#### Complete Types File Structure

```ts
import * as React from "react"
import type { ColorType, FontSizeType } from "@niceprototypes/styles"

/**
 * ButtonSizeType
 *
 * Size variant for the component.
 *
 * Values:
 * - "small": Compact size for dense layouts
 * - "base": Default size
 * - "large": Prominent size for primary actions
 */
export type ButtonSizeType = "small" | "base" | "large"

/**
 * ButtonColorType
 *
 * Re-export of ColorType from @niceprototypes/styles.
 * Button text color using design tokens.
 */
export type ButtonColorType = ColorType

/**
 * ButtonOnClickType
 *
 * Click handler callback function.
 */
export type ButtonOnClickType = () => void

/**
 * ButtonDisabledType
 *
 * Whether the button is disabled.
 */
export type ButtonDisabledType = boolean

/**
 * ButtonProps
 *
 * Complete prop definition for the Button component.
 */
export interface ButtonProps {
  /** Content to display inside the button */
  children: React.ReactNode
  /** Size variant */
  size?: ButtonSizeType
  /** Text color from @niceprototypes/styles tokens */
  color?: ButtonColorType
  /** Click handler */
  onClick: ButtonOnClickType
  /** Disabled state */
  disabled?: ButtonDisabledType
}

// Legacy exports for backwards compatibility
export type SizeType = ButtonSizeType
export type OnClickType = ButtonOnClickType

// Declaration merging: const + namespace creates exportable type namespace
const ButtonTypes = {} as const

namespace ButtonTypes {
  export type Size = ButtonSizeType
  export type Color = ButtonColorType
  export type OnClick = ButtonOnClickType
  export type Disabled = ButtonDisabledType
  export type Props = ButtonProps
}

export default ButtonTypes
```

#### Key Requirements

1. **Component prefix on all types** - `{Component}{PropName}Type` format
2. **JSDoc on every type** - title, description, values list
3. **Re-export @niceprototypes/styles types** - create component-specific aliases
4. **Legacy exports** - for backwards compatibility when renaming types
5. **Complete namespace** - include all types in the namespace, not just Props
6. **Empty const required** - namespaces with only types produce no JavaScript output

#### Importing Types

Components import types from their co-located types file:

```ts
// In Button.tsx
import type { ButtonProps } from "./types"
```

### {Component}.tsx

- React Component implementation
- No logic in this file, only imports and default export
- Exception: React components use default export per convention

#### `className` prop — only when a consumer needs it

Do not add `className` by default. Add an optional `className?: string` (forwarded to the rendered root element) only when a consumer needs to scope its own CSS into that component — e.g. `<Theme name="day" className="@niceprototypes/storybook">`, which storybook's `preview-docs.css` targets. **Why:** the user does not use `className`; a prop with no consumer is redundancy. Components that already have it (Ink, Tile, Button, Icon, Image, Input, Flex, Lightbox, LightboxCaption, Slider, FadeOnScroll, Sticky, SectionLinks, StickySection, Theme, …) keep it; removing it is a separate, explicit decision.

```tsx
// When needed — in {Component}.types.ts
/** CSS class name applied to the root element */
className?: string

// In {Component}.tsx — forward to the rendered root (whichever root a branching component returns)
const Component: React.FC<ComponentProps> = ({ className, …rest }) => <StyledRoot className={className} …rest />
```

#### Theme prop — wrap-in-Theme standard (required for visual components)

Every visual component that accepts a `theme?: ThemeType` prop **must** delegate the pin mechanism to `Theme` from `@niceprototypes/styles` — do not pass `theme` into `getToken(...)` inside the styled-component. The cascade does the work.

Canonical pattern:

```tsx
import { Theme } from "@niceprototypes/styles"

const Component: React.FC<Props> = ({ theme, ...rest }) => {
  const element = <StyledComponent {...rest} />
  return theme ? <Theme name={theme}>{element}</Theme> : element
}
```

For components with multiple early returns (Icon's three-tier resolution, Image's `as="img" | "div" | renderImage`), use a `withTheme` local helper:

```tsx
const withTheme = (el: React.ReactElement) =>
  theme ? <Theme name={theme}>{el}</Theme> : el

if (renderImage) return withTheme(<>{renderImage(src, alt)}</>)
if (as === "div") return withTheme(<StyledDiv … />)
return withTheme(<StyledImg … />)
```

Why this is required:
- One mechanism — `[data-theme]` cascade — handles every level of pinning (whole-page, region, single component).
- Descendants of a theme-pinned component automatically inherit the pin. `<Tile theme="night">{nested Ink, Icon}</Tile>` works without threading `theme` into the children.
- Styled-components stay simpler — no `$theme` transient prop, no `theme` option on `getToken`. Semantic tokens resolve via cascade.
- The escape hatch (component renders a direct-primitive reference that bypasses the cascade) is reserved for explicit inverted-theme needs like Button's text contrast.

Styled-components: do not declare `$theme?: ThemeType` in transient props, and do not pass the `theme` option to `getToken`. Use `getToken(name, variant)` only. The `getStatusToken` utility on Button and Input dropped its `theme` parameter for the same reason.

### {Component}.test.tsx

- Co-located test file for the component
- Tests component behavior, not implementation details

### index.ts

- Default export React component
- Named exports for everything else:
  - Constants
  - Services
  - Types (all individual types via `export *` + namespace re-exported as named)
  - Component token map
  - Component token getter

**UI components are wrapped with `withBreakpoints` at the component-folder
`index.ts` layer**, so every consumer of the package gets the `breakpoints`
prop for free without per-prop plumbing. Pass the explicit prop generic to
preserve TypeScript inference for downstream `breakpoints` entries.

**Component folder `index.ts` (e.g. `src/components/Ink/index.ts`):**

```ts
import { withBreakpoints } from "@niceprototypes/styles"
import BaseInk from "./Ink"
import type { InkProps } from "./types"

// Wrap with withBreakpoints so every prop accepts a per-viewport override
// via the `breakpoints` array. The explicit generic pins P=InkProps
// so consumer-side `(base) =>`-style callbacks (and the inferred Partial<P>
// shape on `props`) stay strongly typed under TS 4.9+.
const Ink = withBreakpoints<InkProps>(BaseInk)

export default Ink
export * from "./types"
export { default as InkTypes } from "./types"
```

**When to skip the wrap:**

- Hook-only packages (no rendered output).
- Pure context providers with no DOM (`StylesProvider`, `ScrollProvider`).
- Multi-component packages where each component would need its own wrap;
  decide per component, not at the package level (`@niceprototypes/scroll`).
- Components whose every meaningful prop is already a CSS shape that Flex's
  responsive-object covers — wrapping adds a JS subscription where the
  styled-components media-query layer would suffice. The Flex export itself
  is wrapped because consumers also benefit from breakpoint overrides on
  non-CSS props (e.g. ARIA attributes), but Flex is the closest case to
  "skipping" that's still worth wrapping.

If skipping, document the reason in the package README.

**Package entry `src/index.ts`:**

```ts
// Main component export
export { default } from "./components/Ink"

// All named type exports + InkTypes namespace (re-exported from the component index)
export * from "./components/Ink"
```

**Why `export *` over a selective list:** `types.ts` is the single source of truth for a component's public type surface. Using `export *` makes it impossible for `index.ts` to drift out of sync with `types.ts` when new prop types are added. Both individual imports (`import { InkProps } from "@niceprototypes/ink"`) and namespace access (`import { InkTypes } from "@niceprototypes/ink"; InkTypes.Props`) continue to work.

**Note on `export { default }` vs `export *`:** `export *` re-exports only named exports, never the default. The package's default (the component itself) must be explicitly re-exported with `export { default } from "./components/Ink"`. The namespace is exported as `export { default as InkTypes }` at the types.ts level, which becomes a *named* export named `InkTypes` that `export *` then carries through.

### package.exports.json (required)

Every component package must have a `package.exports.json` at the package root. This config declares the public export surface and is consumed by the `nice-generate-exports` CLI to produce `src/index.ts`.

**Do not hand-edit `src/index.ts` in component packages.** Run `npm run generate-exports` after modifying `package.exports.json`.

```json
{
  "$schema": "../config-exports/src/schema.json",
  "description": "Semantic ink component with full token support.",
  "default": "Ink",
  "components": ["Ink"]
}
```

| Field | Type | Required | Purpose |
|-------|------|----------|---------|
| `description` | string | optional | Short JSDoc block (max 5 lines, hard-enforced). Long-form content goes in README.md. |
| `default` | string | optional | Component name to re-export as the package default. Must be listed in `components`. |
| `components` | string[] | required | Component names. Generator emits `export * from "./components/{Name}"` for each. |
| `services` | string[] | optional | Function names exported from `./services`. |
| `constants` | string[] | optional | Constant names exported from `./constants`. |

New packages must include this file alongside a `"generate-exports"` script in `package.json`. Use the standard-bearer (`@niceprototypes/ink`) as the reference layout.

### Packages exempt from export generation

| Package | Reason |
|---------|--------|
| @niceprototypes/styles | Bridge package — re-exports the entire @niceprototypes/styles API. Hand-written. |
| @niceprototypes/scroll | Multi-component package — phase 2. |

## Build config and dependencies

tsconfig, rollup and jest files: the canonical one-liners in `../topics/build-config.md`. Dependency declaration (peers `workspace:^`, devDependencies `workspace:*`, no `@niceprototypes/*` in `dependencies`): `../read/inheritance.md`. After changing any package.json: `pnpm install` at the root.

### Package.json Requirements

Every `@niceprototypes/*` package.json must follow this structure exactly. Deviations require documented justification in the manifest.

#### Entry Points

```json
{
  "main": "dist/index.js",
  "module": "dist/index.esm.js",
  "types": "dist/index.d.ts",
  "type": "module"
}
```

#### Scripts

Canonical scripts per package class. Each script must be both (a) appropriate for the class and (b) **runnable** — a script that references a tool whose config file is missing is broken and should be removed, not left as a placeholder.

**`@niceprototypes/*` component packages — required:**

```json
{
  "scripts": {
    "build": "rollup -c",
    "dev": "rollup -c -w",
    "typecheck": "tsc --noEmit",
    "prepublishOnly": "npm run build"
  }
}
```

**`@niceprototypes/*` component packages — conditional (add only when the prerequisite is present):**

| Script | Add when |
|---|---|
| `"test": "jest"` | The package has `jest.config.js` AND at least one `*.test.ts(x)` file. |
| `"lint": "eslint src --ext .ts,.tsx"` | The package has an `.eslintrc.{js,cjs,json}` (or equivalent flat config). |
| `"generate-exports": "nice-generate-exports ."` | The package has `package.exports.json` at its root. (Always paired — if `package.exports.json` exists, the script must be present so `src/index.ts` regenerates from one canonical command.) |

**Forbidden everywhere:**

- `"prepare"`: it rebuilds on every install. `prepublishOnly` covers publishing; `pnpm build` covers workspace rebuilds.
- Convenience aliases like `build:watch`, `test:watch`, `test:coverage`, `lint:fix`, `clean`, `build:types`. These add maintenance surface for marginal value.

**Non-component package classes** (these don't follow the component template; the canonical sets below are the documented variant per class):

| Package | Build tool | Scripts |
|---|---|---|
| `@niceprototypes/styles` (foundation) | bespoke generator pipeline | `clean` + `build:tokens` + `build:types` + `build:css` + `build:ts` + `build:post` chained from `build`; `dev` runs them in `--watch` mode; `prepublishOnly` (build + test) for the publish chain; `test` (`tsx --test test/*.test.ts`) and `test:update` (rewrites snapshots — the one allowed test alias, required by the snapshot workflow in `edit/generators.md`). |
| `@niceprototypes/icon` (foundation) | gen script | `build`, `dev` (with `--watch`), `prepublishOnly`. No `prepare`. |
| `@niceprototypes/config-*` (foundation/config) | per package (`tsc` for config-exports) | `build` where there is one, `prepublishOnly`. No `prepare`. |

#### Files

```json
{
  "files": ["dist"]
}
```

Only `dist` is published. Do not include `src`, `README.md`, `CHANGELOG.md`, or `LICENSE` in the `files` array — npm includes README and LICENSE automatically.

#### Publishing

Add a changeset with the change: `../publish/release.md`.

## JSDoc Standards

For JavaScript files in the config packages, use JSDoc for type documentation:

```js
/**
 * Brief description of the function
 *
 * @param {Object} options - Parameter description
 * @param {string} [options.name='default'] - Optional param with default
 * @param {string[]} options.items - Required array param
 * @returns {boolean} Return value description
 */
export function myFunction(options = {}) {
  // implementation
}
```

### Common Type Annotations

| Annotation | Usage |
|------------|-------|
| `{string}` | String value |
| `{string[]}` | Array of strings |
| `{Object}` | Object parameter |
| `{Array}` | Generic array (use when element types vary) |
| `{boolean}` | Boolean value |
| `{function(string): boolean}` | Function type with signature |
| `[param]` | Optional parameter (in square brackets) |
| `[param='value']` | Optional with default value |