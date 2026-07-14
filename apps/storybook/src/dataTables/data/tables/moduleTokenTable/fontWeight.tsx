import Typography from "../../../../nice/Typography"
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
    <Typography weight={variant}>
      {variant.charAt(0).toUpperCase() + variant.slice(1)}
    </Typography>
  ),
} satisfies TokenTable
