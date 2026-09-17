import { getToken } from "nice-react-styles"
import Ink from "../../../../nice/Ink"
import PreviewCell from "../../../../components/PreviewCell"
import ThemeSplit from "../../../../components/ThemeSplit"
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
  // style — not Ink's `color` prop, which resolves through the ink
  // component tokens and would throw on module-only variants like `highlight`.
  //
  // Split day | night, both pinned. Text colour alone is not enough: a
  // night-pinned colour on a day-lit cell is near-white on near-white, so each
  // half carries its own pinned surface behind the sample.
  preview: (variant) => (
    <ThemeSplit
      render={theme => (
        <PreviewCell
          backgroundColor={getToken("backgroundColor", "base", { theme })}
          borderColor={getToken("borderColor", "base", { theme })}
          height={getToken("size", "large")}
          borderRadius={getToken("borderRadius", "small")}
          style={{ alignItems: "center", justifyContent: "center" }}
        >
          <Ink style={{ color: getToken("color", variant, { theme }), fontFamily: demoFont }}>
            {variant.charAt(0).toUpperCase() + variant.slice(1)}
          </Ink>
        </PreviewCell>
      )}
    />
  ),
} satisfies TokenTable
