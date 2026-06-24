import Typography from "../../../../src/nice/Typography"
import type { TokenTable } from "../TokenTable.types"

const loremIpsum =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit."

export const lineHeight = {
  name: "lineHeight",
  description: (
    <>
      Vertical spacing tokens between lines of text — <code>single</code>,{" "}
      <code>condensed</code>, <code>base</code>, <code>expanded</code>.
    </>
  ),
  variants: ["single", "condensed", "base", "expanded"],
  preview: (variant) => (
    <Typography lineHeight={variant}>{loremIpsum}</Typography>
  ),
} satisfies TokenTable