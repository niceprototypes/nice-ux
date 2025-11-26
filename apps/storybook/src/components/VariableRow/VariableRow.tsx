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
  label,
  value,
  code,
}) => {
  return (
    <Flex alignItems="center" gap="base">
      <CellFlex direction="column" $width="16rem">
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
          <Typography code color="lighter" size="smaller">
            {description}
          </Typography>
        )}
      </CellFlex>
      <CellFlex grow={1} alignItems="center" gap="base">
        {demo}
        {value && (
          <Typography code as="span" color="lighter" size="smaller">
            {value}
          </Typography>
        )}
      </CellFlex>
      {code && (
        <CellFlex $width="24rem">
          <CodePreview code={code} />
        </CellFlex>
      )}
    </Flex>
  )
}

export default VariableRow
