# @niceprototypes/popover

A popover component for React. Renders a controlled, portal-positioned surface
anchored to an element, with Escape and outside-click dismiss and focus return.
Part of the Nice Prototypes ecosystem.

## Install

```bash
npm install @niceprototypes/popover
```

Peer dependencies: `react`, `react-dom` (>=19.2), `styled-components` (>=6.1.18).

## Usage

```tsx
import * as React from "react"
import Popover from "@niceprototypes/popover"

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
| `matchAnchorWidth` | `boolean` | `false` | Make the popover at least as wide as the anchor (min-width = the anchor's measured width). |
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
import { computeAnchorPosition } from "@niceprototypes/popover"

const { top, left, transform } = computeAnchorPosition(el.getBoundingClientRect(), "bottom", "start", 8)
// also accepts a point: computeAnchorPosition({ x: event.clientX, y: event.clientY }, "top", "center", 8)

// with the element's and viewport's sizes, it flips and shifts into the viewport
computeAnchorPosition(rect, "bottom", "start", 8, {
  size: { width: el.offsetWidth, height: el.offsetHeight },
  viewport: { width: window.innerWidth, height: window.innerHeight },
})
```

### `getAnchorOffset`

Reads an offset token as a px number (default `popover.offset`):

```ts
import { getAnchorOffset } from "@niceprototypes/popover"

getAnchorOffset() // 8
getAnchorOffset("tooltip.offset")
```

### Notes

- **Portal rendering.** The popover renders at `<body>` with `position: fixed`,
  so it is never clipped by a scrolling or `overflow: hidden` ancestor. Position
  is recomputed on scroll (capture) and resize while open.
- **Viewport.** When the popover overflows the viewport on its `position` side
  and the opposite side overflows less, it flips to the opposite side; it then
  shifts along the cross axis to stay inside the viewport.
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
- **Tokens.** Colours, radius, shadow, stacking and max height use the
  `popover.*` component tokens (`popover.backgroundColor`, `popover.color`,
  `popover.borderRadius`, `popover.boxShadow`, `popover.zIndex`,
  `popover.maxHeight`); content taller than the max height scrolls.
- **Offset.** The anchor gap is read from `popover.offset` with
  `getAnchorOffset` and parsed as px, because positioning runs in JS. A
  single-`var()` alias such as the seed `var(--np--gap--small)` is followed to
  its value; any other non-px value falls back to 8px.

## License

MIT
