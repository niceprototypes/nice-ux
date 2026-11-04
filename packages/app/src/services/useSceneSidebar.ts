import { useAppContext } from "../utilities/AppContext"

/**
 * The scene sidebar: a resizable panel under the nav, the sidebar's width, fixed with it while the
 * scene region scrolls, for a scene's own navigation (`createPortal(steps, sidebar)`). A drag handle
 * at its top resizes it between the handle alone and its content's height. Empty, it takes no space.
 * `null` in the bare view and until the shell has mounted it.
 */
export const useSceneSidebar = () => useAppContext().sidebar
