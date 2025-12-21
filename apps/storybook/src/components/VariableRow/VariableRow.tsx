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
    <Flex gap="large">
      <CellFlex
        direction="column"
        justifyContent="center"
        $width="16rem"
        spacing={{ vertical: "base" }}
      >
        <Flex alignItems="center" gap="small">
          <Typography as="span" code weight="medium">
            {name}
          </Typography>
        </Flex>
        {isDefault && (
          <Typography code weight="medium" color="light" size="smaller">
            default
          </Typography>
        )}
        {!isDefault && description && (
          <Typography code weight="medium" color="heavy" size="smaller">
            {description}
          </Typography>
        )}
      </CellFlex>
      <CellFlex
        grow={1}
        alignItems="center"
        $width="18rem"
        spacing={{ vertical: "base" }}
        gap="base"
      >
        {demo}
        {value && (
          <Typography code as="span" color="lighter" size="smaller">
            {value}
          </Typography>
        )}
      </CellFlex>
      {code && (
        <CellFlex alignItems="center" $width="18rem" spacing={{ all: "base" }}>
          <CodePreview code={code} />
        </CellFlex>
      )}
    </Flex>
  )
}

export default VariableRow
