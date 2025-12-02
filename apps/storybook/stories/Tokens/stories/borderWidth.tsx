import { getToken } from "nice-styles"
import { createToken } from "../services/createToken.tsx"
import Flex from "nice-react-flex"

export const prepareBorderWidth = () =>
  createToken(
    "borderWidth",
    [{ name: "base" }, { name: "large" }],
    ({ name }: any) => (
      <Flex
        style={{
          width: getToken("cellHeight", "larger").var,
          height: getToken("cellHeight", "larger").var,
          border: `${getToken("borderWidth", name).var} solid ${getToken("foregroundColor", "light").var}`,
          borderRadius: getToken("borderRadius", "small").var,
        }}
      />
    )
  )
