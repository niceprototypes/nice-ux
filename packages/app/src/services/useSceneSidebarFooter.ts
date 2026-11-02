import { useAppContext } from "../utilities/AppContext"

/**
 * The scene sidebar's footer: a panel under the nav and the scene sidebar, the width of both, for a
 * scene's settings (`createPortal(settings, footer)`). A drag handle at its top resizes it between the
 * handle alone and its content's height. Empty, it takes no space. `null` in the bare view and until
 * the shell has mounted it.
 */
export const useSceneSidebarFooter = () => useAppContext().sidebarFooter
