import Icon from "nice-react-icon"
import Typography from "../../nice/Typography"
import type { IconGridProps } from "./IconGrid.types"
import Flex from "nice-react-flex"

const IconGrid = ({ icons }: IconGridProps) => {
  return (
    <Flex
      direction="column"
      gap="larger"
      wrap="wrap"
      justifyContent="center"
    >
      {icons.map(({ name }) => (
        <Flex
          key={name}
          gap="base"
          alignItems="center"
        >
          <Icon
            strokeScaling={true}
            name={name}
            size="larger"
          />
          <Typography code weight="medium">{name}</Typography>
        </Flex>
      ))}
    </Flex>
  )
}

export default IconGrid
