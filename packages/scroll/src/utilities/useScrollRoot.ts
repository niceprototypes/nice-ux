import { useContext } from "react"
import { ScrollContext } from "../components/Scroll/ScrollRoot"
import type { ScrollRootElement } from "./scrollRoot"

/** The element the page scrolls in, from the nearest `<Scroll root>`; null (the window) without one. */
export const useScrollRoot = (): ScrollRootElement => useContext(ScrollContext)?.root ?? null
