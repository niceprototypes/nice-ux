import * as React from "react"
import { navigate } from "@storybook/addon-links"
import Icon from "nice-react-icon"
import Flex from "nice-react-flex"
import Ink from "../../nice/Ink"
import { WelcomeLinkDiv } from "./WelcomeLink.styles"

type Props = {
  storyId: string
  iconName: string
  title: string
  children: React.ReactNode
}

const WelcomeLink: React.FC<Props> = ({ storyId, iconName, title, children }) => {
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
      <Flex gap="large" padding="large">
        <Icon
          name={iconName}
          size="larger"
          vendor
          strokeWidth="large"
          strokeScaling
        />
        <Flex direction="column" gap="smaller">
          <Ink
            color="base"
            as="h3"
            size="large"
            weight="medium"
          >
            {title}
          </Ink>
          <Ink>
            {children}
          </Ink>
        </Flex>
      </Flex>
    </WelcomeLinkDiv>
  )
}

export default WelcomeLink