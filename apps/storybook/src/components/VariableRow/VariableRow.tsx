import React from "react"
import Typography from "nice-react-typography"
import CodePreview from "../CodePreview"
import { CellFlex, SpacerSpan } from "./styles"
import { VariableRowProps } from "./types"
import Flex from "../../../../nice-react-flex"

const VariableRow: React.FC<VariableRowProps> = ({ name, value, demo, code, spacer = true }) => {
  return (
    <Flex>
      <CellFlex direction="column" justifyContent="center" grow={1}>
        <Typography as="span" code>
          {name}
        </Typography>
        <Typography as="span" code color="var(--foreground-color-lighter)">
          {spacer && <SpacerSpan>--</SpacerSpan>}
          {value}
        </Typography>
      </CellFlex>
      <CellFlex direction="column" justifyContent="center" $width={!!demo ? "50%" : undefined}>
        {demo}
      </CellFlex>
      {code && (
        <CellFlex>
          <CodePreview code={code} inline />
        </CellFlex>
      )}
    </Flex>
  )
}

export default VariableRow