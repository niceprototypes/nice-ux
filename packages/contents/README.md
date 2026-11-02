# @niceprototypes/contents

`Contents`: the in-page table of contents beside a long page.

- A `<nav>` named by its sticky heading ("Contents" by default, or `aria-label`), holding nested
  lists of links to the page's sections (`href="#{id}"`).
- Scroll-spy marks the section in view: `aria-current="location"`, the `contents.color:active`
  colour and an indicator bar over the rail.
- A click scrolls smoothly to the section (instantly under `prefers-reduced-motion`) and holds the
  highlight on it until the scroll ends. Targets set their own `scroll-margin-top` to clear a
  sticky header.
- The whole nav is sticky (`contents.top`) and scrolls on its own when taller than the viewport.
- Labels render through Ink.

## Install

```sh
npm install @niceprototypes/contents
```

Peer dependencies: `@niceprototypes/ink`, `@niceprototypes/styles`, `react`, `react-dom`, `styled-components`.

## Usage

```tsx
import Contents from "@niceprototypes/contents"

<Contents
  items={[
    { id: "docs", label: "Docs" },
    { id: "props", label: "Props", items: [{ id: "size", label: "size" }] },
  ]}
/>
```

Props and their types: `jq '.packages[].components[]|select(.name=="Contents")' manifest/agents/catalog.json`.
