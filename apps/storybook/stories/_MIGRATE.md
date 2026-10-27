# React folder — novel content to migrate

This folder (`stories/React/*.mdx`) predates the docs refactor. The 6 top-level
pages (`React`, `getToken`, `setTokens`, `Theme`, `FontLoader`, `withBreakpoints`)
were deleted; everything already covered by `Basics/*` was dropped as
redundant. What remains below is the **non-redundant** content, grouped by topic,
each with a suggested destination. This `.md` is not picked up by Storybook
(glob is `*.mdx`), so it won't render — it's a migration scratchpad.

`React.mdx` was a pure navigation index — nothing novel, nothing to migrate.

---

## getToken — sibling accessors, options object, inverse

> Suggested home: `Basics/1 · Tokens` (or a dedicated Tokens API page).
> Redundant part already covered there: basic `getToken(name, variant)`.

Three sibling functions return the three accessor forms:

- `getToken(name, variant?, options?)` — the `var(...)` reference (the common case).
- `getTokenKey(name, options?)` — the bare CSS variable name (no `var(...)` wrapper).
- `getTokenValue(name, options?)` — the raw underlying value (`"16px"`, an hsla
  color, a font-family string).

`options`: `{ variant?: string; theme?: string; inverse?: boolean }` (all optional;
`variant` defaults `"base"`). `inverse: true` appends a trailing `--inverse`
segment (the opposite-theme value); valid for `color` / `backgroundColor` only.

```js
getTokenKey("fontSize")                            // → "--np--font-size"
getToken("fontSize", "large")                      // → "var(--np--font-size--large)"
getTokenValue("fontSize", { variant: "large" })    // → "24px"
getToken("color", "base", { theme: "night" })      // → "var(--np--color--night)"
getToken("backgroundColor", undefined, { inverse: true }) // → "var(--np--background-color--inverse)"
```

Reach for `getTokenValue` when CSS needs the literal value, not the `var(...)`
reference — `parseInt` on a duration, a font-family string passed to a chart
library, etc. Reach for `getTokenKey` when emitting raw `@property` or
`--custom: var(...)` declarations.

---

## setTokens — generated CSS output + day/night primitives

> Suggested home: split across `Basics/1 · Tokens` (override/extend/create),
> `4 · Breakpoints` (responsive), `5 · Themes` (mode-aware).
> Redundant part already covered: the basic override/create call shape.
> Novel and worth keeping: the **generated CSS** each pattern emits, and the
> **stable primitives** concept.

The token map merges into the existing registry — overriding where keys match,
extending where variants are new, creating where tokens are new. No distinction
between "modifying" and "creating". A variant value can be a plain string, a
breakpoint object, or a mode object, mixed freely within one group/call.

### Override / extend / create → emitted vars

```ts
setTokens({ fontSize: { base: "18px" } })        // override → --np--font-size: 18px
setTokens({ color: { brand: "#dc0000" } })       // extend   → --np--color--brand: #dc0000 (others unchanged)
setTokens({ headerHeight: { base: "64px", compact: "48px" } }) // create →
//   --np--header-height: 64px ; --np--header-height--compact: 48px
```

### Responsive variant → @media reassignment

`phone` is the default; larger breakpoints override via media queries.

```ts
setTokens({
  gap: {
    none: "0",                                 // static
    small: { phone: "12px", laptop: "16px" },  // responsive
  },
})
```

```css
:root {
  --np--gap--none: 0;
  --np--gap--small: 12px;
  --np--gap--small--laptop: 16px;
}
@media (min-width: 1280px) {
  :root { --np--gap--small: var(--np--gap--small--laptop); }
}
```

### Mode-aware (day/night) → prefers-color-scheme + primitives

`day` is the default; `night` is applied via `@media (prefers-color-scheme: dark)`.

```ts
setTokens({ headerColor: { base: { day: "#000", night: "#fff" } } })
```

```css
:root {
  --np--header-color: #000;
  --np--header-color--day: #000;     /* stable primitive — never reassigned */
  --np--header-color--night: #fff;   /* stable primitive — never reassigned */
}
@media (prefers-color-scheme: dark) {
  :root { --np--header-color: var(--np--header-color--night); }
}
```

Day/night **primitives** (`--np--…--day` / `--np--…--night`) are stable
references that media queries never reassign. Access them directly with the
`theme` option:

```ts
getToken("headerColor", "base", { theme: "night" }) // → var(--np--header-color--night)
```

---

## Theme — Storybook pinning recipe + how it works

> Suggested home: `Basics/5 · Themes` (as an advanced/internals section).
> Redundant part already covered there: HTML/CSS/React `theme` prop, `Theme`
> component, nesting.
> Novel and worth keeping: the implementation detail, the Storybook recipe, the
> `<html>` fallback, and the cascade explanation.

`Theme` renders a layout-invisible `<div data-theme={name} style={{ display: "contents" }}>`
that intercepts the cascading `[data-theme]` rules in `@niceprototypes/styles/tokens.css`.
All descendants — nice components, raw markup, third-party widgets reading
`var(--np--…)` — pick up the pin.

### Pinning Storybook (both render paths)

Storybook's preview iframe has two paths — **canvas** (a single story) and
**docs** (MDX prose + embedded `<Story>` blocks). A decorator only reaches the
Story subtree; MDX prose around it does not. Pin at both layers:

