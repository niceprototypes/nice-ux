import * as React from "react"
import { DocsNavigationContext } from "../DocsNavigation"
import Flex from "@niceprototypes/flex"
import Ink from "../../nice/Ink"
import { ArrowIcon, LeadIcon, WelcomeLinkDiv } from "./WelcomeLink.styles"
import type { WelcomeLinkProps } from "./WelcomeLink.types"

const WelcomeLink: React.FC<WelcomeLinkProps> = ({
  storyId,
  iconName,
  title,
  children,
  stripped,
}) => {
  const navigate = React.useContext(DocsNavigationContext)
  const go = () => navigate(storyId)

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
        <LeadIcon
          name={iconName}
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
