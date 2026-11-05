import * as React from "react"
import Button from "@niceprototypes/button"
import { useScrollEnd } from "@niceprototypes/scroll"
import { StyledChatLogEnd } from "./ChatLog.styles"

/** The "scroll to latest" button, shown only while the log is not at its end. */
const ChatLogEnd: React.FC = () => {
  const { atEnd, scrollToEnd } = useScrollEnd()
  return (
    <StyledChatLogEnd>
      {!atEnd && (
        <Button
          iconLeft="arrow-bottom"
          borderRadius="rounded"
          filled
          aria-label="Scroll to latest"
          onClick={() => scrollToEnd()}
        />
      )}
    </StyledChatLogEnd>
  )
}

export default ChatLogEnd
