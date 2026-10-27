# nice-react-logo

The Nice Prototypes logo: the crystal heart illustration (`nice-heart` from
`nice-react-icon`) and the logo name, side by side. `height` sets the height, by default the
responsive `logo.height` token; the name is `nameHeightScale` of it (60% by default) and the widths follow from the pieces' SVG viewBoxes. The name is filled with
the theme's base text color, so it reads on light and dark backgrounds; the heart keeps its
own colors in every theme.

## Install

```sh
npm install nice-react-logo
```

Peer dependencies: `nice-react-icon`, `nice-react-styles`, `react`, `react-dom`, `styled-components`.

## Usage

```tsx
import Logo from "nice-react-logo"

<Logo />
<Logo height={32} />
<Logo theme="night" />
<Logo showName={false} /> // the heart alone
<Logo aria-label="Nice Prototypes home" />
```

## Props

| Prop | Type | Default | |
|---|---|---|---|
| `height` | `number` (pixels) | `logo.height` token (64px phone, 56px tablet, 48px laptop+) | Height of the logo; the width follows |
| `showName` | `boolean` | `true` | Show the name beside the heart |
| `nameHeightScale` | `number` | `0.6` | The name's height as a fraction of the logo's height |
| `gap` | `number` (pixels) | `4` | Space between the heart and the name |
| `aria-label` | `string` | `"Nice Prototypes"` | Accessible name; the logo renders as one image (`role="img"`) |
| `theme` | `ThemeType` | | Pins token resolution to a theme: the name takes that theme's base text color |

## Tokens

All from `nice-styles` (`src/tokens/components/logo.json`); override any of them on an
ancestor to restyle Logo without props.

| Token | Default |
|---|---|
| `--np--logo--height` | `64`; `56` from tablet, `48` from laptop (unitless pixels) |
| `--np--logo--color` | `var(--np--color)`: the name's fill |

Docs: nice-storybook → Components → Logo.
