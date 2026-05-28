import { addons } from "storybook/manager-api"
import { create } from "storybook/theming"
import "./manager.css"

const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches
const theme = create({
  base: prefersDark ? "dark" : "light",
  brandTitle: "Nice Components",
  brandUrl: "https://niceprototypes.com",
  brandImage: "https://niceprototypes.com/vectors/logo.svg",
  brandTarget: "_self",

  fontBase: '"Google Sans Flex", sans-serif',
  fontCode: '"Roboto Mono", "Courier New", serif',
})

addons.setConfig({
  theme,
})
