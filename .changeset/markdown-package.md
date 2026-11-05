---
"@niceprototypes/markdown": minor
"@niceprototypes/styles": minor
"@niceprototypes/ux": minor
"@niceprototypes/app": patch
---

Add @niceprototypes/markdown (Markdown: markdown text with headings, paragraphs and list items through Ink, fenced code through Code, inline code through `Code inlined`, links through `linkComponent` or an anchor, `overrides` merged over those, and each top-level block memoised so a streaming reply re-renders only its last block), its `markdown.gap` component token in styles, and its re-export from @niceprototypes/ux. App's docs pages render through Markdown, so their code renders as Code.
