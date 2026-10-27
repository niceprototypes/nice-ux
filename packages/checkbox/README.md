# @niceprototypes/checkbox

A checkbox that replaces the native one's look. A native `<input type="checkbox">` stays the
focus target and keyboard handler (Space toggles), invisible over a token-driven box that
shows a `@niceprototypes/icon` check when checked. Give it a visible label with `children`, or name
it with `aria-label` or `aria-labelledby`.

## Install

```sh
npm install @niceprototypes/checkbox
```

Peer dependencies: `@niceprototypes/field`, `@niceprototypes/icon`, `@niceprototypes/styles`, `react`, `react-dom`, `styled-components`.

## Usage

```tsx
import Checkbox from "@niceprototypes/checkbox"

// Uncontrolled, with a visible label
<Checkbox defaultChecked>Visible</Checkbox>

// No visible label: pass aria-label
<Checkbox aria-label="Visible" defaultChecked />

// Controlled
const [selected, setSelected] = useState(false)
<Checkbox aria-label="Select row" checked={selected} onChange={setSelected} />

<Checkbox aria-label="Done" size="small" backgroundColor="success" borderRadius="large" />
```

## Props

| Prop | Type | Default | |
|---|---|---|---|
| `checked` | `boolean` | | Checked value (controlled) |
| `defaultChecked` | `boolean` | | Initial value (uncontrolled) |
| `onChange` | `(checked: boolean, event: ChangeEvent<HTMLInputElement>) => void` | | New value first, then the native event |
| `disabled` | `boolean` | `false` | |
| `size` | `smaller`, `small`, `base`, `large`, `larger` | `base` | Box and check size |
| `backgroundColor` | `base`, `link`, `success`, `highlight`, `warning`, `error` (or `{ name, … }`) | `link` | Fill when checked |
| `borderColor` | border-color variant (or `{ name, … }`) | `strong` | Border when unchecked |
| `borderRadius` | `none`, `smaller`, `small`, `base`, `large`, `larger` | `small` | |
| `borderWidth` | `none`, `smaller`, `small`, `base`, `large`, `larger` | `base` | |
| `iconName` | `IconNameType` (or any vendor name, with `iconVendor`) | `check` | Icon drawn in the box when checked |
| `iconVendor` | `boolean` | `false` | Resolves `iconName` through the vendor icon set (Icon's `vendor` prop); needs `@niceprototypes/icon-vendor` imported |
| `children` | `ReactNode` | | Visible label next to the box; the root becomes a `<label>`, so clicking the text toggles it |
| `aria-label` | `string` | | Accessible name when there are no `children` |
| `aria-labelledby` | `string` | | id(s) of the element(s) that name it |
| `id`, `name` | `string` | | Forwarded to the native checkbox |
| `ref` | `Ref<HTMLInputElement>` | | Ref to the native checkbox (React 19 ref-as-prop) |
| `className` | `string` | | Applied to the root element (the `<label>` when there are `children`) |
| `theme` | `ThemeType` | | Pins token resolution to a theme |

Inside a `Field` (@niceprototypes/field), the native checkbox takes the Field's `id` (unless `id`
is passed), so the Field label names it; it is described by the Field's description and error
(`aria-describedby`), and takes `aria-invalid="true"` and `required` from the Field's `invalid`
and `required`.

```tsx
<Field label="Visible" description="Shown to everyone.">
  <Checkbox defaultChecked />
</Field>
```

With `children`, the label text sits `var(--np--gap--small)` from the box (the core small gap;
there is no checkbox gap token), and `disabled` dims box and text together. Without
`children`, the markup is the box alone.

A `checked` Checkbox with no `onChange` is read-only. The color props accept the same
`{ name, inverse, transform, … }` object as other nice components (`resolveColorProp`).

## Tokens

All from `@niceprototypes/styles` (`src/tokens/components/checkbox.json`); override any of them on an
ancestor to restyle Checkbox without props.

| Token | Default |
|---|---|
| `--np--checkbox--size` (+ size variants) | `20px` (`14px`–`28px`) |
| `--np--checkbox--background-color--unchecked` | `var(--np--background-color)` |
| `--np--checkbox--background-color--{base,link,…}` | `var(--np--color--{variant})` |
| `--np--checkbox--border-color` (+ variants) | `var(--np--border-color--{variant})` |
| `--np--checkbox--border-radius` (+ variants) | `var(--np--border-radius--{variant})` |
| `--np--checkbox--border-width` (+ variants) | `var(--np--border-width--{variant})` |
| `--np--checkbox--icon--color` | `var(--np--color--inverse)` |
| `--np--checkbox--icon--size` (+ size variants) | `14px` (`10px`–`20px`) |
| `--np--checkbox--disabled-opacity` | `0.5` |
| `--np--checkbox--focus-ring--width` / `--color` / `--offset` | `var(--np--border-width--large)` / `var(--np--color--link)` / `var(--np--gap--smaller)` |

Docs: @niceprototypes/storybook → Components → Forms → Checkbox.
