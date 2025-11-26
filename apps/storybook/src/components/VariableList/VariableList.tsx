import Flex from "nice-react-flex"
import VariableRow from "../VariableRow"

interface VariableListProps {
  variables: Array<{
    name: string
    key?: string
    var?: string
    value?: string
    demo?: React.ReactNode
    code?: string
  }>
  label?: string
  isString?: boolean
}

const VariableList = ({ variables, label, isString = false }: VariableListProps) => {
  return (
    <Flex direction="column" gap="larger">
      {variables.map((variable, index) => {
        let formattedName = variable.name

        // Only wrap in quotes or brackets if label is present
        if (label) {
          if (isString === true) {
            formattedName = `"${variable.name}"`
          } else {
            formattedName = `{${variable.name}}`
          }
        }

        return (
          <VariableRow
            key={variable.name || `variable-${index}`}
            name={formattedName}
            description={variable.key}
            demo={variable.demo}
            label={label}
            value={variable.value}
            code={variable.code}
          />
        )
      })}
    </Flex>
  )
}

export default VariableList