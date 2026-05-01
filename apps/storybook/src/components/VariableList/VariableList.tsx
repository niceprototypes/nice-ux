import Flex from "nice-react-flex"
import VariableRow from "../VariableRow"
import { VariableListProps } from "./VariableList.types"

const VariableList = ({ variables }: VariableListProps) => {
  return (
    <Flex direction="column">
      {variables.map((variable, index) => (
        <VariableRow
          key={variable.name || `variable-${index}`}
          name={variable.name}
          description={variable.description}
          demo={variable.demo}
          value={variable.value}
          code={variable.code}
          default={variable.default}
        />
      ))}
    </Flex>
  )
}

export default VariableList
