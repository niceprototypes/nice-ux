import React from "react"
import Typography from "nice-react-typography"
import { CellFlex } from "./styles"
import { VariableRowProps } from "./types"
import Flex from "nice-react-flex"
import CodePreview from "../CodePreview"

const VariableRow: React.FC<VariableRowProps> = ({
  name,
  description,
  demo,
  value,
  code,
  default: isDefault,
}) => {
  return (
    <Flex gap="base">
      <CellFlex direction="column" justifyContent="center" $width="16rem">
        <Flex alignItems="center" gap="small">
          <Typography as="span" code weight="medium">
            {name}
          </Typography>
          {isDefault && (
            <Typography as="span" code weight="medium" color="lighter">
              (default)
            </Typography>
          )}
        </Flex>
        {description && (
          <Typography code color="lighter" size="smaller">
            {description}
          </Typography>
        )}
      </CellFlex>
      <CellFlex grow={1} alignItems="center" $width="18rem" gap="base">
        {demo}
        {value && (
          <Typography code as="span" color="lighter" size="smaller">
            {value}
          </Typography>
        )}
      </CellFlex>
      {code && (
        <CellFlex $width="18rem">
          <Flex direction="column">
            <CodePreview code={code} />
          </Flex>
        </CellFlex>
      )}
    </Flex>
  )
}

export default VariableRow
