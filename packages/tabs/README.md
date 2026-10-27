# nice-react-tabs

Tabs: a WAI-ARIA tab list, optional content after the tabs (such as an add button), and the
selected tab's panel. A tab label may be any node, an input included: tabs are not buttons,
and keys pressed inside a label's own control stay with that control.

## Install

```sh
npm install nice-react-tabs
```

Peer dependencies: `nice-react-styles`, `react`, `react-dom`, `styled-components`.

## Usage

```tsx
import Tabs from "nice-react-tabs"

<Tabs
  aria-label="Pages"
  items={[
    { id: "page-1", label: "Page 1" },
    { id: "page-2", label: "Page 2" },
  ]}
  selected={page}
  onSelect={setPage}
  end={<Button iconLeft="plus" aria-label="Add page" />}
>
  {panel}
</Tabs>

// A label can be an input, e.g. an editable page name
{ id: "page-1", label: <Input ghost size="small" value={name} onChange={setName} aria-label="Page name" /> }
```

## Props

| Prop | Type | Default | |
|---|---|---|---|
| `items` | `{ id: string; label: ReactNode; disabled?: boolean }[]` | | The tabs, in order |
| `selected` | `string` | | Selected tab id (controlled) |
| `defaultSelected` | `string` | first enabled tab | Selected tab id at first (uncontrolled) |
| `onSelect` | `(id: string, event: MouseEvent \| KeyboardEvent) => void` | | Id first, then the click or key event |
| `end` | `ReactNode` | | Row content after the last tab; not a tab |
| `children` | `ReactNode` | | The selected tab's panel (`role="tabpanel"`) |
| `size` | `smaller`, `small`, `base`, `large`, `larger` | `base` | Tab padding, gap and font size |
| `justifyContent` | `flex-start`, `flex-end`, `center`, `space-between`, `space-around`, `space-evenly` | | Places the tab list and `end` along the row (the nice-react-flex values); `space-between` puts `end` at the row's end |
| `gap` | `none`, `smaller`, `small`, `base`, `large`, `larger` | the size's `tabs.gap` | Gap between tabs and between the tab list and `end`, from the `gap` core token |
| `variant` | `underline`, `pill` | `underline` | `underline`: row bottom border and selected underline. `pill`: a rounded border per tab (`tabs.pill.*`), no row border or underline |
| `aria-label` | `string` | | Accessible name of the tab list |
| `className` | `string` | | Applied to the root element |
| `theme` | `ThemeType` | | Pins token resolution to a theme |

## Keyboard

Only one tab is in the tab order: the selected one (roving tabindex). On a focused tab:

| Key | Action |
|---|---|
| ArrowRight / ArrowLeft | Focus and select the next / previous enabled tab, wrapping |
| Home / End | Focus and select the first / last enabled tab |
| Enter / Space | Select the focused tab |

Keys pressed inside a control in a label (an input's caret keys, typing) are left to that
control. Clicking anywhere in a tab, its input included, selects the tab.

## Tokens

All from `nice-styles` (`src/tokens/components/tabs.json`); override any of them on an
ancestor to restyle Tabs without props.

| Token | Default |
|---|---|
| `--np--tabs--padding` (+ size variants) | `var(--np--gap--small) var(--np--gap)` |
| `--np--tabs--gap` (+ size variants) | `var(--np--gap--small)` |
| `--np--tabs--font-size` (+ size variants) | `var(--np--font-size)` |
| `--np--tabs--color` / `--color--selected` | `var(--np--color--lighter)` / `var(--np--color)` |
| `--np--tabs--border-color`, `--border-width` | `var(--np--border-color)`, `var(--np--border-width)` (underline variant: row's bottom border) |
| `--np--tabs--indicator--color`, `--width` | `var(--np--color--link)`, `var(--np--border-width--large)` (underline variant: selected underline) |
| `--np--tabs--disabled-opacity` | `0.5` |
| `--np--tabs--focus-ring--width` / `--color` / `--offset` | `var(--np--border-width--large)` / `var(--np--color--link)` / `var(--np--gap--smaller)` |
| `--np--tabs--pill--border-radius`, `--border-width` | `var(--np--border-radius--larger)`, `var(--np--border-width)` (pill variant) |
| `--np--tabs--pill--border-color` / `--hover` / `--selected` | `transparent` / `var(--np--border-color)` / `var(--np--border-color--stronger)` (pill variant: rest, hovered enabled tab, selected tab) |

Docs: nice-storybook → Components → Tabs.
