# @niceprototypes/listbox

`Listbox`: a controlled WAI-ARIA listbox. A `<ul role="listbox">` of `role="option"` rows with
`aria-selected`; labels render through Ink, so they take the Nice font wherever the list is
mounted (a Popover portal included). Select's dropdown is a Listbox.

- **Focusable (default):** a tab stop. Focus activates the selected option; ArrowUp / ArrowDown,
  Home / End and PageUp / PageDown move the active option past disabled ones; Enter / Space choose
  it; printable keys run typeahead. The active option is named by `aria-activedescendant`.
- **`focusable={false}`:** another element (a combobox trigger) keeps focus and drives
  `activeValue`; option presses do not take focus.

## Install

```sh
npm install @niceprototypes/listbox
```

Peer dependencies: `@niceprototypes/ink`, `@niceprototypes/styles`, `react`, `react-dom`, `styled-components`.

## Usage

```tsx
import Listbox from "@niceprototypes/listbox"

const [loop, setLoop] = useState("story")

<Listbox
  aria-label="Loop"
  options={[
    { value: "story", label: "Loop story" },
    { value: "chapter", label: "Loop chapter", disabled: true },
  ]}
  value={loop}
  onChange={setLoop}
/>
```

## Props

Prop types are `ListboxProps`; allowed values per prop are in `manifest/agents/catalog.json`.
`onChange` receives the value first, then the click or keydown event, on every choice.

## Services

`getListboxEdgeIndex`, `getListboxNextIndex`, `getListboxTypeaheadIndex`, `getListboxOptionText`,
`getListboxOptionId` and the `useListboxTypeahead` buffer: the navigation rules, for a combobox
that drives a non-focusable Listbox (Select).

## Tokens

No component tokens. Rows use core tokens: `gap`, `borderRadius:small`, `borderColor:base`
(active), `backgroundColor:link` and `color:link` (selected), `borderColor:link` (active and
selected), `color:disabled`.
