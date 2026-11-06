# @niceprototypes/tree

## 0.2.0

### Minor Changes

- a09cbae: App: the header row holds the Nice logo itself at `app.logo.height` (40; the `header` prop is gone) and, with the new `search` prop, a search button that expands into a field at the nav labels' size (`app.search.fontSize`, 16px floor below tablet), a gray icon that turns white on hover (`app.search.icon.color`), and a field with a gray focus border on pure black (night) or white (day) (`app.search.focusColor`, `app.search.backgroundColor`). Tree: `useTreeSize`, the label size a Tree renders at.
- 8b39524: Remove Tree's `activeColor` prop. The active path reads the `tree.activeColor` token; override it in the project's `setTokens` map, or on a wrapper element for one tree.
- 8deec0e: Add @niceprototypes/tree (a navigation tree of nested links and disclosure folders with guide lines and a highlighted active path), its `tree.*` component tokens in styles, and its re-export from @niceprototypes/ux
- e1b9dc0: Tree rows take their height from content: the row `min-height` rule and the `tree.row.minHeight` token are removed.

### Patch Changes

- 2a40aef: Tree rows with children use the same line height as leaf rows
