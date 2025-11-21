import Flex from "nice-react-flex"
import VariableRow from "../VariableRow"

interface VariableListProps {
  variables: Array<{
    name: string
    value: string
    demo?: React.ReactNode
  }>
  spacer?: boolean
}

const VariableList = ({ variables, spacer }: VariableListProps) => {
  return (
    <Flex direction="column" gap="large">
      {variables.map((variable) => (
        <VariableRow
          key={variable.name}
          name={variable.name}
          value={variable.value}
          demo={variable.demo}
          spacer={spacer}
        />
      ))}
    </Flex>
  )
}

export default VariableList