import Icon from "nice-react-icon"
import Ink from "../../nice/Ink"
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
          <Ink code>{name}</Ink>
        </Flex>
      ))}
    </Flex>
  )
}

export default IconGrid
