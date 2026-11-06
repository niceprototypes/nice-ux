# @niceprototypes/button

## 9.2.0

### Minor Changes

- 661c953: Button: default label and border colours read the `button.color` / `button.borderColor` tokens (filled label: `button.color` inverse; inlined: `button.color:link`), so `setTokens({ button })` restyles a default button; the element-scoped height is the new `button.height` token; `iconSize`, `iconStrokeWidth` and `iconStrokeScaling` props; `loading` shows the spinner icon over the hidden content (width kept), sets `aria-busy` and ignores activation while staying focusable.
