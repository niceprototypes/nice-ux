# nice-react-dialog

A modal dialog component for React. Renders a controlled native `<dialog>`
shown with `showModal()`, with Escape and backdrop-click dismiss, focus return
and page scroll lock. Part of the Nice Prototypes ecosystem.

## Install

```bash
npm install nice-react-dialog
```

Peer dependencies: `react` (>=19.2), `styled-components` (>=6.1.18), `nice-react-styles`.

## Usage

```tsx
import * as React from "react"
import Dialog from "nice-react-dialog"

const DeleteInvoice = () => {
  const [open, setOpen] = React.useState(false)

  return (
    <>
      <button onClick={() => setOpen(true)}>Delete</button>
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        title="Delete invoice?"
        description="This cannot be undone."
        actions={<button onClick={() => setOpen(false)}>Cancel</button>}
      >
        …
      </Dialog>
    </>
  )
}
```

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `open` | `boolean` | — | Whether the dialog is shown as a modal (required, controlled). |
| `onClose` | `() => void` | — | Called on Escape, backdrop click (when `closeOnBackdropClick`) and any native close the consumer did not request (e.g. `<form method="dialog">`). |
| `title` | `ReactNode` | — | Heading in an `<h2>`; labels the dialog via `aria-labelledby` (required). |
| `description` | `ReactNode` | — | Supporting text in a `<p>`; describes the dialog via `aria-describedby`. |
| `children` | `ReactNode` | — | Dialog body. |
| `actions` | `ReactNode` | — | Footer content, aligned to the end of the row. |
| `closeOnBackdropClick` | `boolean` | `true` | Whether a backdrop click calls `onClose`. |
| `id` | `string` | — | Id of the dialog element. |
| `ref` | `Ref<HTMLDialogElement>` | — | Ref to the dialog element. |
| `theme` | `ThemeType` | — | Pin token resolution to a theme. |
| `breakpoints` | `BreakpointOverride` | — | Per-viewport prop overrides (via `withBreakpoints`). |

### Notes

- **Top layer.** `showModal()` places the dialog in the browser's top layer and
  makes the rest of the page inert, so no portal or z-index is involved.
- **Controlled close.** Escape fires the native `cancel` event; it is prevented
  and `onClose` is called, so the dialog closes only when `open` turns false.
- **Backdrop click.** The `<dialog>` has no padding, so a click whose target is
  the dialog element is a backdrop click. A press that starts inside the dialog
  and ends on the backdrop does not close it.
- **Focus.** On open, focus moves into the dialog (the native focusing steps,
  falling back to the dialog element). On close, focus returns to the element
  focused before opening.
- **Scroll lock.** `<html>` gets `overflow: hidden` while open; the previous
  value is restored on close and on unmount.

## Tokens

All from `nice-styles` (`src/tokens/components/dialog.json`); override any of them
with `setTokens({ dialog: { … } })` to restyle Dialog without props. The defaults
equal the previous core-token values and the user-agent `<dialog>` defaults.

| Token | Default |
|---|---|
| `--np--dialog--background-color` | `var(--np--background-color--raised)` |
| `--np--dialog--color` | `var(--np--color)` |
| `--np--dialog--border-radius` | `var(--np--border-radius)` |
| `--np--dialog--box-shadow` | `var(--np--box-shadow--large)` |
| `--np--dialog--width` | `fit-content` |
| `--np--dialog--max-width` | `calc(100% - 6px - 2em)` |
| `--np--dialog--padding` | `var(--np--gap)` |
| `--np--dialog--gap` | `var(--np--gap)` |
| `--np--dialog--backdrop--background-color` | `rgba(0, 0, 0, 0.1)` |
| `--np--dialog--title--font-size` | `var(--np--font-size--large)` |
| `--np--dialog--title--font-weight` | `var(--np--font-weight--semibold)` |
| `--np--dialog--description--color` | `var(--np--color--light)` |
| `--np--dialog--actions--gap` | `var(--np--gap--small)` |

The backdrop colour is set on `::backdrop`, which inherits custom properties
from the dialog in Chrome 122+, Firefox 120+ and Safari 17.4+; in older engines
it resolves the variable from `:root`.

## License

MIT
