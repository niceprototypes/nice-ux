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

`title` and `description` render through `nice-react-typography`. Forward Typography props with `titleProps` / `descriptionProps`:

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
<Tile backgroundColor="dark" color="light" title="Token-driven surface" />
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

### Spacing

`spacing` re-exports `FlexSpacingType` from `nice-react-flex` — a CSS-shorthand string of `gap` token names (1–4 values: top/right/bottom/left), or a per-breakpoint object.

```tsx
<Tile spacing="larger base" />          // vertical "larger", horizontal "base"
<Tile spacing={{ phone: "base", laptop: "larger" }} />
```

Gap token names: `none`, `smaller`, `small`, `base`, `large`, `larger`.

## Props

### Content

| Prop | Type | Description |
|------|------|-------------|
| `children` | `React.ReactNode` | Main content, below the title/description block |
| `title` | `React.ReactNode` | Title, rendered via Typography |
| `titleProps` | `TileTypographyProps` | Typography props for the title (`Partial<Omit<TypographyProps, "children">>`) |
| `description` | `React.ReactNode \| string[]` | Description; a string array renders one paragraph per entry |
| `descriptionProps` | `TileTypographyProps` | Typography props for the description |
| `contentTop` | `React.ReactNode` | Slot above the title |
| `contentCenter` | `React.ReactNode` | Slot between title and description |
| `contentLeft` | `React.ReactNode` | Left slot — triggers split (row) layout |
| `contentRight` | `React.ReactNode` | Right slot — triggers split (row) layout |

### Layout

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `maxWidth` | `TileMaxWidthType` (`string`) | — | Max-width of the **inner content column**, as a CSS length (`"980px"`) or `"none"` to fill the container |
| `minWidth` | `TileMinWidthType` (`string`) | — | Min-width of the **outer tile box** (`"320px"`) |
| `minHeight` | `TileMinHeightType` (`string`) | — | Min-height of the **outer tile box** (`"80vh"`) — the surface that carries `backgroundImage` |
| `maxHeight` | `TileMaxHeightType` (`string`) | — | Max-height of the **outer tile box** (`"100vh"`) |
| `spacing` | `FlexSpacingType` | — | Padding shorthand (gap token names) or per-breakpoint object |
| `gap` | `GapType` | — | Top spacing on the Flex wrapping `children` below the title/description block |
| `alignItems` | `TileAlignItemsType` | — | Flex `align-items` (single value or breakpoint object) |
| `justifyContent` | `TileJustifyContentType` | — | Flex `justify-content` (single value or breakpoint object) |

> `maxWidth` constrains the centered inner content column. `minWidth` / `minHeight` / `maxHeight` constrain the outer tile box. This split is deliberate — heights and the box min-width describe the tile surface; `maxWidth` describes the readable content column inside it.

### Background & color

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `backgroundImage` | `string` | — | Emitted directly as `background-image` — pass `url(...)` or a gradient |
| `backgroundColor` | `TileBackgroundColorType` | — | **Token-bound** — nice-styles `BackgroundColorType` variant only |
| `backgroundPosition` | `string` | `"center"` | CSS `background-position` |
| `backgroundSize` | `TileBackgroundSizeType` | `"cover"` | **Token-bound** — nice-styles `BackgroundSizeType` variant only |
| `backgroundAttachment` | `string` | `"fixed"` | CSS `background-attachment`, applied only in landscape orientation |
| `color` | `TileColorType` | — | **Token-bound** — nice-styles `ColorType` variant only |
| `theme` | `ThemeType` | — | Pins the subtree to a theme (`"day"` / `"night"` / custom) via `<Theme>` |

### HTML

| Prop | Type | Description |
|------|------|-------------|
| `className` | `string` | Class on the outer tile box |
| `style` | `React.CSSProperties` | Inline styles on the outer tile box |
| `breakpoints` | `Partial<TileProps>` per `"{breakpoint}+"` key | Per-breakpoint overrides for any prop (via `withBreakpoints`) |

## Exports

```ts
import Tile, { getTileToken, TileTypes } from "nice-react-tile"
import type { TileProps, TileMaxWidthType, TileMinHeightType } from "nice-react-tile"
```

- **`default`** — the `Tile` component.
- **`getTileToken`** — accessor for `tile`-prefixed component tokens (thin wrapper over `getComponentToken`).
- **`TileTypes`** — namespace re-export of every prop type (`TileTypes.Props`, `TileTypes.MaxWidth`, `TileTypes.MinHeight`, …); individual types are also exported by name.

## Default behavior

- Inner content column is full-width up to `maxWidth`, then centered (`margin: 0 auto`).
- Split layout (`contentLeft` / `contentRight`) stacks on phone and becomes a row at `laptop+`.
- Background images use `fixed` attachment only in landscape orientation.
- Outer box defaults to `backgroundColor`/`color` base tokens unless overridden.

## License

MIT
