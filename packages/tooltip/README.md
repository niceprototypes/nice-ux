# nice-react-tooltip

A tooltip component for React. Wraps any element as the trigger and renders an
inverse-themed bubble on hover or click. Part of the Nice Prototypes ecosystem.

```bash
npm install nice-react-tooltip
```

```tsx
import Tooltip from "nice-react-tooltip"

<Tooltip content="Copy to clipboard" delayShow={600}>
  <button onClick={copy}>{value}</button>
</Tooltip>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `content` | `ReactNode` | — | Tooltip content shown in the bubble (required). |
| `children` | `ReactNode` | — | The trigger element the tooltip attaches to (required). |
| `trigger` | `"hover" \| "click"` | `"hover"` | How the tooltip activates. `click` toggles open/closed. |
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
- **Delays** defer render (`delayShow`) and unrender (`delayHide`); a pending
  timer is cleared on unmount and when the opposite event fires.
