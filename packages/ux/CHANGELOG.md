# @niceprototypes/ux

## 0.2.0

### Minor Changes

- 391949a: Add @niceprototypes/app (an app shell: a Tree nav of scenes and docs pages found by folder beside a focusable scene region, readable URLs with a bare full-screen view, and plain, React Router 7 and TanStack Router adapters) and its re-export from @niceprototypes/ux
- 22473aa: Add @niceprototypes/card (Card, CardHeader, CardBody, CardFooter: outline, elevated or filled surface; static, link or toggle button), its `card.*` component tokens in styles, and its re-export from @niceprototypes/ux
- 3547207: Add @niceprototypes/chat: ChatLog (a `<Scroll follow>` log, `aria-busy` while streaming, a "Scroll to latest" button while not at the end), ChatMessage (user bubble or full-width assistant reply, an actions row on hover, focus within and the last message), ChatComposer (send on Enter, stop on the stop button or Escape while busy, `maxRows`), ChatSuggestions and ChatCopyAction; its `chat.*` component tokens in styles; its re-export from @niceprototypes/ux. Code exports its `copyToClipboard` service.
- b35f5fa: Add @niceprototypes/contents (Contents: an in-page table of contents with a sticky heading, nested section links, scroll-spy and smooth scroll), its `contents.*` component tokens in styles, and its re-export from @niceprototypes/ux. Code reads its card max-width from the new `code.maxWidth` token (720px, unchanged). Icon hides its wrapper from assistive technology, so an inline SVG's `<style>` text no longer joins the accessible name of the control around it.
- 77364ca: Add @niceprototypes/grid (Grid and GridItem: column counts, auto-fill tracks and spans on Flex's gap tokens), and its re-export from @niceprototypes/ux
- cba4f06: Add @niceprototypes/listbox (controlled WAI-ARIA listbox with keyboard, typeahead and Ink labels); Select's dropdown renders it in place of List, and @niceprototypes/ux re-exports it
- 2228ff5: Add @niceprototypes/markdown (Markdown: markdown text with headings, paragraphs and list items through Ink, fenced code through Code, inline code through `Code inlined`, links through `linkComponent` or an anchor, `overrides` merged over those, and each top-level block memoised so a streaming reply re-renders only its last block), its `markdown.gap` component token in styles, and its re-export from @niceprototypes/ux. App's docs pages render through Markdown, so their code renders as Code.
- 7d1204d: Add @niceprototypes/radio (RadioGroup and Radio on native radios, wired to Field), its `radio.*` component tokens in styles, and its re-export from @niceprototypes/ux
- 8deec0e: Add @niceprototypes/tree (a navigation tree of nested links and disclosure folders with guide lines and a highlighted active path), its `tree.*` component tokens in styles, and its re-export from @niceprototypes/ux

### Patch Changes

- Updated dependencies [d38d016]
- Updated dependencies [6079566]
- Updated dependencies [2f537a3]
- Updated dependencies [5c06daa]
- Updated dependencies [9e9cfc3]
- Updated dependencies [391949a]
- Updated dependencies [69895e5]
- Updated dependencies [a279b9a]
- Updated dependencies [a09cbae]
- Updated dependencies [7c30e20]
- Updated dependencies [1ee590f]
- Updated dependencies [e7d3c28]
- Updated dependencies [b2ec456]
- Updated dependencies [661c953]
- Updated dependencies [22473aa]
- Updated dependencies [3547207]
- Updated dependencies [04b4ebd]
- Updated dependencies [b35f5fa]
- Updated dependencies [77364ca]
- Updated dependencies [aebe8ae]
- Updated dependencies [0c3e8ab]
- Updated dependencies [0c3e8ab]
- Updated dependencies [b9a769b]
- Updated dependencies [bb1e7a8]
- Updated dependencies [cba4f06]
- Updated dependencies [dac769a]
- Updated dependencies [2228ff5]
- Updated dependencies [7d1204d]
- Updated dependencies [20fc3f3]
- Updated dependencies [dfd23f0]
- Updated dependencies [093696f]
- Updated dependencies [dd0ae4a]
- Updated dependencies [48cd3e0]
- Updated dependencies [8b39524]
- Updated dependencies [8deec0e]
- Updated dependencies [e1b9dc0]
- Updated dependencies [2a40aef]
  - @niceprototypes/app@0.2.0
  - @niceprototypes/tree@0.2.0
  - @niceprototypes/button@9.2.0
  - @niceprototypes/card@0.2.0
  - @niceprototypes/chat@0.2.0
  - @niceprototypes/code@0.2.0
  - @niceprototypes/scroll@2.3.0
  - @niceprototypes/contents@0.2.0
  - @niceprototypes/grid@0.2.0
  - @niceprototypes/image@3.1.0
  - @niceprototypes/ink@8.1.0
  - @niceprototypes/input@3.1.0
  - @niceprototypes/lightbox@3.1.0
  - @niceprototypes/listbox@0.2.0
  - @niceprototypes/select@0.2.0
  - @niceprototypes/logo@1.0.0
  - @niceprototypes/markdown@0.2.0
  - @niceprototypes/radio@0.2.0
  - @niceprototypes/popover@0.2.0
  - @niceprototypes/list@0.2.0
  - @niceprototypes/slider@0.6.0
  - @niceprototypes/toggle@0.1.1
  - @niceprototypes/calendar@0.1.1
  - @niceprototypes/tooltip@0.1.3
