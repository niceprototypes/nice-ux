import Icon from "nice-react-icon"
import { getToken } from "nice-styles"

const iconNames = [
  "arrow",
  "attention",
  "box",
  "brush",
  "calendar",
  "cancel",
  "carat",
  "check",
  "cloud",
  "code",
  "cog",
  "contact",
  "content",
  "edit",
  "link",
  "lock",
  "menu",
  "message",
  "pause",
  "placeholder",
  "plus",
  "profile",
  "puzzle",
  "search",
  "shuffle",
  "skip",
  "spinner",
  "trash",
  "upload",
  "x",
] as const

export const prepareName = () =>
  iconNames.map(name => ({
    name,
    description: `name="${name}"`,
    demo: <Icon name={name} color="success" />,
    code: `<Icon name="${name}"/>`,
  }))