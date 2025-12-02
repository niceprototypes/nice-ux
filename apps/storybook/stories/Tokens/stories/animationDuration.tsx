import { getToken } from "nice-styles"
import Flex from "nice-react-flex"
import { createToken } from "../services/createToken.tsx"

export const prepareAnimationDuration = () =>
  createToken(
    "animationDuration",
    [
      {
        name: "base",
        backgroundColor: getToken("foregroundColor", "error").var,
      },
      {
        name: "slow",
        backgroundColor: getToken("foregroundColor", "warning").var,
      },
    ],
    ({ name, backgroundColor }: any) => {
      const animationName = name === "base" ? "slide" : "slideSlow"
      return (
        <Flex
          style={{
            width: "120px",
            backgroundColor: getToken("backgroundColor", "alternate").var,
            borderRadius: `calc(${getToken("cellHeight", "smaller").var} / 2)`,
          }}
        >
          <Flex
            style={{
              backgroundColor,
              width: getToken("cellHeight", "smaller").var,
              height: getToken("cellHeight", "smaller").var,
              borderRadius: `calc(${getToken("cellHeight", "smaller").var} / 2)`,
              animation: `${animationName} calc(${getToken("animationDuration", name).var} * 6) ${getToken("animationEasing").var} infinite`,
              animationDelay: name === "base" ? getToken("animationDuration", name).var : 0,
            }}
          />
        </Flex>
      )
    }
  )
