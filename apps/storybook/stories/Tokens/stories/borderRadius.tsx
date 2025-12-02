import { getToken } from "nice-styles"
import Flex from "nice-react-flex"
import { createToken } from "../services/createToken.tsx"

export const prepareBorderRadius = () =>
  createToken(
    "borderRadius",
    ["smaller", "small", "base", "large", "larger"],
    variant => (
      <Flex
        style={{
          borderRadius: getToken("borderRadius", variant).var,
          width: getToken("cellHeight", "larger").var,
          height: getToken("cellHeight", "larger").var,
          border: `${getToken("borderWidth").var} solid ${getToken("foregroundColor", "light").var}`,
        }}
      />
    )
  )
