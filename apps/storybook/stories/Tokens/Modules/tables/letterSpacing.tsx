import Flex from "nice-react-flex"
import { getToken } from "nice-react-styles"
import Typography from "../../../../src/nice/Typography"
import type { TokenTable } from "../TokenTable.types"

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
  // the Typography text.
  preview: (variant) => (
    <Flex style={{ letterSpacing: getToken("letterSpacing", variant) }}>
      <Typography>Letterspacing</Typography>
    </Flex>
  ),
} satisfies TokenTable
