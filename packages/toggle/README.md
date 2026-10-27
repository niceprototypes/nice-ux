# @niceprototypes/toggle

An on/off switch. It renders a native `<input type="checkbox" role="switch">` inside a
`<label>`; the checkbox is invisible but stays the focus target and keyboard handler (Space
toggles), and a track and thumb are drawn in its place. Clicking the label text toggles too.

## Install

```sh
npm install @niceprototypes/toggle
```

Peer dependencies: `@niceprototypes/field`, `@niceprototypes/styles`, `react`, `react-dom`, `styled-components`.

## Usage

```tsx
import Toggle from "@niceprototypes/toggle"

// Uncontrolled, with a visible label
<Toggle defaultChecked>Notifications</Toggle>

// Controlled, with no visible label: pass aria-label
const [hidden, setHidden] = useState(false)
<Toggle checked={hidden} onChange={setHidden} aria-label="Hidden" />

<Toggle size="small" disabled>Sync</Toggle>
```

## Props

| Prop | Type | Default | |
|---|---|---|---|
| `checked` | `boolean` | | On/off value (controlled) |
| `defaultChecked` | `boolean` | | Initial value (uncontrolled) |
| `onChange` | `(checked: boolean, event: ChangeEvent<HTMLInputElement>) => void` | | New value first, then the native event |
| `disabled` | `boolean` | `false` | |
| `size` | `smaller`, `small`, `base`, `large`, `larger` | `base` | Track and thumb size |
| `children` | `ReactNode` | | Visible label next to the switch |
| `aria-label` | `string` | | Accessible name when there are no `children` |
| `aria-labelledby` | `string` | | id(s) of the element(s) that name the switch |
| `id`, `name` | `string` | | Forwarded to the native checkbox |
| `ref` | `Ref<HTMLInputElement>` | | Ref to the native checkbox (React 19 ref-as-prop) |
| `className` | `string` | | Applied to the root `<label>` |
| `theme` | `ThemeType` | | Pins token resolution to a theme |

Inside a `Field` (@niceprototypes/field), the native checkbox takes the Field's `id` (unless `id`
is passed), so the Field label names it; it is described by the Field's description and error
(`aria-describedby`), and takes `aria-invalid="true"` and `required` from the Field's `invalid`
and `required`.

```tsx
<Field label="Notifications" description="Sent by email.">
  <Toggle defaultChecked />
</Field>
```

A `checked` Toggle with no `onChange` is read-only.

## Tokens

All from `@niceprototypes/styles` (`src/tokens/components/toggle.json`); override any of them on an
ancestor to restyle Toggle without props.

| Token | Default |
|---|---|
| `--np--toggle--track--width` (+ size variants) | `40px` (`28px`–`56px`) |
| `--np--toggle--track--height` (+ size variants) | `22px` (`16px`–`30px`) |
| `--np--toggle--track--background-color` | `var(--np--border-color--strong)` |
| `--np--toggle--track--background-color--checked` | `var(--np--color--link)` |
| `--np--toggle--thumb--size` (+ size variants) | `18px` (`12px`–`26px`) |
| `--np--toggle--thumb--background-color` | `var(--np--background-color)` |
| `--np--toggle--gap` | `var(--np--gap--small)` (between switch and label) |
| `--np--toggle--disabled-opacity` | `0.5` |
| `--np--toggle--transition-duration` | `var(--np--animation-duration--fast)`; no transition under `prefers-reduced-motion` |
| `--np--toggle--focus-ring--width` / `--color` / `--offset` | `var(--np--border-width--large)` / `var(--np--color--link)` / `var(--np--gap--smaller)` |

Docs: @niceprototypes/storybook → Components → Forms → Toggle.
