import React from "react"
import Typography from "../../nice/Typography"
import { CellFlex } from "./VariableRow.styles"
import { VariableRowProps } from "./VariableRow.types"
import Flex from "nice-react-flex"
import CodeBlock from "../CodeBlock"

// Normalize legacy code-string syntax: literal "\n" → newline, "+N" prefix → N*2 spaces
const normalizeCode = (input: string): string =>
  input
    .replace(/\\n/g, "\n")
    .replace(/^\+(\d+)/gm, (_, n) => " ".repeat(parseInt(n, 10) * 2))

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
        spacing="base none"
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
          <Typography code weight="medium" color="base" size="smaller">
            {description}
          </Typography>
        )}
      </CellFlex>
      <CellFlex
        grow={1}
        alignItems="center"
        $width="18rem"
        spacing="base none"
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
        <CellFlex alignItems="center" $width="18rem" spacing="base none">
          <CodeBlock language="tsx" padded={false} bordered={false}>{normalizeCode(code)}</CodeBlock>
        </CellFlex>
      )}
    </Flex>
  )
}

export default VariableRow
