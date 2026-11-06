# @niceprototypes/contents

## 0.2.0

### Minor Changes

- b35f5fa: Add @niceprototypes/contents (Contents: an in-page table of contents with a sticky heading, nested section links, scroll-spy and smooth scroll), its `contents.*` component tokens in styles, and its re-export from @niceprototypes/ux. Code reads its card max-width from the new `code.maxWidth` token (720px, unchanged). Icon hides its wrapper from assistive technology, so an inline SVG's `<style>` text no longer joins the accessible name of the control around it.
- dfd23f0: Scroll: the scroll container every scrolling region renders through (`axis`, `showScrollbar`, `as`, `ref`). Scrollbars are hidden by default; the `scroll.scrollbarWidth` token sets the project default. Popover, List, Contents, Slider and the App shell's nav, sidebar, footer and scene region scroll through it.
