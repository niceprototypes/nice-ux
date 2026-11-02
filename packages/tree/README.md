# @niceprototypes/tree

`Tree`: a navigation tree of nested data. A `<nav>` of nested lists, on the WAI-ARIA disclosure
navigation pattern (the APG recommends it over `role="tree"` for site navigation):

- A node with `items` is a folder: a `<button aria-expanded aria-controls>` that shows or hides its
  sub-list. A leaf with a `url` is a link, `aria-current="page"` when its status is `"active"`.
- Keyboard: native. Tab and Shift+Tab move between rows, Enter or Space toggles a folder, Enter
  follows a link.
- Guide lines join each folder's icon to its sub-rows. The active node, its ancestors and the guide
  leading to it take the `tree.activeColor` token (default: the link colour); every other row
  recedes to `color:lighter` until hovered.
- Labels render through Ink, base size below laptop and small from laptop up.

## Install

```sh
npm install @niceprototypes/tree
```

Peer dependencies: `@niceprototypes/ink`, `@niceprototypes/styles`, `react`, `react-dom`, `styled-components`.

## Usage

```tsx
import Icon from "@niceprototypes/icon"
import Tree from "@niceprototypes/tree"

<Tree
  aria-label="Docs"
  items={[
    { id: "guides", name: "Guides", icon: <Icon name="folder-closed" />, items: [
      { id: "start", name: "Start", icon: null, url: "/start", status: "active" },
    ] },
  ]}
  onSelect={(node, event) => {
    event.preventDefault()
    router.push(node.url)
  }}
/>
```

## Props

Prop types are `TreeProps` and `TreeNodeType`; allowed values per prop are in
`manifest/agents/catalog.json`. Folders are uncontrolled by default (`defaultExpandedIds`, else the
active node's ancestors) or controlled with `expandedIds` + `onExpandedChange`.

## Active colour

Tree has no colour prop. A project sets the active colour by overriding the `tree.activeColor`
token: for every tree, in its `setTokens` map; for one tree only, on a wrapper element.

```tsx
import { getToken, setTokens } from "@niceprototypes/styles"
import Flex from "@niceprototypes/flex"

// Every tree in the project
setTokens({ tree: { activeColor: { base: getToken("color:success") } } })

// One tree: reassign the token on a wrapper
<Flex style={{ [getToken("tree.activeColor", { as: "key" })]: getToken("color:success") }}>
  <Tree aria-label="Steps" items={items} />
</Flex>
```

## Tokens

`tree.*` in `@niceprototypes/styles`: `color`, `activeColor`, `inactive.color`,
`fontWeight` (`base`, `active`), `row.minHeight`, `row.paddingBlock`, `icon.size`, `guide.color`, `guide.width`, `guide.arm`.
