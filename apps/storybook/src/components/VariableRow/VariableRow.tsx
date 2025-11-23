import React from "react"
import Typography from "nice-react-typography"
import CodePreview from "../CodePreview"
import { CellFlex } from "./styles"
import { VariableRowProps } from "./types"
import Flex from "../../../../nice-react-flex"

const VariableRow: React.FC<VariableRowProps> = ({ name, description, demo, code, label }) => {
  return (
    <Flex>
      <CellFlex alignItems="center" grow={1}>
        <Typography as="span" code>
          {label && <Typography code as="span" color="lighter">{label}=</Typography>}
          {name}
        </Typography>
        {description && <Typography as="span" code color="lighter">{description}</Typography>}
      </CellFlex>
      <CellFlex direction="column" justifyContent="center" $width={!!demo ? "50%" : undefined}>
        {demo}
      </CellFlex>
      {code && (
        <CellFlex>
          <CodePreview code={code} />
        </CellFlex>
      )}
    </Flex>
  )
}

export default VariableRow