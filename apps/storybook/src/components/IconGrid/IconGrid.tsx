import Icon from "nice-react-icon"
import Typography from "../../nice/Typography"
import { CellFlex, RowFlex } from "./IconGrid.styles"
import type { IconGridProps } from "./IconGrid.types"

const IconGrid = ({ icons }: IconGridProps) => {
  return (
    <RowFlex
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
          >
            {name}
          </Typography>
        </CellFlex>
      ))}
    </RowFlex>
  )
}

export default IconGrid
