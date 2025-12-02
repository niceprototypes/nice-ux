import Typography from "nice-react-typography"
import { createToken } from "../services/createToken.tsx"

export const prepareFontWeight = () =>
  createToken(
    "fontWeight",
    ["light", "base", "medium", "semibold", "bold", "extrabold", "black"],
    variant => (
      <Typography weight={variant}>
        {variant.charAt(0).toUpperCase() + variant.slice(1)}
      </Typography>
    )
  )
