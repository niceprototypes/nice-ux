import { getToken } from "nice-styles"
import Flex, { GapSize } from "nice-react-flex"
import { createToken } from "../services/createToken.tsx"

export const prepareBoxShadow = () =>
  createToken(
    "boxShadow",
    [{ name: "base" }, { name: "large" }],
    ({ name }: any) => (
      <Flex
        spacing={{ sm: { all: "large" as GapSize } }}
        style={{
          backgroundColor: getToken("backgroundColor", "alternate").var,
          borderRadius: `calc(${getToken("cellHeight", "smaller").var} / 2)`,
        }}
      >
        <Flex
          style={{
            backgroundColor: getToken("backgroundColor").var,
            width: getToken("cellHeight", "larger").var,
            height: getToken("cellHeight", "larger").var,
            borderRadius: getToken("borderRadius", "small").var,
            boxShadow: getToken("boxShadow", name).var,
          }}
        />
      </Flex>
    )
  )
