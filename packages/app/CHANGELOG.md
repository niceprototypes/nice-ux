# @niceprototypes/app

## 0.2.0

### Minor Changes

- d38d016: App: a `docsLink` prop, a book icon link after the search that opens the first docs section page in a new tab; both header icon buttons read `app.header.icon.color` and `app.header.focusRing.color` (`app.search.icon` is gone). Icon: `book-open`, adapted from Lucide (ISC).
- 6079566: App: an `end` prop, a column right of the scene region and outside it, `app.end.width` wide (24em) with the panels' rule on its start edge; laptop and up only, mounted across page changes.
- 5c06daa: App: the nav lists only the current page's section (the stories on a story page, the docs pages on a docs page), with no Docs group row; search still covers both.
  App: the sidebar is at least 24em wide by default (`app.sidebar.minWidth`), and the header's search and docs link sit the smaller gap apart.
- 9e9cfc3: App: the stories are the nav's top-level folders (no Stories group row); the docs section's pages stay under a Docs group after them. The search square shows only its icon, no border, until it opens into the field.
- 391949a: Add @niceprototypes/app (an app shell: a Tree nav of scenes and docs pages found by folder beside a focusable scene region, readable URLs with a bare full-screen view, and plain, React Router 7 and TanStack Router adapters) and its re-export from @niceprototypes/ux
- a279b9a: App: the scene sidebar is a resizable panel under the nav (no longer a column right of it), above the footer panel; both share one panel and handle (hidden scrollbars). `app.footer.*` tokens are now `app.panel.*`.
- a09cbae: App: the header row holds the Nice logo itself at `app.logo.height` (40; the `header` prop is gone) and, with the new `search` prop, a search button that expands into a field at the nav labels' size (`app.search.fontSize`, 16px floor below tablet), a gray icon that turns white on hover (`app.search.icon.color`), and a field with a gray focus border on pure black (night) or white (day) (`app.search.focusColor`, `app.search.backgroundColor`). Tree: `useTreeSize`, the label size a Tree renders at.
- 7c30e20: App: a resizable sidebar footer under the nav and the scene sidebar (useSceneSidebarFooter), with a separator drag handle (pointer and arrow keys) between the handle alone and its content's height; styles: app.footer._ and app.handle._ component tokens
- 1ee590f: App: a `header` prop, a row at the top of the sidebar above the nav and the scene sidebar (a logo), with the nav's padding; absent in the bare view
- e7d3c28: App: the sidebar is at least `app.sidebar.minWidth` wide (styles: new component token, `auto` by default, so the default layout is unchanged; set it per breakpoint in a token map)
- b2ec456: App: the sidebar is a drawer below laptop (was below tablet). A `panelLabels` prop labels the two panels under the nav on their handle's line (`app.panel.label.*`); the handle row sits centred between the panel's top rule and its content (`app.handle.padding` is the large gap, as `app.handle.paddingBottom`).
- dfd23f0: Scroll: the scroll container every scrolling region renders through (`axis`, `showScrollbar`, `as`, `ref`). Scrollbars are hidden by default; the `scroll.scrollbarWidth` token sets the project default. Popover, List, Contents, Slider and the App shell's nav, sidebar, footer and scene region scroll through it.

### Patch Changes

- 2f537a3: App: the sidebar footer's body scrolls vertically under the fixed handle when dragged shorter than its content; fully open it follows the content height (no scrollbar)
- 69895e5: App: panel labels and drag handles rest at `app.panel.restOpacity` (0.5) and show fully while their row is hovered, the handle focused or dragged.
- 2228ff5: Add @niceprototypes/markdown (Markdown: markdown text with headings, paragraphs and list items through Ink, fenced code through Code, inline code through `Code inlined`, links through `linkComponent` or an anchor, `overrides` merged over those, and each top-level block memoised so a streaming reply re-renders only its last block), its `markdown.gap` component token in styles, and its re-export from @niceprototypes/ux. App's docs pages render through Markdown, so their code renders as Code.
- Updated dependencies [a09cbae]
- Updated dependencies [cba4f06]
- Updated dependencies [dac769a]
- Updated dependencies [2228ff5]
- Updated dependencies [dfd23f0]
- Updated dependencies [8b39524]
- Updated dependencies [8deec0e]
- Updated dependencies [e1b9dc0]
- Updated dependencies [2a40aef]
  - @niceprototypes/tree@0.2.0
  - @niceprototypes/listbox@0.2.0
  - @niceprototypes/logo@1.0.0
  - @niceprototypes/markdown@0.2.0
  - @niceprototypes/popover@0.2.0
