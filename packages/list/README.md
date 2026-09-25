# nice-react-list

Generic list for React. `List` renders a `<ul>` with `<hr>` dividers between
items and an optional scrollable body; `ListItem` renders an `<li>` with
start/end slots. Part of the Nice Prototypes ecosystem.

## Install

```bash
npm install nice-react-list
```

Peer dependencies: `react`, `react-dom` (>=19.2), `styled-components` (>=6.1.18).

## Usage

```tsx
import { List, ListItem } from "nice-react-list"

<List size="small">
  <ListItem start={<Icon name="home" />}>Home</ListItem>
  <ListItem start={<Icon name="settings" />} end="⌘,">Settings</ListItem>
  <ListItem disabled>Billing</ListItem>
</List>

<List scrollable>
  {rows.map((row) => (
    <ListItem key={row.id} selected={row.id === selectedId}>
      {row.label}
    </ListItem>
  ))}
</List>
```

Multi-component package: named exports only, no default.

Both components pass standard HTML attributes (`role`, `aria-*`, `data-*`,
`id`, `tabIndex`, event handlers) through to their root element, so a higher
layer can build other patterns on top — for example a listbox, by passing
`role="listbox"` and `aria-activedescendant` to `List` and `role="option"`,
`id` and `aria-selected` to each `ListItem`.

## List

| Prop | Type | Notes |
|---|---|---|
| `children` | `ReactNode` | Items, typically `ListItem`s. `null` / `false` children are ignored |
| `scrollable` | `boolean` | Default `false`. When true: `overflow-y: auto` and `max-height: list.maxHeight` |
| `size` | `SizeType` | Default `"base"`. Item padding scale, passed to every `ListItem` through context |
| `className`, `theme`, `ref`, `breakpoints` | | Standard |
| …rest | `HTMLAttributes<HTMLUListElement>` | Passed to the `<ul>` |

A divider is rendered between each pair of adjacent rendered children, never
before the first or after the last. `<hr>` is not a valid direct child of
`<ul>`, so each divider is `<li aria-hidden="true" role="presentation"><hr /></li>`;
the divider `<li>`s are not exposed as list items.

## ListItem

| Prop | Type | Notes |
|---|---|---|
| `children` | `ReactNode` | Main content, between the slots |
| `start` / `end` | `ReactNode` | Slots before / after the content |
| `selected` | `boolean` | Visual only: selected background and colour |
| `active` | `boolean` | Visual only: highlight background (keyboard or pointer). Wins over `selected` for the background |
| `disabled` | `boolean` | Disabled colour and `aria-disabled="true"`. Handlers are not suppressed |
| `className`, `ref`, `breakpoints` | | Standard |
| …rest | `LiHTMLAttributes<HTMLLIElement>` | Passed to the `<li>` |

## Tokens

Component tokens live in `nice-styles/src/tokens/components/list.json`:
`list.padding.block:{size}`, `list.padding.inline:{size}`, `list.gap`,
`list.divider.color`, `list.divider.width`, `list.maxHeight`,
`list.backgroundColor:{base|active|selected}`,
`list.color:{base|selected|disabled}`.

## License

MIT
