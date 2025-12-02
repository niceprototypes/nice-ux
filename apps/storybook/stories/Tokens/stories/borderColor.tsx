import { getToken } from "nice-styles"
import { createToken } from "../services/createToken.tsx"
import Flex from "nice-react-flex"

export const prepareBorderColor = () =>
  createToken("borderColor", ["base", "heavy", "heavier"], variant => (
    <Flex
      style={{
        backgroundColor: "white",
        width: getToken("cellHeight", "larger").var,
        height: getToken("cellHeight", "larger").var,
        border: `${getToken("borderWidth").var} solid ${getToken("borderColor", variant).var}`,
        borderRadius: getToken("borderRadius", "small").var,
      }}
    />
  ))
