import Ink from "../../../../nice/Ink"
import type { TokenTable } from "./types"

export const fontWeight = {
  name: "fontWeight",
  description: (
    <>
      Font thickness tokens from <code>light</code> (300) to <code>black</code> (900).
    </>
  ),
  variants: ["light", "base", "medium", "semibold", "bold", "extrabold", "black"],
  preview: (variant) => (
    <Ink weight={variant}>
      {variant.charAt(0).toUpperCase() + variant.slice(1)}
    </Ink>
  ),
} satisfies TokenTable
