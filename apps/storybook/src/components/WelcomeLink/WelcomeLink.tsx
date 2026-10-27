import * as React from "react"
import { navigate } from "@storybook/addon-links"
import Icon from "@niceprototypes/icon"
import Flex from "@niceprototypes/flex"
import Ink from "../../nice/Ink"
import { ArrowIcon, WelcomeLinkDiv } from "./WelcomeLink.styles"
import type { WelcomeLinkProps } from "./WelcomeLink.types"

const WelcomeLink: React.FC<WelcomeLinkProps> = ({
  storyId,
  iconName,
  title,
  children,
  stripped,
}) => {
  const go = () => navigate({ storyId })

  return (
    <WelcomeLinkDiv
      $stripped={stripped}
      role="link"
      tabIndex={0}
      onClick={go}
      onKeyDown={e => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault()
          go()
        }
      }}
    >
      <Flex
        gap={stripped ? "base" : "large"}
        padding={stripped ? "none" : "large"}
      >
        <Icon
          name={iconName}
          size="larger"
          strokeScaling
        />
        <Flex
          grow={1}
          alignItems="center"
          gap="large"
        >
          <Flex
            grow={1}
            direction="column"
            gap="smaller"
          >
            <Ink
              color="base"
              as="h3"
              size="large"
              weight="semibold"
            >
              {title}
            </Ink>
            <Ink>{children}</Ink>
          </Flex>
          <ArrowIcon name="arrow-right" />
        </Flex>
      </Flex>
    </WelcomeLinkDiv>
  )
}

export default WelcomeLink
