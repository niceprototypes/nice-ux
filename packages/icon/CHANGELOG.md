# @niceprototypes/icon

## 8.1.0

### Minor Changes

- d38d016: App: a `docsLink` prop, a book icon link after the search that opens the first docs section page in a new tab; both header icon buttons read `app.header.icon.color` and `app.header.focusRing.color` (`app.search.icon` is gone). Icon: `book-open`, adapted from Lucide (ISC).

### Patch Changes

- b35f5fa: Add @niceprototypes/contents (Contents: an in-page table of contents with a sticky heading, nested section links, scroll-spy and smooth scroll), its `contents.*` component tokens in styles, and its re-export from @niceprototypes/ux. Code reads its card max-width from the new `code.maxWidth` token (720px, unchanged). Icon hides its wrapper from assistive technology, so an inline SVG's `<style>` text no longer joins the accessible name of the control around it.
