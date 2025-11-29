import Flex from "nice-react-flex"
import VariableRow from "../VariableRow"

interface VariableListProps {
  variables: Array<{
    name: string
    description?: string
    key?: string
    var?: string
    value?: string
    demo?: React.ReactNode
    code?: string
    default?: boolean
  }>
}

const VariableList = ({ variables }: VariableListProps) => {
  return (
    <Flex direction="column" gap="larger">
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