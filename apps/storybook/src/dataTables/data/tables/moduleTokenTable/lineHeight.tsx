import Ink from "../../../../nice/Ink"
import { loremIpsum } from "../../constants"
import type { TokenTable } from "./types"

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
    <Ink lineHeight={variant}>{loremIpsum}</Ink>
  ),
} satisfies TokenTable
