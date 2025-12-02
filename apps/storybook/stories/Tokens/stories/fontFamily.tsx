import Typography from "nice-react-typography"
import { createToken } from "../services/createToken.tsx"

export const prepareFontFamily = () =>
  createToken(
    "fontFamily",
    [
      { name: "heading", weight: "bold", text: "Heading" },
      { name: "base", text: "Body" },
      { name: "code", code: true, text: "Code" },
    ],
    ({ size, weight, code, text }: any) => (
      <Typography size={size} weight={weight} code={code}>
        {text}
      </Typography>
    )
  )
