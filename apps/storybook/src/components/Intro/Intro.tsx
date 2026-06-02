import * as React from "react"
import { navigate } from "@storybook/addon-links"
import Icon from "nice-react-icon"
import Flex from "nice-react-flex"
import Typography from "../../nice/Typography"
import { IntroDiv } from "./Intro.styles"

type Props = {
  storyId: string
  iconName: string
  title: string
  children: React.ReactNode
}

const Intro: React.FC<Props> = ({ storyId, iconName, title, children }) => {
  // Select the target story via the Storybook channel — avoids the full app
  // reload that window.open(href, "_top") forced.
  const go = () => navigate({ storyId })

  return (
    <IntroDiv
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
        <Flex alignItems="center" gap="smaller">
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
            size="large"
            weight="medium"
          >
            {title}
          </Typography>
        </Flex>
        <Typography as="span" size="small">
          {children}
        </Typography>
      </Flex>
    </IntroDiv>
  )
}

export default Intro
