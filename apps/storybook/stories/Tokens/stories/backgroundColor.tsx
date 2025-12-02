import { getToken } from "nice-styles"
import { createToken } from "../services/createToken.tsx"
import Flex from "nice-react-flex"

export const prepareBackgroundColor = () =>
  createToken(
    "backgroundColor",
    [
      { name: "base", backgroundColor: getToken("backgroundColor").var },
      {
        name: "alternate",
        backgroundColor: getToken("backgroundColor", "alternate").var,
      },
    ],
    ({ backgroundColor }: any) => (
      <Flex
        style={{
          backgroundColor,
          width: getToken("cellHeight", "larger").var,
          height: getToken("cellHeight", "larger").var,
          border: `${getToken("borderWidth").var} solid ${getToken("borderColor").var}`,
          borderRadius: getToken("borderRadius", "small").var,
        }}
      />
    )
  )
