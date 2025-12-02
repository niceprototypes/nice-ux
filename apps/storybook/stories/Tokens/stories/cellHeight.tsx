import { getToken } from "nice-styles"
import { createToken } from "../services/createToken.tsx"
import Flex from "nice-react-flex"

export const prepareCellHeight = () =>
  createToken(
    "cellHeight",
    ["smaller", "small", "base", "large", "larger"],
    variant => (
      <Flex
        style={{
          width: getToken("cellHeight", "larger").var,
          height: getToken("cellHeight", variant).var,
          border: `${getToken("borderWidth").var} solid ${getToken("foregroundColor", "light").var}`,
          borderRadius: getToken("cellHeight", "smaller").var,
        }}
      />
    )
  )
