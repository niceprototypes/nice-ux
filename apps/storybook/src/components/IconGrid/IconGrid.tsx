import Icon from "nice-react-icon"
import Typography from "../../nice/Typography"
import { CellFlex } from "./IconGrid.styles"
import type { IconGridProps } from "./IconGrid.types"
import Flex from "nice-react-flex"

const IconGrid = ({ icons }: IconGridProps) => {
  return (
    <Flex
      gap="base"
      wrap="wrap"
      justifyContent="center"
    >
      {icons.map(({ name }) => (
        <CellFlex
          key={name}
          gap="base"
          direction="column"
          alignItems="center"
        >
          <Icon
            name={name}
            size="larger"
            strokeWidth="large"
          />
          <Typography
            code
            size="small"
            weight="medium"
          >
            {name}
          </Typography>
        </CellFlex>
      ))}
    </Flex>
  )
}

export default IconGrid
