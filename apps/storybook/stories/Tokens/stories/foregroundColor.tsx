import { getToken } from "nice-styles"
import Flex from "nice-react-flex"
import { createToken } from "../services/createToken.tsx"

export const prepareForegroundColor = () =>
  createToken(
    "foregroundColor",
    [
      "lighter",
      "light",
      "medium",
      "heavy",
      "base",
      "disabled",
      "link",
      "success",
      "warning",
      "error",
    ],
    variant => (
      <Flex
        style={{
          width: getToken("cellHeight", "smaller").var,
          height: getToken("cellHeight", "smaller").var,
          backgroundColor: getToken("foregroundColor", variant).var,
          borderRadius: "50%",
        }}
      />
    )
  )
