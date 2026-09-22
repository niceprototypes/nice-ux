import * as React from "react"
import Button from "nice-react-button"
import styled from "styled-components"
import Icon from "nice-react-icon"
import Input from "nice-react-input"
import Image from "nice-react-image"
import Tile from "nice-react-tile"
import Ink from "../../../../nice/Ink"
import { getToken, type SizeType } from "nice-react-styles"
import OverrideExample from "../../../../components/OverrideExample"
import type { ComponentPrefixWithTokens, ExampleConfig, OverrideConfig } from "./Components.types"

/**
 * Live-component examples for the component token tables (each
 * Components/{Name}/Tokens page) — the analogue of the
 * bespoke preview cell in the Tokens pages. Each row shows a minimal instance of
 * the real component with ONLY the row's token varied.
 *
 * Two paths produce a cell:
 *
 * 1. **Dedicated prop** (`CONFIGS`) — the component exposes a scalar prop for the
 *    token group, so the row is demoed by setting that prop.
 * 2. **Style override** (`OVERRIDES`) — the token has no dedicated prop, so the
 *    row is demoed by forcing the token's value onto the CSS property it drives,
 *    via `<OverrideExample>` (e.g. Button `spacing` → `padding`). This is a
 *    demo-only visualization, not a real usage pattern.
 *
 * A token group with neither a prop nor an override entry returns `null`,
 * leaving the cell blank — for tokens whose effect isn't isolable on the root
 * element (Icon `animationDuration` on the spinner descendant) or isn't visually
 * demoable (Lightbox `zIndex`).
 */

const CONFIGS: Partial<Record<ComponentPrefixWithTokens, ExampleConfig>> = {
  button: {
    props: {
      size: "size",
      borderRadius: "borderRadius",
      borderWidth: "borderWidth",
      borderColor: "borderColor",
      status: "status",
    },
    render: o => <Button {...(o as any)}>Button</Button>,
  },
  icon: {
    props: { size: "size", color: "color", strokeWidth: "strokeWidth" },
    render: o => <Icon name="check" strokeScaling {...(o as any)} />,
  },
  input: {
    props: {
      size: "size",
      borderRadius: "borderRadius",
      borderWidth: "borderWidth",
      status: "status",
    },
    render: o => <Input placeholder="Text" {...(o as any)} />,
  },
  image: {
    props: {
      borderRadius: "borderRadius",
      borderWidth: "borderWidth",
      borderColor: "borderColor",
      backgroundSize: "backgroundSize",
    },
    render: o => <Image src="https://niceprototypes.com/ui/rasters/og-image.png" alt="" width="64px" height="64px" bordered {...(o as any)} />,
  },
  tile: {
    props: { backgroundColor: "backgroundColor", color: "color" },
    render: o => <Tile title="Title" description="Description" {...(o as any)} />,
  },
  ink: {
    props: { fontSize: "size", fontWeight: "weight", lineHeight: "lineHeight", color: "color" },
    render: o => <Ink {...(o as any)}>Text</Ink>,
  },
}

const OVERRIDES: Partial<Record<ComponentPrefixWithTokens, OverrideConfig>> = {
  button: {
    render: styles => <OverrideExample component={Button} componentStyles={styles}>Button</OverrideExample>,
    // spacing drives the button's horizontal padding (and its icon↔label gap);
    // padding is the clearest single-property demo of the size-keyed scale.
    css: { spacing: value => ({ padding: `0 ${value}` }) },
  },
}

/** Button pinned to a fixed width so the `status` column reads as a uniform swatch
 * set, not ragged label-width buttons. Button has no width prop, so it's set here. */
const StatusButton = styled(Button)`
  width: 10em;
`

/**
 * The example cell for one component-token row: a minimal component instance with
 * only the row's token varied. Dedicated-prop tokens vary via their prop;
 * no-prop tokens force the resolved value onto the property they drive; anything
 * else returns `null` (blank cell).
 */
export function componentExample(
  prefix: ComponentPrefixWithTokens,
  path: string[]
): React.ReactNode | null {
  const variant = path[1]
  if (variant === undefined) return null

  // Button's `icon.size` rows have no scalar prop: demo each with an icon-only
  // button — a plus glyph in a square (isSquare: one icon, no label) button,
  // `borderRadius="rounded"` giving a 1:1 circle with the glyph centered — sized
  // by the button `size`, so the column reads as an increasing-size progression.
  // Only `icon.size` (not `icon.color`, a different axis) gets the demo.
  if (prefix === "button" && path[0] === "icon" && path[1] === "size") {
    return <Button iconLeft="plus" borderRadius="rounded" size={path[2] as SizeType} />
  }

  // Button `status` rows render at a fixed 10em width (via styled(Button), no
  // width prop) so the status column is a uniform set. path[1] is the status type.
  if (prefix === "button" && path[0] === "status") {
    return <StatusButton status={path[1] as any}>Button</StatusButton>
  }

  const config = CONFIGS[prefix]

  // 1. Dedicated-prop path: vary the token via its matching scalar prop.
  const prop = config?.props[path[0]]
  if (config && prop) {
    return variant === "base" ? config.render({}) : config.render({ [prop]: variant })
  }

  // 2. Style-override path: a token with no prop — force its resolved value onto
  //    the CSS property it drives. getToken resolves `base` (unsuffixed) correctly,
  //    and path comes from real token data so every variant here is registered.
  const override = OVERRIDES[prefix]
  const buildCss = override?.css[path[0]]
  if (override && buildCss) {
    return override.render(buildCss(getToken(`${prefix}.${path[0]}:${variant}`)))
  }

  return null
}