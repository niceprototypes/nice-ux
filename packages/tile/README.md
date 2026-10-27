# nice-react-tile

A responsive content Tile for React + styled-components. Renders an optional title and description over a token-aware background, centers and width-caps its inner content column, supports split (sidebar) layouts, and exposes every prop per-breakpoint via the `breakpoints` prop.

## Installation

```bash
npm install nice-react-tile
```

### Peer dependencies

```bash
npm install react react-dom styled-components nice-react-flex
```

## Usage

### Basic

```tsx
import Tile from "nice-react-tile"

const App = () => (
  <Tile
    title="Welcome"
    description="A centered tile constrained to a max-width content column."
  >
    <p>Your content here</p>
  </Tile>
)
```

`title` and `description` render through `nice-react-ink`. Forward Ink props with `titleProps` / `descriptionProps`:

```tsx
<Tile
  title="Dashboard"
  titleProps={{ as: "h2", size: "larger", align: "center" }}
  description={["First paragraph.", "Second paragraph."]}
  descriptionProps={{ color: "light" }}
/>
```

`description` accepts a string array — each entry becomes its own paragraph.

### Background image

```tsx
<Tile
  backgroundImage={'url("/rasters/home-hero.png")'}
  backgroundPosition="center"
  minHeight="80vh"
>
  <h1>Hero heading</h1>
</Tile>
```

`backgroundImage` is emitted directly as the CSS `background-image` value — pass a full `url(...)` or gradient string. `backgroundSize` defaults to `cover`, `backgroundPosition` to `center`, and `backgroundAttachment` to `fixed` (applied only in landscape orientation, for mobile performance).

### Token-bound color

`backgroundColor`, `backgroundSize`, and `color` accept **nice-styles token variant names only** — not raw CSS. For a raw color or gradient, use `backgroundImage`.

```tsx
<Tile backgroundColor="raised" color="light" title="Token-driven surface" />
```

### Split layout

Providing `contentLeft` and/or `contentRight` produces a row layout (image-beside-content), stacking on phone and going to a row at `laptop+`:

```tsx
<Tile
  contentLeft={<img src="/product.png" alt="Product" />}
  title="Product name"
  description="Specs beside the image at laptop and up."
/>
```

### Theme pinning

`theme` pins the subtree to a nice-styles theme by wrapping output in `<Theme>`. Descendants inherit it via the `[data-theme]` cascade.

```tsx
<Tile theme="night" backgroundImage={'url("/hero.png")'} title="Dark hero" />
```

### Responsive — `breakpoints`

The component is wrapped with `withBreakpoints`, so **any** prop can be overridden per breakpoint. Keys are `"{breakpoint}+"` (the breakpoint and up):

```tsx
<Tile
  maxWidth="none"
  minHeight="80vh"
  breakpoints={{
    "tablet+": { minHeight: "800px" },
    "laptop+": { maxWidth: "980px" },
  }}
/>
```

### Padding

`padding` is `FlexSpacingType` from `nice-react-flex` (`SpacingShorthandType` from nice-styles): a CSS-shorthand string of `gap` token names, 1–4 values in CSS padding order. Strings only; vary it per breakpoint with the `breakpoints` prop.

```tsx
<Tile padding="larger base" />          // vertical "larger", horizontal "base"
<Tile padding="base" breakpoints={{ "laptop+": { padding: "larger" } }} />
```

Gap token names: `none`, `smaller`, `small`, `base`, `large`, `larger`.

## Props

Types are the aliases exported from `Tile.types.ts`. Allowed values of each union (resolved): `~/nice/manifest/agents/catalog.json` → `nice-react-tile`; aliases imported from nice-styles (`GapType`, `BackgroundColorType`, `BackgroundSizeType`, `ColorType`, `ThemeType`) stay unresolved there — read `nice-styles/src/generated/types.ts`.

### Content

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `React.ReactNode` | - | Main content, below the title/description block |
| `title` | `React.ReactNode` | - | Title, rendered via Ink |
| `titleProps` | `TileInkProps` (`Partial<Omit<InkProps, "children">>`) | - | Ink props for the title |
| `description` | `React.ReactNode \| string[]` | - | Description; a string array renders one paragraph per entry |
| `descriptionProps` | `TileInkProps` (`Partial<Omit<InkProps, "children">>`) | - | Ink props for the description |
| `contentTop` | `React.ReactNode` | - | Slot above the title |
| `contentCenter` | `React.ReactNode` | - | Slot between title and description |
| `contentLeft` | `React.ReactNode` | - | Left slot; triggers the split (row) layout |
| `contentRight` | `React.ReactNode` | - | Right slot; triggers the split (row) layout |

