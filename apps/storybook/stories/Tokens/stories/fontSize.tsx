import Typography from "nice-react-typography"
import { createToken } from "../services/createToken.tsx"

export const prepareFontSize = () =>
  createToken(
    "fontSize",
    ["smaller", "small", "base", "large", "larger"],
    variant => (
      <Typography size={variant as any}>
        {variant.charAt(0).toUpperCase() + variant.slice(1)}
      </Typography>
    )
  )
