import { useAppContext } from "../utilities/AppContext"

/**
 * The scene sidebar: the column right of the nav, fixed with it while the scene region scrolls, for
 * a scene's own navigation (`createPortal(steps, sidebar)`). Empty, it takes no space. `null` in the
 * bare view and until the shell has mounted it.
 */
export const useSceneSidebar = () => useAppContext().sidebar