### Layout

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `padding` | `FlexSpacingType` (`SpacingShorthandType`: 1–4 space-separated `GapType` names) | - | Inner padding of the tile, as a CSS-like gap-token shorthand |
| `maxWidth` | `TileMaxWidthType` (`string`) | - | Max-width of the **inner content column**, as a CSS length (`"980px"`) or `"none"` to fill the container |
| `minWidth` | `TileMinWidthType` (`string`) | - | Min-width of the **outer tile box** (`"320px"`) |
| `minHeight` | `TileMinHeightType` (`string`) | - | Min-height of the **outer tile box** (`"80vh"`), the surface that carries `backgroundImage` |
| `maxHeight` | `TileMaxHeightType` (`string`) | - | Max-height of the **outer tile box** (`"100vh"`) |
| `gap` | `GapType` (`"none"`, `"smaller"`, `"small"`, `"base"`, `"large"`, `"larger"`) | - | Spacing on the Flex wrapping `children` below the title/description block |
| `alignItems` | `TileAlignItemsType` (`FlexAlignItemsType`: `"flex-start"`, `"flex-end"`, `"center"`, `"baseline"`, `"stretch"`) | - | Flex `align-items` of the content column |
| `justifyContent` | `TileJustifyContentType` (`FlexJustifyContentType`: `"flex-start"`, `"flex-end"`, `"center"`, `"space-between"`, `"space-around"`, `"space-evenly"`) | - | Flex `justify-content` of the content column |

> `maxWidth` constrains the centered inner content column. `minWidth` / `minHeight` / `maxHeight` constrain the outer tile box. This split is deliberate — heights and the box min-width describe the tile surface; `maxWidth` describes the readable content column inside it.

### Background & color

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `backgroundImage` | `string` | - | Emitted directly as `background-image`; pass `url(...)` or a gradient. `backgroundSize`, `backgroundPosition` and `backgroundAttachment` apply only when it is set |
| `backgroundColor` | `ColorTokenProp<TileBackgroundColorType>` (`BackgroundColorType`: `"base"`, `"raised"`, `"success"`, `"highlight"`, `"warning"`, `"error"`, `"link"`, or the object form) | `tile.backgroundColor:base` | **Token-bound**, resolved against the `tile.backgroundColor` tokens |
| `backgroundPosition` | `string` | `"center"` | CSS `background-position` |
| `backgroundSize` | `TileBackgroundSizeType` (`BackgroundSizeType`: `"base"`, `"contain"`, `"cover"`, `"fill"`, `"none"`, `"scale-down"`) | `"cover"` | **Token-bound**, read from `tile.backgroundSize` |
| `backgroundAttachment` | `string` | `"fixed"` | CSS `background-attachment`, applied only in landscape orientation |
| `color` | `ColorTokenProp<TileColorType>` (`ColorType`: `"base"`, `"light"`, `"lighter"`, `"lightest"`, `"disabled"`, `"link"`, `"success"`, `"highlight"`, `"warning"`, `"error"`, or the object form) | `tile.color:base` | **Token-bound**, resolved against the `tile.color` tokens |
| `theme` | `ThemeType` (`"day"`, `"night"`, or a custom theme name) | - | Pins the subtree to a theme via `<Theme>` |

### HTML

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `className` | `string` | - | Class on the outer tile box |
| `style` | `React.CSSProperties` | - | Inline styles on the outer tile box |
| `breakpoints` | `Partial<TileProps>` per `"{breakpoint}+"` key | - | Per-breakpoint overrides for any prop (via `withBreakpoints`) |

## Tokens

Component tokens live in `nice-styles/src/tokens/components/tile.json` and are read with `getToken("tile.{group}:{variant}")`. Each emits a CSS custom property `--np--tile--{group}--{variant}`, with camelCase groups in kebab-case; the `base` variant contributes no segment (`tile.color:base` → `--np--tile--color`). Override them with `setTokens({ tile: { … } })`.

| Token group | Variants | CSS variables |
|-------------|----------|---------------|
| `backgroundColor` | `base`, `raised`, `success`, `warning`, `error`, `link` | `--np--tile--background-color`, `--np--tile--background-color--{variant}`, each with an `--inverse` form |
| `backgroundSize` | `base`, `contain`, `cover`, `fill`, `none`, `scale-down` | `--np--tile--background-size`, `--np--tile--background-size--{variant}` |
| `color` | `base`, `light`, `lighter`, `lightest`, `disabled`, `link`, `success`, `highlight`, `warning`, `error` | `--np--tile--color`, `--np--tile--color--{variant}`, each with an `--inverse` form |

The `--inverse` forms are derived for tokens that alias a core color with an inverse.

## Exports

```ts
import Tile, { TileTypes } from "nice-react-tile"
import type { TileProps, TileMaxWidthType, TileMinHeightType } from "nice-react-tile"
```

- **`default`** — the `Tile` component, wrapped with `withBreakpoints`.
- **`TileTypes`** — namespace of the prop types (`TileTypes.Props`, `TileTypes.MaxWidth`, `TileTypes.MinHeight`, …); individual types are also exported by name.

## Default behavior

- Inner content column is full-width up to `maxWidth`, then centered (`margin: 0 auto`).
- Split layout (`contentLeft` / `contentRight`) stacks on phone and becomes a row at `laptop+`.
- Background images use `fixed` attachment only in landscape orientation.
- Outer box defaults to the `tile.backgroundColor:base` / `tile.color:base` component tokens unless overridden, so `setTokens({ tile: { … } })` restyles the default surface.

## License

MIT
