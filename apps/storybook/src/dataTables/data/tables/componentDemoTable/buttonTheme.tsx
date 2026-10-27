import Button from "@niceprototypes/button"
import type { ComponentExample } from "../../../components/demos/Components"
import Flex from "@niceprototypes/flex"
import { Theme, getToken } from "@niceprototypes/styles"
import { cap } from "../../../utilities"

export const buttonTheme = {
  name: "theme",
  description:
    "Pins token resolution to a theme instead of following the media query. Each preview sits on its theme's base background.",
  variants: ["day", "night"],
  default: "day",
  preview: (variant) => (
    <Theme name={variant}>
      <Flex padding="small" style={{ backgroundColor: getToken("backgroundColor", "base") }}>
        <Button onClick={() => {}} theme={variant}>
          {cap(variant)}
        </Button>
      </Flex>
    </Theme>
  ),
  code: (variant) => `<Button theme="${variant}" />`,
} satisfies ComponentExample
