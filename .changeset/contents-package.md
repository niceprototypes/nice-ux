---
"@niceprototypes/contents": minor
"@niceprototypes/styles": minor
"@niceprototypes/ux": minor
"@niceprototypes/code": patch
"@niceprototypes/icon": patch
---

Add @niceprototypes/contents (Contents: an in-page table of contents with a sticky heading, nested section links, scroll-spy and smooth scroll), its `contents.*` component tokens in styles, and its re-export from @niceprototypes/ux. Code reads its card max-width from the new `code.maxWidth` token (720px, unchanged). Icon hides its wrapper from assistive technology, so an inline SVG's `<style>` text no longer joins the accessible name of the control around it.
