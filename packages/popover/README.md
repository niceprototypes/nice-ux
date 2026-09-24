# nice-react-popover

A popover component for React. Renders a controlled, portal-positioned surface
anchored to an element, with Escape and outside-click dismiss and focus return.
Part of the Nice Prototypes ecosystem.

## Install

```bash
npm install nice-react-popover
```

Peer dependencies: `react`, `react-dom` (>=19.2), `styled-components` (>=6.1.18).

## Usage

```tsx
import * as React from "react"
import Popover from "nice-react-popover"

const Menu = () => {
  const anchorRef = React.useRef<HTMLButtonElement>(null)
  const [open, setOpen] = React.useState(false)

  return (
    <>
      <button ref={anchorRef} aria-expanded={open} aria-controls="menu" onClick={() => setOpen((o) => !o)}>
        Options
      </button>
      <Popover id="menu" open={open} onOpenChange={setOpen} anchorRef={anchorRef} aria-label="Options">
        …
      </Popover>
    </>
  )
}
```

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `open` | `boolean` | — | Whether the popover is rendered (required, controlled). |
| `onOpenChange` | `(open: boolean) => void` | — | Called with `false` on Escape or pointerdown outside the popover and anchor. |
| `anchorRef` | `RefObject<HTMLElement \| null>` | — | Element the popover is positioned against (required). |
| `position` | `"top" \| "bottom" \| "left" \| "right"` | `"bottom"` | Side of the anchor. |
| `align` | `"start" \| "center" \| "end"` | `"start"` | Cross-axis alignment against the anchor (physical: start = left / top). |
| `role` | `AriaRole` | `"dialog"` | ARIA role of the popover element. |
| `aria-label` / `aria-labelledby` | `string` | — | Accessible name. |
| `id` | `string` | — | Id of the popover element. |
| `ref` | `Ref<HTMLDivElement>` | — | Ref to the popover element. |
| `className` | `string` | — | CSS class applied to the popover element. |
| `theme` | `ThemeType` | — | Pin token resolution to a theme. |
| `breakpoints` | `BreakpointOverride` | — | Per-viewport prop overrides (via `withBreakpoints`). |

### `computeAnchorPosition`

The positioning math is exported as a pure service:

```ts
import { computeAnchorPosition } from "nice-react-popover"

const { top, left, transform } = computeAnchorPosition(el.getBoundingClientRect(), "bottom", "start", 8)
// also accepts a point: computeAnchorPosition({ x: event.clientX, y: event.clientY }, "top", "center", 8)
```

### Notes

- **Portal rendering.** The popover renders at `<body>` with `position: fixed`,
  so it is never clipped by a scrolling or `overflow: hidden` ancestor. Position
  is recomputed on scroll (capture) and resize while open.
- **Focus.** Focus is not trapped. On close, focus returns to the anchor if it
  was inside the popover.
- **Tokens.** Surface uses core tokens: `backgroundColor:raised`, `color:base`,
  `borderRadius:base`, `boxShadow:base`, `zIndex:higher`. The anchor offset is a
  fixed 8px until the `popover.offset` token lands in nice-styles.

## License

MIT
