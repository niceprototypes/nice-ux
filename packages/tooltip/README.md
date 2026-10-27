# @niceprototypes/tooltip

A tooltip component for React. Wraps any element as the trigger and renders an
inverse-themed bubble on hover or click. Part of the Nice Prototypes ecosystem.

```bash
npm install @niceprototypes/tooltip
```

```tsx
import Tooltip from "@niceprototypes/tooltip"

<Tooltip content="Copy to clipboard" delayShow={600}>
  <button onClick={copy}>{value}</button>
</Tooltip>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `content` | `ReactNode` | — | Tooltip content shown in the bubble (required). |
| `children` | `ReactNode` | — | The trigger element the tooltip attaches to (required). |
| `trigger` | `"hover" \| "click"` | `"hover"` | How the tooltip activates. `hover` also shows on keyboard focus; `click` toggles open/closed. |
| `position` | `"top" \| "bottom" \| "left" \| "right"` | `"top"` | Side of the trigger the bubble is placed on. |
| `delayShow` | `number` | `0` | Delay in ms before the tooltip is rendered. |
| `delayHide` | `number` | `0` | Delay in ms before the tooltip is unrendered. |
| `className` | `string` | — | CSS class applied to the trigger wrapper. |

## Notes

- **Inverse theming.** The bubble uses the `inverse` dimension of the `color` /
  `backgroundColor` tokens, so it renders as the opposite theme and flips
  automatically with the `[data-theme]` cascade — no JS theme wiring.
- **Portal rendering.** The bubble renders in a portal at `<body>` with
  `position: fixed`, so it is never clipped by a scrolling or `overflow: hidden`
  ancestor.
- **Keyboard.** In `hover` mode, focusing a focusable child of the trigger shows
  the bubble and blurring it hides it; focus moving between children of the
  trigger keeps it shown. A focus-shown bubble anchors to the trigger. Escape
  hides a visible bubble immediately in either mode, ignoring `delayHide`. The
  trigger wrapper is not focusable itself — wrap a focusable element (a button
  or link) for keyboard users to reach the tooltip.
- **Accessibility.** The bubble has `role="tooltip"`, and the trigger wrapper
  carries `aria-describedby` pointing at it while it is shown.
- **Delays** defer render (`delayShow`) and unrender (`delayHide`); a pending
  timer is cleared on unmount and when the opposite event fires.
