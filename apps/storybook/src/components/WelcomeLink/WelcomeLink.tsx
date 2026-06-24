import * as React from "react"
import { navigate } from "@storybook/addon-links"
import Icon from "nice-react-icon"
import Flex from "nice-react-flex"
import Typography from "../../nice/Typography"
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
      <Flex direction="column" gap="base" spacing="large">
        <Flex alignItems="center" gap="small">
          <Icon
            name={iconName}
            size="larger"
            color="link"
            vendor
            strokeWidth="large"
            strokeScaling
          />
          <Typography
            as="h3"
            color="link"
            size="larger"
            weight="medium"
          >
            {title}
          </Typography>
        </Flex>
        <Typography>
          {children}
        </Typography>
      </Flex>
    </WelcomeLinkDiv>
  )
}

export default WelcomeLink