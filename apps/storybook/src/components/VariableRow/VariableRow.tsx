import React from "react"
import Typography from "nice-react-typography"
import { CellFlex } from "./styles"
import { VariableRowProps } from "./types"
import Flex from "nice-react-flex"

const VariableRow: React.FC<VariableRowProps> = ({
  name,
  description,
  demo,
  label,
  value,
}) => {
  return (
    <Flex alignItems="center" gap="base">
      <CellFlex direction="column" $width="20em">
        <Flex>
          {label && (
            <Typography as="span" code color="lighter">
              {label}=
            </Typography>
          )}
          <Typography as="span" code weight="medium">
            {name}
          </Typography>
        </Flex>
        {description && (
          <Typography code color="light" size="small">
            {description}
          </Typography>
        )}
      </CellFlex>
      <CellFlex grow={1} alignItems="center" gap="base">
        {demo}
        {value && (
          <Typography code as="span" color="light" size="small">
            {value}
          </Typography>
        )}
      </CellFlex>
    </Flex>
  )
}

export default VariableRow
