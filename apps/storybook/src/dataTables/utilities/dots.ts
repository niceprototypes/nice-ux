import { getToken } from "nice-react-styles"

/** Two equal dots — the row/column direction and padding demos. */
export const twoDots = [
  { color: getToken("color", "error"), height: getToken("cellHeight", "smaller"), width: getToken("cellHeight", "smaller") },
  { color: getToken("color", "warning"), height: getToken("cellHeight", "smaller"), width: getToken("cellHeight", "smaller") },
]

/** Three equal dots — the gap / justifyContent / alignItems demos. */
export const threeDots = [
  ...twoDots,
  { color: getToken("color", "link"), height: getToken("cellHeight", "smaller"), width: getToken("cellHeight", "smaller") },
]

// alignItems ─ uneven-height dots so cross-axis alignment reads at a glance; the
// baseline row needs a differing-height set for the text-baseline reference.
const alignBaselineDots = [
  { color: getToken("color", "error"), height: getToken("cellHeight", "small"), width: getToken("cellHeight", "smaller") },
  { color: getToken("color", "warning"), height: getToken("cellHeight", "smaller"), width: getToken("cellHeight", "smaller") },
  { color: getToken("color", "link"), height: getToken("cellHeight"), width: getToken("cellHeight", "smaller") },
]

// No height → the item stretches to fill the cross axis (the `stretch` demo).
const alignStretchDots = [
  { color: getToken("color", "error"), width: getToken("cellHeight", "smaller") },
  { color: getToken("color", "warning"), width: getToken("cellHeight", "smaller") },
  { color: getToken("color", "link"), width: getToken("cellHeight", "smaller") },
]

export const alignItemsDotsFor = (variant: string) =>
  variant === "baseline" ? alignBaselineDots : variant === "stretch" ? alignStretchDots : threeDots

// grow ─ two items in a bordered track: the first grows by the row's factor, the
// second always grows by 1. At factor 0 the first item keeps a fixed width so
// the second takes all the free space; above 0 it shares space proportionally.
export const growDots = (factor: number) => [
  {
    color: getToken("color", "error"),
    height: getToken("cellHeight", "smaller"),
    grow: factor,
    ...(factor === 0 ? { width: getToken("cellHeight", "smaller") } : {}),
  },
  { color: getToken("color", "link"), height: getToken("cellHeight", "smaller"), grow: 1 },
]

// wrap ─ five equal squares in a track ~3 wide: they wrap to new lines when
// wrapping is on. The nowrap set instead grows to share one line (no width, grow 1).
const wrapDots = ["error", "warning", "link", "success", "disabled"].map((color) => ({
  color: getToken("color", color),
  height: getToken("cellHeight", "small"),
  width: getToken("cellHeight", "small"),
}))

const nowrapDots = wrapDots.map((dot) => ({ ...dot, grow: 1, width: undefined }))

export const wrapWidth = `calc(${getToken("cellHeight", "small")} * 3 + 2px)`

export const wrapDotsFor = (variant: string) => (variant === "nowrap" ? nowrapDots : wrapDots)
