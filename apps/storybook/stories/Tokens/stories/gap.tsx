import { getToken } from "nice-styles"
import DemoDots from "../../../src/components/DemoDots"
import { createToken } from "../services/createToken.tsx"

export const prepareGap = () =>
  createToken(
    "gap",
    ["smaller", "small", "base", "large", "larger"],
    variant => (
      <DemoDots
        gap={variant as any}
        dots={[
          {
            color: getToken("foregroundColor", "error").var,
            width: getToken("cellHeight", "smaller").var,
            height: getToken("cellHeight", "smaller").var,
          },
          {
            color: getToken("foregroundColor", "link").var,
            width: getToken("cellHeight", "smaller").var,
            height: getToken("cellHeight", "smaller").var,
          },
        ]}
      />
    )
  )
