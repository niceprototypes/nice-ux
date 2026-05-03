import * as React from "react"
import Icon from "nice-react-icon"
import Flex from "nice-react-flex"
import Typography from "../src/nice/Typography"
import { AnchorStyled } from "./styled"

type Props = {
  href: string
  iconName: string
  children: React.ReactNode
}

const WelcomeLink: React.FC<Props> = ({ href, iconName, children }) => (
  <AnchorStyled href={href}>
    <Flex alignItems="center" gap="smaller">
      <Icon
        name={iconName}
        size="large"
        color="link"
        vendor
        strokeWidth="large"
        strokeScaling
      />
      <Typography
        as="span"
        color="link"
        size="large"
        weight="medium"
      >
        <span>{children}</span>
      </Typography>
    </Flex>
  </AnchorStyled>
)

export default WelcomeLink
