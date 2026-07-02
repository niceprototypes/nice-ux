import * as React from "react"
import Button from "nice-react-button"
import Icon from "nice-react-icon"
import Input from "nice-react-input"
import Image from "nice-react-image"
import Tile from "nice-react-tile"
import Typography from "nice-react-typography"
import type { ComponentPrefixWithTokens } from "./componentTokens"

/**
 * Live-component examples for the Tokens/Components tables — the analogue of the
 * bespoke preview cell in Tokens/Modules. Each row shows a minimal instance of
 * the real component with ONLY the row's token varied, via the matching prop
 * (e.g. Button `size` → `<Button size="large">`); the `base` variant renders the
 * bare component so the column reads as "this token, at each step".
 *
 * A token group maps to an example only when the component exposes a scalar prop
 * for it. Groups that have no such prop — Button/Input `spacing`, Icon
 * `animationDuration`, Image `objectFit`, Typography `fontFamily`/`letterSpacing`/
 * `maxWidth`, Lightbox `zIndex`, Form `gap` — return `null`, leaving the cell
 * empty (there is no single prop that varies just that token).
 */

/** The prop override for one example; values come from token data, so typing is loose. */
type Overrides = Record<string, string>

interface ExampleConfig {
  /** token group name → the component prop that varies it */
  props: Record<string, string>
  /** render the component with the given prop override (empty object = base) */
  render: (override: Overrides) => React.ReactNode
}

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
    render: o => <Image src="/rasters/og-image.png" alt="" width="64px" height="64px" bordered {...(o as any)} />,
  },
  tile: {
    props: { backgroundColor: "backgroundColor", color: "color" },
    render: o => <Tile title="Title" description="Description" {...(o as any)} />,
  },
  typography: {
    props: { fontSize: "size", fontWeight: "weight", lineHeight: "lineHeight", color: "color" },
    render: o => <Typography {...(o as any)}>Text</Typography>,
  },
}

/**
 * The example cell for one component-token row: a minimal component instance with
 * only the row's token varied via its matching prop. The relevant variant is the
 * first path segment after the group (`["size","large"]` → `large`;
 * `["status","primary",…]` → `primary`); `base` renders the bare component.
 * Returns `null` when the component (or this group) has no scalar prop — the
 * cell is left blank.
 */
export function componentExample(
  prefix: ComponentPrefixWithTokens,
  path: string[]
): React.ReactNode | null {
  const config = CONFIGS[prefix]
  if (!config) return null

  const prop = config.props[path[0]]
  if (!prop) return null

  const variant = path[1]
  if (variant === undefined) return null

  return variant === "base" ? config.render({}) : config.render({ [prop]: variant })
}
