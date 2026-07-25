import { getToken } from "nice-react-styles"
import Flex from "nice-react-flex"
import Ink from "../../../../nice/Ink"
import type { TokenTable } from "./types"

export const letterSpacing = {
  name: "letterSpacing",
  description: (
    <>
      Horizontal tracking tokens — letter spacing from <code>tight</code> to{" "}
      <code>wider</code>.
    </>
  ),
  variants: ["tight", "base", "wide", "wider"],
  // letter-spacing is inherited, so set it on the wrapper and let it cascade to
  // the Ink text.
  preview: (variant) => (
    <Flex style={{ letterSpacing: getToken("letterSpacing", variant) }}>
      <Ink>Letterspacing</Ink>
    </Flex>
  ),
} satisfies TokenTable
