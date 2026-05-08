import Flex from "nice-react-flex"
import { withBreakpoints } from "nice-react-styles"
import { Source } from "@storybook/addon-docs/blocks"
import { PreviewWrapper, RowFlex } from "./DocsRow.styles"
import { DocsRowProps } from "./DocsRow.types"

const BaseDocsRow = ({
  previewCell,
  code,
  language = "tsx",
  previewCellWidth,
}: DocsRowProps) => (
  <RowFlex
    direction="column"
    gap="large"
    breakpoints={{
      "tablet+": {
          direction: "row",
          alignItems: "center",
        },
    }}
  >
    <Flex
      style={{ width: previewCellWidth }}
      breakpoints={{
        "tablet+": {
            previewCellWidth: "45%",
          },
      }}
    >
      {previewCell}
    </Flex>
    <Source
      language={language}
      code={code}
    />
  </RowFlex>
)

export const DocsRow = withBreakpoints<DocsRowProps>(BaseDocsRow, [
  { min: "tablet", props: { previewCellWidth: "45%" } },
])
