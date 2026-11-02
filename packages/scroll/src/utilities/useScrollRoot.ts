import { useContext } from "react"
import { ScrollContext } from "../components/ScrollProvider"
import type { ScrollRootElement } from "./scrollRoot"

/** The element the page scrolls in, from the nearest ScrollProvider; null (the window) without one. */
export const useScrollRoot = (): ScrollRootElement => useContext(ScrollContext)?.root ?? null
