# nice-react-select

Native `<select>` for React, rendered through `nice-react-input`'s field chrome
(`as="select"`) with options, a placeholder option and a chevron. Part of the
Nice Prototypes ecosystem.

v1 is native only: no custom listbox, no `multiple`.

## Install

```bash
npm install nice-react-select
```

Peer dependencies: `react`, `react-dom` (>=19.2), `styled-components` (>=6.1.18).

## Usage

### Options

```tsx
import Select from "nice-react-select"

<Select
  aria-label="Fruit"
  placeholder="Pick a fruit"
  options={[
    { value: "apple", label: "Apple" },
    { value: "banana", label: "Banana", disabled: true },
  ]}
  onChange={(value, event) => setFruit(value)}
/>
```

### Children

```tsx
<Select aria-label="Fruit" defaultValue="kiwi">
  <optgroup label="Stone fruit">
    <option value="peach">Peach</option>
  </optgroup>
  <option value="kiwi">Kiwi</option>
</Select>
```

When both `children` and `options` are given, `children` win.

### Inside a Field

```tsx
import { Field } from "nice-react-field"

<Field label="Fruit" description="Pick one." error={error} invalid={!!error} required>
  <Select options={fruit} />
</Field>
```

Field wiring comes from Input: the label targets the `<select>` id,
`aria-describedby` is ordered `[description, error, consumer]`, and
`aria-invalid` / `required` follow the Field.

## Props

`SelectProps` extends Input's `as="select"` props minus `as` and `end`. Every
inherited prop (`ref`, `onChange`, `status`, `filled`, `size`, `borderRadius`,
`borderWidth`, `width`, `backgroundColor`, `borderColor`, `start`, `className`,
`style`, `theme`, `name`, `id`, `required`, …) passes through to Input unchanged.

| Prop | Type | Notes |
|---|---|---|
| `options` | `ReadonlyArray<{ value: string; label: ReactNode; disabled?: boolean }>` | Rendered as `<option>` in order. A native option renders text only — pass strings |
| `children` | `ReactNode` | Native `<option>` / `<optgroup>`; win over `options` |
| `placeholder` | `string` | First `<option value="" disabled hidden>`. Shown while the value is `""`; selected initially when neither `value` nor `defaultValue` is set. Not pickable from the list; a controlled select returns to it with `value=""` |
| `value` / `defaultValue` | `string` | Controlled / uncontrolled value |
| `onChange` | `(value: string, event) => void` | From Input |
| `ref` | `Ref<HTMLSelectElement>` | The native `<select>` |
| `size` | `SizeType` | Field chrome and chevron size. Default `"base"` |
| `status` | `InputStatusType` | `"disabled"` disables the select and dims the chevron (`color:disabled`) |
| `className`, `theme`, `breakpoints` | | Standard. `className` lands on Input's wrapper; `theme` is applied by Input around the whole field |

The chevron (`carat-bottom` icon) sits in Input's `end` slot, `aria-hidden`,
with `pointer-events: none`.

## Tokens

`select.chevron.size:{size}` — chevron size per `size`. The chrome uses Input's
tokens.

## License

MIT
