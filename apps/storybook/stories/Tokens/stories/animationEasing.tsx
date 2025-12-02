import { getToken } from "nice-styles"
import Flex from "nice-react-flex"
import { createToken } from "../services/createToken.tsx"

export const prepareAnimationEasing = () =>
  createToken("animationEasing", ["base"], () => (
    <Flex
      style={{
        backgroundColor: getToken("backgroundColor", "alternate").var,
        padding: getToken("gap").var,
        borderRadius: getToken("borderRadius").var,
      }}
    >
      <svg width="60" height="24" viewBox="0 0 60 24">
        <path
          d="M 1 23 C 30 23, 30 1, 60 1"
          fill="none"
          stroke={getToken("foregroundColor", "lighter").var}
          strokeWidth={getToken("borderWidth", "large").var}
          strokeLinecap="round"
        />
      </svg>
    </Flex>
  ))
