import React from "react"
import Typography from "nice-react-typography"
import { CellFlex, OuterFlex, DefaultFlex } from "./styles"
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
    <OuterFlex gap="large">
      <CellFlex direction="column" justifyContent="center" $width="16rem" spacing={{ vertical: "base" }}>
        <Flex alignItems="center" gap="small">
          <Typography as="span" code weight="medium">
            {name}
          </Typography>
          {isDefault && (
            <DefaultFlex justifyContent="center" alignItems="center">
              <Typography as="span" code color="lighter">
                default
              </Typography>
            </DefaultFlex>
          )}
        </Flex>
        {description && (
          <Typography code color="lighter" size="smaller">
            {description}
          </Typography>
        )}
      </CellFlex>
      <CellFlex grow={1} alignItems="center" $width="18rem" spacing={{ vertical: "base" }} gap="base">
        {demo}
        {value && (
          <Typography code as="span" color="lighter" size="smaller">
            {value}
          </Typography>
        )}
      </CellFlex>
      {code && (
        <CellFlex alignItems="center" $code $width="18rem" spacing={{ all: "base" }}>
          <Flex direction="column">
            <CodePreview code={code} />
          </Flex>
        </CellFlex>
      )}
    </OuterFlex>
  )
}

export default VariableRow
