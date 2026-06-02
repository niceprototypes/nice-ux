import { useEffect, useState } from "react"
import { addons } from "storybook/preview-api"
import {
  DARK_MODE_EVENT_NAME,
  UPDATE_DARK_MODE_EVENT_NAME,
} from "storybook-dark-mode"
import Icon from "nice-react-icon"
import { ThemeButton } from "./ThemeToggle.styles"

export const ThemeToggle = () => {
  const [isDark, setIsDark] = useState(
    typeof document !== "undefined" &&
      document.documentElement.getAttribute("data-theme") === "night"
  )

  useEffect(() => {
    const channel = addons.getChannel()
    channel.on(DARK_MODE_EVENT_NAME, setIsDark)
    return () => channel.off(DARK_MODE_EVENT_NAME, setIsDark)
  }, [])

  return (
    <ThemeButton
      type="button"
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      onClick={() => addons.getChannel().emit(UPDATE_DARK_MODE_EVENT_NAME)}
    >
      <Icon
        name={isDark ? "Sun" : "Moon"}
        size="larger"
        vendor
      />
    </ThemeButton>
  )
}
