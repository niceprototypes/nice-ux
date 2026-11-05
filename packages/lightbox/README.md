# @niceprototypes/lightbox

> **Responsive props:** Every prop accepts per-breakpoint overrides via the `breakpoints` array. See [withBreakpoints](https://niceprototypes.com/ui/?path=/docs/basics-breakpoints--docs).

## Modal dialog

The overlay is a native `<dialog>` (`role="dialog"`, `aria-modal="true"`) shown with `showModal()`: it sits in the top layer, the page behind it is inert, so focus stays inside, and page scroll is locked while it is open. It is named by `title`, else by `alt`. Escape and a click outside the image and caption close it; focus then returns to the trigger.

## Keyboard

The trigger is focusable (`role="button"`, `tabIndex={0}`) and opens the lightbox on Enter or Space; Escape closes it. Keyboard focus shows an outline from the `lightbox.focusRing.width`, `lightbox.focusRing.color` and `lightbox.focusRing.offset` tokens.

## Open state

Without `open` the Lightbox opens and closes itself. Pass `open` to control it; `onOpenChange` receives every requested change (`true` from the trigger, `false` from Escape or an outside click) in both modes.

```tsx
const [open, setOpen] = React.useState(false)

<Lightbox imageUrl={url} alt="Mountain landscape" open={open} onOpenChange={setOpen}>
  <img src={thumbnailUrl} alt="Mountain landscape" />
</Lightbox>
```

## Tokens

All from `@niceprototypes/styles` (`src/tokens/components/lightbox.json`).

| Token | Default |
|---|---|
| `--np--lightbox--background-color` | `var(--np--overlay-color)`: the scrim |
| `--np--lightbox--image--max-width` | `90vw` |
| `--np--lightbox--image--max-height` | `80vh` |
| `--np--lightbox--caption--max-width` | `600px` |
| `--np--lightbox--caption--padding` | `var(--np--gap) var(--np--gap--large)` |
| `--np--lightbox--focus-ring--width` | `var(--np--border-width--large)` |
| `--np--lightbox--focus-ring--color` | `var(--np--color--link)` |
| `--np--lightbox--focus-ring--offset` | `var(--np--gap--smaller)` |
