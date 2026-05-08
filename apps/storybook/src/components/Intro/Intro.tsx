import * as React from "react"
import Icon from "nice-react-icon"
import Flex from "nice-react-flex"
import Typography from "../../nice/Typography"
import { TitleAnchor, DescriptionAnchor } from "./Intro.styles"

type Props = {
  href: string
  iconName: string
  title: string
  children: React.ReactNode
}

const Intro: React.FC<Props> = ({ href, iconName, title, children }) => (
  <Flex direction="column" gap="small">
    <TitleAnchor href={href}>
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
          as="span"
          color="link"
          size="large"
          weight="medium"
        >
          <span>{title}</span>
        </Typography>
      </Flex>
    </TitleAnchor>
    <DescriptionAnchor>
      <Typography as="span" size="base">{children}</Typography>
    </DescriptionAnchor>
  </Flex>
)

export default Intro
