# @niceprototypes/markdown

`Markdown`: markdown text rendered through Nice components.

- Headings, paragraphs and list items render as Ink; fenced code as a Code block; inline code as
  `Code inlined`.
- Links render through `linkComponent` (a router link, say), or as anchors when it is unset.
- `overrides` (markdown-to-jsx overrides) are merged over those defaults.
- Each top-level block is memoised on its content, so while a reply streams only its last block
  re-renders.
- Blocks sit `markdown.gap` apart.

## Install

```sh
npm install @niceprototypes/markdown
```

Peer dependencies: `@niceprototypes/code`, `@niceprototypes/ink`, `@niceprototypes/styles`, `react`, `react-dom`, `styled-components`.

## Usage

```tsx
import Markdown from "@niceprototypes/markdown"

<Markdown linkComponent={({ href, children }) => <Link to={href}>{children}</Link>}>
  {"# Title\n\nA paragraph with `inline code`."}
</Markdown>
```

Props and their types: `jq '.packages[].components[]|select(.name=="Markdown")' manifest/agents/catalog.json`.
