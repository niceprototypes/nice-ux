import React from "react"
import Typography from "nice-react-typography"
import { CellFlex, DefaultFlex } from "./styles"
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
      <CellFlex direction="column" $width="16rem">
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
      <CellFlex $width="18rem" grow={1} gap="base">
        {demo}
        {value && (
          <Typography code as="span" color="lighter" size="smaller">
            {value}
          </Typography>
        )}
      </CellFlex>
      {code && (
        <CellFlex grow={1}>
          <Flex>
            <CodePreview code={code} />
          </Flex>
        </CellFlex>
      )}
    </Flex>
  )
}

export default VariableRow
