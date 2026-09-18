import * as React from "react"
import { navigate } from "@storybook/addon-links"
import Icon from "nice-react-icon"
import Flex from "nice-react-flex"
import Ink from "../../nice/Ink"
import { ArrowIcon, WelcomeLinkDiv } from "./WelcomeLink.styles"
import type { WelcomeLinkProps } from "./WelcomeLink.types"

const WelcomeLink: React.FC<WelcomeLinkProps> = ({
  storyId,
  iconName,
  title,
  children,
}) => {
  const go = () => navigate({ storyId })

  return (
    <WelcomeLinkDiv
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
        gap="large"
        padding="large"
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
