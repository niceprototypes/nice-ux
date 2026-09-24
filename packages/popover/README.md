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
| `onOpenChange` | `(open: boolean) => void` | — | Called with `false` on Escape or pointerdown outside the popover, anchor and `ignoreOutsideRefs`. |
| `anchorRef` | `RefObject<HTMLElement \| null>` | — | Element the popover is positioned against (required). |
| `ignoreOutsideRefs` | `ReadonlyArray<RefObject<HTMLElement \| null>>` | — | Elements where a pointerdown does not dismiss the popover, e.g. a trigger beside the anchor. |
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
- **Outside dismiss.** A pointerdown outside the popover and the anchor calls
  `onOpenChange(false)`. A trigger that sits beside the anchor (e.g. a date
  field's calendar button) would dismiss the popover on pointerdown and then
  reopen it with its own toggle on click. Pass it in `ignoreOutsideRefs` so its
  pointerdown is ignored and the toggle alone decides:

  ```tsx
  <Popover open={open} onOpenChange={setOpen} anchorRef={fieldRef} ignoreOutsideRefs={[calendarButtonRef]}>
  ```

  The array may be written inline; the latest value is read on each pointerdown.
- **Focus.** Focus is not trapped. On close, focus returns to the anchor if it
  was inside the popover.
- **Tokens.** Radius, shadow, stacking and max height use the `popover.*`
  component tokens (`popover.borderRadius`, `popover.boxShadow`,
  `popover.zIndex`, `popover.maxHeight`); content taller than the max height
  scrolls. Colours use core `backgroundColor:raised` / `color:base`.
- **Offset.** The anchor gap is read from `popover.offset` as a raw value and
  parsed as px, because positioning runs in JS. A non-px value — including the
  seed alias `var(--np--gap--small)` — falls back to 8px.

## License

MIT
