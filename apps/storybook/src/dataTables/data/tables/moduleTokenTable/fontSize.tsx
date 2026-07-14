import Typography from "../../../../nice/Typography"
import type { TokenTable } from "./types"

export const fontSize = {
  name: "fontSize",
  description: (
    <>
      Text scale tokens from <code>smaller</code> to <code>larger</code>.
      Responsive by default — values change at the laptop breakpoint.
    </>
  ),
  variants: ["smaller", "small", "base", "large", "larger"],
  preview: (variant) => (
    <Typography size={variant}>
      {variant.charAt(0).toUpperCase() + variant.slice(1)}
    </Typography>
  ),
} satisfies TokenTable
