import Typography from "nice-react-typography"
import { createToken } from "../services/createToken.tsx"

const loremIpsum =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris."

export const prepareLineHeight = () =>
  createToken("lineHeight", ["condensed", "base", "expanded"], variant => (
    <Typography lineHeight={variant as any}>{loremIpsum}</Typography>
  ))
