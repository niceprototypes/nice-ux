import { getToken } from "nice-react-styles"
import Typography from "../../../../nice/Typography"
import { demoFont } from "../../constants"
import type { TokenTable } from "./types"

export const color = {
  name: "color",
  description: (
    <>
      Text and icon color tokens, including semantic states (<code>success</code>,{" "}
      <code>highlight</code>, <code>warning</code>, <code>error</code>).
    </>
  ),
  variants: ["lightest", "lighter", "light", "base", "disabled", "link", "success", "highlight", "warning", "error"],
  // Each token's name, rendered in the demo font and the token's own color, so
  // the name reads in the color while demonstrating the custom fontFamily. The
  // color comes from the color *module* (via getToken) applied as an inline
  // style — not Typography's `color` prop, which resolves through the typography
  // component tokens and would throw on module-only variants like `highlight`.
  preview: (variant) => (
    <Typography size="larger" style={{ color: getToken("color", variant), fontFamily: demoFont }}>
      {variant.charAt(0).toUpperCase() + variant.slice(1)}
    </Typography>
  ),
} satisfies TokenTable
