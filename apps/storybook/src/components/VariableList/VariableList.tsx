import Flex from "nice-react-flex"
import VariableRow from "../VariableRow"

interface VariableListProps {
  variables: Array<{
    name: string
    value?: string
    demo?: React.ReactNode
  }>
  spacer?: boolean
  propName?: string
  isString?: boolean
}

const VariableList = ({ variables, spacer, propName, isString = false }: VariableListProps) => {
  return (
    <Flex direction="column" gap="larger">
      {variables.map((variable) => {
        let formattedName = variable.name

        // Only wrap in quotes or brackets if propName is present
        if (propName) {
          if (isString === true) {
            formattedName = `"${variable.name}"`
          } else {
            formattedName = `{${variable.name}}`
          }
        }

        return (
          <VariableRow
            key={variable.name}
            name={formattedName}
            value={variable.value ?? ""}
            demo={variable.demo}
            spacer={spacer}
            propName={propName}
          />
        )
      })}
    </Flex>
  )
}

export default VariableList