```tsx
// .storybook/preview.tsx
import { DocsContainer } from "@storybook/addon-docs/blocks"
import { StylesProvider, Theme } from "@niceprototypes/styles"

const preview: Preview = {
  decorators: [
    Story => (
      <StylesProvider>
        <Theme name="day"><Story /></Theme>
      </StylesProvider>
    ),
  ],
  parameters: {
    docs: {
      container: ({ children, context }) => (
        <DocsContainer context={context}>
          <Theme name="day">{children}</Theme>
        </DocsContainer>
      ),
    },
  },
}
```

- `decorators` → canvas view and `<Story>` blocks inside docs.
- `docs.container` → MDX prose, headings, paragraphs outside a Story block.

Storybook's own UI chrome (sidebar/toolbar) renders in a separate **manager**
iframe themed via `create({ base })` — independent of nice tokens. Pinning
affects only the preview iframe.

### Fallback for non-React hosts

```ts
document.documentElement.setAttribute("data-theme", "day")
```

### How it works

`tokens.css` emits two pin blocks at the end of the stylesheet:

```css
[data-theme="day"]   { color-scheme: light; --np--color: var(--np--color--day); /* … */ }
[data-theme="night"] { color-scheme: dark;  --np--color: var(--np--color--night); /* … */ }
```

The attribute selector outranks `@media (prefers-color-scheme: dark)`, so a pin
wins over OS preference. Stable theme primitives (`--np--…--day` / `--np--…--night`)
are never reassigned. The component-level `theme` prop (Ink, Tile, Button,
Icon, Image, Input) is implemented in terms of `Theme` — `<Tile theme="night">`
≡ wrapping Tile in `<Theme name="night">`.

---

## FontLoader — the component (vs injectFonts)

> Suggested home: `Basics/2 · Fonts` (an aside; most apps use
> `StylesProvider` props or `injectFonts`, already documented there).
> Novel: the `FontLoader` component itself.

`FontLoader` renders `<link>` elements into the document head (preconnect +
stylesheet) for async web font loading. It is used internally by
`StylesProvider` when `googleFonts` / `adobeFonts` is set — most apps will not
import it directly. Direct use:

```tsx
import { FontLoader } from "@niceprototypes/styles"

const links = [
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
  { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Inter:wght@400;700&display=swap" },
]

<FontLoader links={links} />
```

| Prop    | Type               | Description |
|---------|--------------------|-------------|
| `links` | `LinkAttributes[]` | `{ rel, href, crossOrigin?, media? }` entries — each rendered as a `<link>`. |

---

## withBreakpoints — HOC merge semantics + internals

> Suggested home: `Basics/4 · Breakpoints`.
> Redundant part already covered there: the key-shape table
> (`tablet`/`tablet+`/`tablet-` → which viewports match).
> Novel and worth keeping: the HOC, merge semantics, deep-merge rules, the
> per-prop-shape deprecation note, and the internals.

`withBreakpoints` wraps a component with a generic `breakpoints` prop keyed by
breakpoint name (with optional `+`/`-` modifiers). At render, every key whose
range covers the current viewport merges its overrides over the base props.
Most consumers never call it — every visual `nice-react-*` component ships
pre-wrapped, so `breakpoints` is already there.

```tsx
const ResponsiveComponent = withBreakpoints<MyProps>(MyComponent)

<Tile
  titleProps={{ size: "large", align: "center" }}
  breakpoints={{
    tablet: { spacing: "large base" },
    "laptop+": { spacing: "larger base", maxWidthLarge: 1200 },
  }}
/>
```

### Merge semantics

Multiple keys can match one viewport (`"tablet"`, `"tablet+"`, `"tablet-"` all
match at tablet width). **Range keys (`+`/`-`) apply first in object insertion
order; the bare exact key applies last and wins on conflict** — mirrors CSS
specificity. Plain-object props merge **one level deep** so partial overrides
keep sibling keys.

| Prop kind           | Examples                                  | Behavior                            |
| ------------------- | ----------------------------------------- | ----------------------------------- |
| Plain config object | `titleProps`, `descriptionProps`, `style` | One-level merge — siblings preserved |
| Primitive           | `string`, `number`, `boolean`             | Replace                             |
| React element       | `children`, `contentLeft`, `contentRight` | Replace as a unit                   |
| Array               | `string[]`, `number[]`                    | Replace as a unit                   |
| Function            | event handlers, refs                      | Replace                             |

```tsx
<Tile
  titleProps={{ size: "larger", align: "center" }}
  breakpoints={{ "tablet+": { titleProps: { size: "larger" } } }}
/>
// effective titleProps at tablet+: { size: "larger", align: "center" }  (align preserved)
```

### Use `breakpoints`, not per-prop responsive shape

Every prop on a wrapped component is scalar — `gap`, `direction`, `alignItems`,
etc. take a single value, not a `{ phone, tablet, laptop }` object. Per-prop
responsive shape is no longer supported; all responsive overrides go through the
single `breakpoints` prop. One canonical place to read and override; props that
change at the same breakpoint compose into one object entry.

```tsx
<Flex
  direction="column"
  gap="smaller"
  breakpoints={{ "tablet+": { direction: "row", gap: "small" } }}
/>
```

### Internals

1. `useBreakpoint()` reads `window.innerWidth` via `useSyncExternalStore` →
   `"phone"` / `"tablet"` / `"laptop"` / `"desktop"`.
2. The wrapped component re-renders on viewport-cross.
3. The HOC walks `breakpoints`, picks matching keys, folds overrides into base
   props with a one-level deep merge — range keys first, exact keys last.
4. Merged props pass to the underlying component.

SSR snapshot is `"phone"` (phone-first); on hydration the client snapshot takes
over and re-renders if the viewport is wider.
