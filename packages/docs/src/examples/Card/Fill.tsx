import type { ReactNode } from "react"
import Flex from "@niceprototypes/flex"

/** Stretches a preview to the full width of its example cell, for previews whose effect needs width. */
export const Fill = ({ children }: { children: ReactNode }) => (
  <Flex
    direction="column"
    grow={1}
  >
    {children}
  </Flex>
)
